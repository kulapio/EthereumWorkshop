// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.1.0/contracts/math/SafeMath.sol";
import "./InterestRateInterface.sol";
import "./BankBalanceInterface.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.1.0/contracts/access/Ownable.sol";

/// @title ModularBank
/// @author Nattapon Nimakul, kulap.io

/* 'contract' has similarities to 'class' in other languages (class variables,
inheritance, etc.) */
contract ModularBank is Ownable { // CamelCase
    using SafeMath for uint256;


    // Events - publicize actions to external listeners
    event DepositMade(address accountAddress, uint amount);
    
    BankBalanceModule public bankBalanceModule;
    InterestRateModule public interrateRateModule;

    // Constructor, can receive one or many variables here; only one allowed
    constructor(InterestRateModule _interrateRateModule, BankBalanceModule _bankBalanceModule) public {
        // msg provides details about the message that's sent to the contract
        // msg.sender is contract caller (address of contract creator)
        // owner = msg.sender;
        interrateRateModule = _interrateRateModule;
        bankBalanceModule = _bankBalanceModule;
    }
    
    function upgradeInterestModule(InterestRateModule _interrateRateModule) public onlyOwner {
        interrateRateModule = _interrateRateModule;
    }
    
    function upgradeBankBalanceModule(BankBalanceModule _bankBalanceModule) public onlyOwner {
        bankBalanceModule = _bankBalanceModule;
    }

    /// @notice Deposit ether into bank
    /// @return The balance of the user after the deposit is made
    function deposit() public payable returns (uint256) {
        uint256 newBalance = bankBalanceModule.deposit.value(msg.value)(msg.sender, msg.value);
        
        // address(bankBalanceModule).transfer(msg.value);

        emit DepositMade(msg.sender, msg.value); // fire event

        return newBalance;
    }

    /// @notice Withdraw ether from bank
    /// @dev This does not return any excess ether sent to it
    /// @param withdrawAmount amount you want to withdraw
    /// @return remainingBal The balance remaining for the user
    function withdraw(uint withdrawAmount) public returns (uint256 remainingBal) {
        uint256 newBalance = bankBalanceModule.withdraw(msg.sender, withdrawAmount);

        msg.sender.transfer(withdrawAmount);

        return newBalance;
    }

    /// @notice Get balance
    /// @return The balance of the user
    // 'constant' prevents function from editing state variables;
    // allows function to run locally/off blockchain
    function balance() public view returns (uint256) {
        return bankBalanceModule.balance(msg.sender);
    }

    // Fallback function - Called if other functions don't match call or
    // sent ether without data
    // Typically, called when invalid data is sent
    // Added so ether sent to this contract is reverted if the contract fails
    // otherwise, the sender's money is transferred to contract
    fallback () external {
        // revert(); // throw reverts state to before call
    }
    
    function increaseYear() public {
        for(uint256 i = 0; i < bankBalanceModule.accountsCount(); i++) {
            address account = bankBalanceModule.accounts(i);
            uint256 newBalance = interrateRateModule.calcuateInterestFor(account, bankBalanceModule.balance(account));
            bankBalanceModule.forceUpdateBalance(account, newBalance);
        }
    }
    
    function systemBalance() public view returns(uint256) {
        return address(this).balance;
    }
}
// ** END EXAMPLE **
