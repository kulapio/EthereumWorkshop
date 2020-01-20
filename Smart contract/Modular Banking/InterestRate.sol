pragma solidity ^0.5.0;

/// @title InterestRate
/// @author Nattapon Nimakul, kulap.io

import "./SafeMath1.sol";
// import "./InterestRateInterface.sol";
import "./Ownerable.sol";


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
