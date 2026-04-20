// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {NegotiationRoom} from './NegotiationRoom.sol';

contract NegotiationFactory {
    address[] public rooms;

    event RoomCreated(address indexed room, address indexed partyA, address indexed partyB, uint256 creatorPrice);

    function createRoom(address counterparty, uint256 creatorPrice) external returns (address room) {
        require(counterparty != address(0), 'invalid counterparty');
        require(counterparty != msg.sender, 'self room not allowed');
        require(creatorPrice > 0, 'creator price required');

        NegotiationRoom newRoom = new NegotiationRoom(msg.sender, counterparty, creatorPrice);
        room = address(newRoom);
        rooms.push(room);

        emit RoomCreated(room, msg.sender, counterparty, creatorPrice);
    }

    function allRooms() external view returns (address[] memory) {
        return rooms;
    }

    function roomCount() external view returns (uint256) {
        return rooms.length;
    }
}
