// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

/// @title BankBalances
/// @author Nattapon Nimakul, kulap.io

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.1.0/contracts/math/SafeMath.sol";
// import "./InterestRateInterface.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.1.0/contracts/access/Ownable.sol";


/// @title SimpleBank
/// @author nemild, kor, tot

/* 'contract' has similarities to 'class' in other languages (class variables,
inheritance, etc.) */
contract BankBalances is Ownable { // CamelCase
    using SafeMath for uint256;
    // Declare state variables outside function, persist through life of contract

    // dictionary that maps addresses to balances
    mapping (address => uint256) private balances;
    
    // Users in system
    address[] _accounts;
    
    address coreBank;

    /// @notice Deposit ether into bank
    /// @return The balance of the user after the deposit is made
    function deposit(address user, uint256 amount) public payable returns (uint256) {
        // require(coreBank == msg.sender);
        
        // Record account in array for looping
        if (0 == balances[user]) {
            _accounts.push(user);
        }
        
        balances[user] = balances[user].add(amount);
        // no "this." or "self." required with state variable
        // all values set to data type's initial value by default

        return balances[user];
    }

    /// @notice Withdraw ether from bank
    /// @dev This does not return any excess ether sent to it
    /// @param withdrawAmount amount you want to withdraw
    /// @return remainingBal The balance remaining for the user
    function withdraw(address user, uint withdrawAmount) public returns (uint256 remainingBal) {
        // require(coreBank == msg.sender);

        require(balances[user] >= withdrawAmount);
        balances[user] = balances[user].sub(withdrawAmount);

        // Revert on failed
        msg.sender.transfer(withdrawAmount);
        
        return balances[user];
    }

    /// @notice Get balance
    /// @return The balance of the user
    // 'constant' prevents function from editing state variables;
    // allows function to run locally/off blockchain
    function balance(address user) public view returns (uint256) {
        return balances[user];
    }
    
    function accounts(uint256 index) external view returns (address) {
        return _accounts[index];
    }
    function accountsCount() external view returns (uint256) {
        return _accounts.length;
    }
    
    function forceUpdateBalance(address user, uint256 newBalance) external {
        balances[user] = newBalance;
    }
    
    receive() external payable {
        
    }
}
// ** END EXAMPLE **

