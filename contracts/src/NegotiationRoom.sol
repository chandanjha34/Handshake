// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract NegotiationRoom {
    enum Status {
        Waiting,
        Submitted,
        Proposed,
        Resolved,
        Closed
    }

    address public immutable partyA;
    address public immutable partyB;

    Status public status;

    uint256 public immutable creatorPrice;

    bool public submittedB;
    uint256 public counterpartyPrice;
    uint256 public proposedSettlement;

    bool public decidedA;
    bool public decidedB;
    bool public acceptedA;
    bool public acceptedB;

    uint256 public counterpartyEscrow;

    bool public hasDeal;
    uint256 public finalSettlement;

    event RoomInitialized(address indexed partyA, address indexed partyB, uint256 creatorPrice);
    event CounterpartyPriceSubmitted(address indexed party, uint256 price, uint256 escrowed);
    event ProposalReady(uint256 proposedSettlement);
    event DecisionSubmitted(address indexed party, bool accepted, uint256 escrowed);
    event RoomResolved(bool hasDeal, uint256 settlement, uint256 refundToCounterparty);

    constructor(address _partyA, address _partyB, uint256 _creatorPrice) {
        require(_partyA != address(0) && _partyB != address(0), 'invalid party');
        require(_creatorPrice > 0, 'creator price required');

        partyA = _partyA;
        partyB = _partyB;
        creatorPrice = _creatorPrice;
        status = Status.Waiting;

        emit RoomInitialized(_partyA, _partyB, _creatorPrice);
    }

    function submitCounterpartyPrice(uint256 _counterpartyPrice) external payable {
        require(msg.sender == partyB, 'only counterparty');
        require(!submittedB, 'already submitted');
        require(status == Status.Waiting || status == Status.Submitted, 'invalid status');
        require(_counterpartyPrice > 0, 'counterparty price required');
        require(msg.value == _counterpartyPrice, 'escrow must equal price');

        counterpartyPrice = _counterpartyPrice;
        counterpartyEscrow = msg.value;
        submittedB = true;
        status = Status.Submitted;

        emit CounterpartyPriceSubmitted(msg.sender, _counterpartyPrice, msg.value);

        _proposeSettlement();
    }

    function respondToProposal(bool accept) external payable {
        require(status == Status.Proposed, 'proposal not active');

        if (msg.sender == partyA) {
            require(!decidedA, 'partyA already decided');
            require(msg.value == 0, 'partyA cannot escrow');

            decidedA = true;
            acceptedA = accept;
            emit DecisionSubmitted(msg.sender, accept, counterpartyEscrow);
        } else if (msg.sender == partyB) {
            require(!decidedB, 'partyB already decided');

            counterpartyEscrow += msg.value;
            if (accept) {
                require(counterpartyEscrow >= proposedSettlement, 'top up escrow to accept');
            }

            decidedB = true;
            acceptedB = accept;
            emit DecisionSubmitted(msg.sender, accept, counterpartyEscrow);
        } else {
            revert('not room participant');
        }

        if (decidedA && decidedB) {
            _resolveOutcome();
        }
    }

    function _proposeSettlement() internal {
        proposedSettlement = (creatorPrice + counterpartyPrice) / 2;
        status = Status.Proposed;

        emit ProposalReady(proposedSettlement);
    }

    function _resolveOutcome() internal {
        uint256 settlement = 0;
        uint256 refund = 0;

        if (acceptedA && acceptedB) {
            settlement = proposedSettlement;
            if (counterpartyEscrow >= settlement) {
                hasDeal = true;
                finalSettlement = settlement;
                status = Status.Resolved;
                refund = counterpartyEscrow - settlement;
            }
        } else if (acceptedA && !acceptedB) {
            settlement = (counterpartyPrice + proposedSettlement) / 2;
            if (counterpartyEscrow >= settlement) {
                hasDeal = true;
                finalSettlement = settlement;
                status = Status.Resolved;
                refund = counterpartyEscrow - settlement;
            }
        }

        if (hasDeal) {
            if (settlement > 0) {
                (bool paidA, ) = payable(partyA).call{value: settlement}('');
                require(paidA, 'payout failed');
            }

            if (refund > 0) {
                (bool paidB, ) = payable(partyB).call{value: refund}('');
                require(paidB, 'refund failed');
            }

            emit RoomResolved(true, settlement, refund);
            return;
        }

        status = Status.Closed;
        finalSettlement = 0;
        refund = counterpartyEscrow;

        if (refund > 0) {
            (bool refunded, ) = payable(partyB).call{value: refund}('');
            require(refunded, 'close refund failed');
        }

        emit RoomResolved(false, 0, refund);
    }

    function getStatusLabel() external view returns (string memory) {
        if (status == Status.Waiting) return 'Waiting';
        if (status == Status.Submitted) return 'Submitted';
        if (status == Status.Proposed) return 'Proposed';
        if (status == Status.Resolved) return 'Resolved';
        return 'Closed';
    }
}
