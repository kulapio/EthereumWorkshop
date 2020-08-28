// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

/// @title InterestRate
/// @author Nattapon Nimakul, kulap.io

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.1.0/contracts/math/SafeMath.sol";
// import "./InterestRateInterface.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.1.0/contracts/access/Ownable.sol";

contract InterestRate is Ownable {
    using SafeMath for uint256;
    // Interest rate
    uint256 rate = 3;
    
    function adjustRate(uint256 _rate) public onlyOwner {
        rate = _rate;
    }
    
    function calculateInterest(address user, uint256 _rate, uint256 balance) private view returns(uint256) {
        // uint256 interest = balances[user].mul(_rate).div(100);
        uint256 interest = balance.mul(_rate).div(100);
        return interest;
    }
    
    function calcuateInterestFor(address account, uint256 balance) public 
        returns (uint256) {
        uint256 interest = calculateInterest(account, rate, balance);
        uint256 newBalance = balance.add(interest);
        return newBalance;
    }
}
