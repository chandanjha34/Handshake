// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {MockFHE as FHE} from './MockFHE.sol';

contract NegotiationRoom {
    using FHE for FHE.euint256;

    enum Status {
        Waiting,
        Submitted,
        Settled
    }

    address public immutable partyA;
    address public immutable partyB;
    uint8 public immutable weightA;

    Status public status;

    bool public submittedA;
    bool public submittedB;
    FHE.euint256 private encryptedA;
    FHE.euint256 private encryptedB;

    bool public hasDeal;
    uint256 public finalSettlement;

    event PriceSubmitted(address indexed party);
    event SettlementReady(bool hasDeal, uint256 settlement);

    constructor(address _partyA, address _partyB, uint8 _weightA) {
        partyA = _partyA;
        partyB = _partyB;
        weightA = _weightA;
        status = Status.Waiting;
    }

    function submitEncryptedPrice(uint256 encryptedCiphertext) external {
        if (msg.sender == partyA && !submittedA) {
            encryptedA = FHE.asEuint256(encryptedCiphertext);
            submittedA = true;
            emit PriceSubmitted(msg.sender);
        } else if (msg.sender == partyB && !submittedB) {
            encryptedB = FHE.asEuint256(encryptedCiphertext);
            submittedB = true;
            emit PriceSubmitted(msg.sender);
        }

        if (submittedA || submittedB) {
            status = Status.Submitted;
        }

        if (submittedA && submittedB && status != Status.Settled) {
            _settle();
        }
    }

    function _settle() internal {
        uint8 weightB = uint8(100 - weightA);

        FHE.euint256 memory hundred = FHE.asEuint256(100);
        FHE.euint256 memory wA = FHE.asEuint256(weightA);
        FHE.euint256 memory wB = FHE.asEuint256(weightB);

        bool overlap = FHE.lte(encryptedA, encryptedB);

        FHE.euint256 memory weightedA = FHE.mul(encryptedA, wA);
        FHE.euint256 memory weightedB = FHE.mul(encryptedB, wB);
        FHE.euint256 memory numerator = FHE.add(weightedA, weightedB);
        FHE.euint256 memory midpoint = FHE.div(numerator, hundred);

        FHE.euint256 memory noDealValue = FHE.asEuint256(0);
        FHE.euint256 memory selected = FHE.select(overlap, midpoint, noDealValue);

        hasDeal = overlap;
        finalSettlement = FHE.publishDecryptResult(selected);
        status = Status.Settled;

        emit SettlementReady(hasDeal, finalSettlement);
    }

    function getStatusLabel() external view returns (string memory) {
        if (status == Status.Waiting) return 'Waiting';
        if (status == Status.Submitted) return 'Submitted';
        return 'Settled';
    }
}
