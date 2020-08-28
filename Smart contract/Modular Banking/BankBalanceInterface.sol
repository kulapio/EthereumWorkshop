// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

/// @title BankBalanceModule
/// @author Nattapon Nimakul, kulap.io

interface BankBalanceModule {
    function accounts(uint256 index) external returns (address);
    function accountsCount() external returns (uint256);
    function deposit(address user, uint256 amount) external payable returns (uint256);
    function withdraw(address user, uint withdrawAmount) external returns (uint256 remainingBal);
    function balance(address user) external view returns (uint256);
    function forceUpdateBalance(address user, uint256 newBalance) external;
    receive () external payable;
}
