// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.1.0/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.1.0/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.1.0/contracts/math/SafeMath.sol";

contract Erc20Bank is Ownable {
    using SafeMath for uint256;

    // Mapping between addresses and balances
    mapping (address => uint256) private balances;
    
    // User accounts in the system
    address[] accounts;
    
    uint256 interestRate = 3;
    
    event DepositMade(address indexed accountAddress, uint256 amount);
    event WithdrawMade(address indexed accountAddress, uint256 amount);
    
    // ERC20
    IERC20 public token;
    
    constructor(IERC20 erc20address) public {
        token = erc20address;
    }
    
    function deposit(uint256 amount) public payable returns (uint256) {
        // Deduct amount from users, user must approve first.
        token.transferFrom(msg.sender, address(this), amount);

        // Record account in array for looping
        if (0 == balances[msg.sender]) {
            accounts.push(msg.sender);
        }

        balances[msg.sender] = balances[msg.sender].add(amount);
        
        emit DepositMade(msg.sender, amount);
        
        return balances[msg.sender];
    }
    
    function balance() public view returns (uint256) {
        return balances[msg.sender];
    }
    
    function balanceOf(address user) public view returns (uint256) {
        return balances[user];
    }
    
    function withdraw (uint amount) public returns (uint256 remainingBalance) {
        require(balances[msg.sender] >= amount, "Balance is not enough");

        balances[msg.sender] = balances[msg.sender].sub(amount);
        
        // send ether back to user
        token.transfer(msg.sender, amount);
        // msg.sender.transfer(amount);
        
        emit WithdrawMade(msg.sender, amount);
        
        return balances[msg.sender];
    }

    function systemBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function calculateInterest(address user, uint256 rate) private view returns (uint256) {
        uint256 interest = balances[user].mul(rate).div(100);
        return interest;
    }

    function increaseYear() onlyOwner public {
        for(uint256 i = 0; i < accounts.length; i++) {
            address account = accounts[i];
            uint256 interest = calculateInterest(account, interestRate);
            balances[account] = balances[account].add(interest);
        }
    }
}
