// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {NegotiationRoom} from './NegotiationRoom.sol';

contract NegotiationFactory {
    address[] public rooms;

    event RoomCreated(address indexed room, address indexed partyA, address indexed partyB, uint8 weightA);

    function createRoom(address counterparty, uint8 weightA) external returns (address room) {
        if (weightA > 100) {
            weightA = 50;
        }

        NegotiationRoom newRoom = new NegotiationRoom(msg.sender, counterparty, weightA);
        room = address(newRoom);
        rooms.push(room);

        emit RoomCreated(room, msg.sender, counterparty, weightA);
    }

    function allRooms() external view returns (address[] memory) {
        return rooms;
    }

    function roomCount() external view returns (uint256) {
        return rooms.length;
    }
}
