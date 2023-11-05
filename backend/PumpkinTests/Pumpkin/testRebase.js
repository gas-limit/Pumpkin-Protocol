const { providers } = require("ethers");
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {

    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: ["0x491E59c255C790D4e3a53CEC2632524088f1aaA4"],
      });

      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: ["0x1383bc655CC8cC79c72cd0106023013c34Fd8086"]
      });
    

    const _sender = await ethers.getSigner("0x491E59c255C790D4e3a53CEC2632524088f1aaA4"
    )
    const _otherSender = await ethers.getSigner("0x1383bc655CC8cC79c72cd0106023013c34Fd8086")


    senderAddress = _sender.address;

    

    const _GenericToken1 = await ethers.getContractFactory("ERC20");
    const _GenericToken2 = await ethers.getContractFactory("ERC20");
    const GenericToken1 = await _GenericToken1.connect(_sender).deploy();
    const GenericToken2 = await _GenericToken2.connect(_sender).deploy();

    const GenericToken1Address = GenericToken1.address;
    const GenericToken2Address = GenericToken2.address;
    
    console.log("🟡🟡 Generic token Addresses:", GenericToken1Address, GenericToken2Address);


    console.log(" ✨ Minting Generic tokens...")

    await GenericToken1.connect(_sender).mint("10000000000000000000000000");
    await GenericToken2.connect(_sender).mint("10000000000000000000000000");


    const token1Balance = await GenericToken1.balanceOf(senderAddress);
    const token2Balance = await GenericToken2.balanceOf(senderAddress);


    console.log("Generic Token balances: ", token1Balance.toString(), token2Balance.toString());



    console.log("Creating 🎃 Pumpkin (Index  Token)...");
    const _Pumpkin = await ethers.getContractFactory("IndexToken");
    const Pumpkin = await _Pumpkin.deploy(senderAddress,[GenericToken1Address, GenericToken2Address],[50,50],"pumpkins", "HWEEN");

    console.log("🎃 Pumpkin Address: ", Pumpkin.address);

    console.log("Approving pumpkin address...");

    await GenericToken1.connect(_sender).approve(Pumpkin.address, "1000000000000000000000");
    await GenericToken2.connect(_sender).approve(Pumpkin.address, "1000000000000000000000");

    console.log("Checking allowance...");

    const allowance1 = await GenericToken1.connect(_sender).allowance(senderAddress, Pumpkin.address);
    const allowance2 = await GenericToken2.connect(_sender).allowance(senderAddress, Pumpkin.address);

    console.log("Owner to 🎃 Pumpkin allowance: ", allowance1.toString(), allowance2.toString());

    console.log("Minting  Pumpkins...")

    await Pumpkin.connect(_sender).mint("1000000000000000000");


    const pumpkinBalance = await Pumpkin.balanceOf(senderAddress);
    console.log("🎃 Owner Pumpkin Balance: ", pumpkinBalance.toString());

    //TO DO NEXT: ADD A NEW ADDRESS AND MINT MORE TOKENS TO TEST CLAIM FEE

    console.log("minting new generic tokens for user Wallet 1 ...")
    await GenericToken1.connect(_otherSender).mint("10000000000000000000000000");
    await GenericToken2.connect(_otherSender).mint("10000000000000000000000000");

    console.log("Approving generic tokens user wallet 1 to pumpkin address")

    await GenericToken1.connect(_otherSender).approve(Pumpkin.address, "1000000000000000000000");
    await GenericToken2.connect(_otherSender).approve(Pumpkin.address, "1000000000000000000000");


    console.log("minting new pumpkins with user wallet 1...")

    console.log("\n -- BEGIN REBASE TEST --")

    await Pumpkin.connect(_otherSender).mint("1000000000000000000");

    const ownerPumpkinBalance = await Pumpkin.connect(_otherSender).balanceOf(_otherSender.address);
    console.log("🔑 Owner Pumpkin balance BEFORE rebase: ", ownerPumpkinBalance.toString());

    const wallet1PumpkinBalance = await Pumpkin.connect(_otherSender).balanceOf(_otherSender.address);
    console.log("🧑 User wallet 1 Pumpkin balance BEFORE rebase: ", wallet1PumpkinBalance.toString());

    const totalSupply1 = await Pumpkin.getTotalSupply()
    console.log("💰 Total supply of pumpkins BEFORE rebase: ", totalSupply1.toString());

    console.log("\nCollecting streaming fee..")
    await Pumpkin.connect(_sender).streamingFee();
    console.log("done...\n");


    const wallet1PumpkinBalance2 = await Pumpkin.connect(_otherSender).balanceOf(_otherSender.address);
    const OwnerPumpkinBalance2 = await Pumpkin.connect(_sender).balanceOf(_sender.address);


    console.log("🔑 Owner wallet Pumpkin Balance AFTER rebase: ", OwnerPumpkinBalance2.toString());
    console.log("🧑 User wallet 1 Pumpkin balance AFTER rebase: ", wallet1PumpkinBalance2.toString());

    const totalSupply2 = await Pumpkin.getTotalSupply()
    console.log("💰 Total supply of pumpkins AFTER rebase: ", totalSupply2.toString());

    //console.log("\n\nTesting rebalance...")
    //await Pumpkin.connect(_sender).rebalance(0,1,60,40);


    
}




// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });