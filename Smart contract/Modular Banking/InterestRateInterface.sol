// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

/// @title InterestRateModule
/// @author Nattapon Nimakul, kulap.io

interface InterestRateModule {
    function rate() external view;
    function calcuateInterestFor(address account, uint256 balance) external returns (uint256);
}
