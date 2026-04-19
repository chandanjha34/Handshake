// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

library MockFHE {
    struct euint256 {
        uint256 v;
    }

    function asEuint256(uint256 value) internal pure returns (euint256 memory) {
        return euint256({v: value});
    }

    function add(euint256 memory a, euint256 memory b) internal pure returns (euint256 memory) {
        return euint256({v: a.v + b.v});
    }

    function mul(euint256 memory a, euint256 memory b) internal pure returns (euint256 memory) {
        return euint256({v: a.v * b.v});
    }

    function div(euint256 memory a, euint256 memory b) internal pure returns (euint256 memory) {
        if (b.v == 0) {
            return euint256({v: 0});
        }
        return euint256({v: a.v / b.v});
    }

    function lte(euint256 memory a, euint256 memory b) internal pure returns (bool) {
        return a.v <= b.v;
    }

    function select(bool cond, euint256 memory ifTrue, euint256 memory ifFalse)
        internal
        pure
        returns (euint256 memory)
    {
        return cond ? ifTrue : ifFalse;
    }

    function publishDecryptResult(euint256 memory a) internal pure returns (uint256) {
        return a.v;
    }
}
