pragma solidity ^0.5.0;

import "github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/ownership/Ownable.sol";

// CETH Interface, refer to  https://compound.finance/developers
interface CEtherInterface {
    function mint() external payable;
    function totalSupply() external view returns(uint256);
    function balanceOf(address owner) external view returns (uint256);
    function transfer(address dst, uint256 amount) external returns (bool);
}

// Personal Compound Wallet, capability of mint and forward CEther
contract CompoundWallet is Ownable {
    // Address of CETH token (ERC20)
    address public cEtherAddress = 0xf92FbE0D3C0dcDAE407923b2Ac17eC223b1084E4;

    // Personal mobile wallet address
    address public mobileWalletAddress = 0x02621e31998B15a93B39aA643a60396dEEE8bEd2;

    // Fetch CETH total supply
    function getCEtherSupply() public view returns(uint256) {
        CEtherInterface cEther = CEtherInterface(cEtherAddress);
        return cEther.totalSupply();
    }

    // Mint CETH upon given ETH
    function deposit() public payable onlyOwner {
        CEtherInterface cEther = CEtherInterface(cEtherAddress);
        cEther.mint.value(msg.value)();
    }

    // Transfer minted CETH from this contract to caller
    function withDrawCEther() public onlyOwner {
        CEtherInterface cEther = CEtherInterface(cEtherAddress);
        uint256 balanceToTransfer = cEther.balanceOf(address(this));
        cEther.transfer(msg.sender, balanceToTransfer);
    }

    // Mint CETH and transfer to target wallet
    function mintCEtherToMobile() public payable {
        deposit();

        CEtherInterface cEther = CEtherInterface(cEtherAddress);
        uint256 balanceToTransfer = cEther.balanceOf(address(this));
        cEther.transfer(mobileWalletAddress, balanceToTransfer);
    }
}
