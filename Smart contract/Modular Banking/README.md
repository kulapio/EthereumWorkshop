![Modular Banking Diagram](https://github.com/kulapio/EthereumWorkshop/blob/master/Smart%20contract/Modular%20Banking/Modular%20Banking%20Diagram.png?raw=true)


# Architect
This Modular Banking will seperate into 3 parts.

## Core Module
CoreBank.sol is a core system that implement core logics like deposit, withdraw and checking balance.

## Implementation
BankBalance.sol and InterestRate.sol are the supporting modules that upgradable.

## Interface
BankBalanceInterface.sol and InterestRateInterface.sol are interface. That make the modueles upgradable without re-deploy core module itself.
