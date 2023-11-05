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

      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: ["0xb2c05c6e2ba1c68b24d5e840a5407b9f3bd9856c"],
      });

      await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: ["0x61d3bafb9bc3da723e4259a7e3653099aeb4487f"],
      });
    

    const _sender = await ethers.getSigner("0x491E59c255C790D4e3a53CEC2632524088f1aaA4"
    )
    const _otherSender = await ethers.getSigner("0x1383bc655CC8cC79c72cd0106023013c34Fd8086");

    const aaveWhale = await ethers.getSigner("0xb2c05c6e2ba1c68b24d5e840a5407b9f3bd9856c");

    const wethWhale = await ethers.getSigner("0x61d3bafb9bc3da723e4259a7e3653099aeb4487f");

    console.log("Sending AAVE and WETH to wallets");

    const AAVE_ADDRESS = "0x6a07A792ab2965C72a5B8088d3a069A7aC3a993B";
    const AAVE_ABI = [{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint8","name":"_decimals","type":"uint8"},{"internalType":"address","name":"_owner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"},{"indexed":true,"internalType":"uint256","name":"effectiveTime","type":"uint256"}],"name":"LogChangeDCRMOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"txhash","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LogSwapin","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"bindaddr","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LogSwapout","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"txhash","type":"bytes32"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Swapin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"bindaddr","type":"address"}],"name":"Swapout","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TRANSFER_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"changeDCRMOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"target","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"transferAndCall","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"target","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"transferWithPermit","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
    const AAVE = new ethers.Contract(AAVE_ADDRESS,AAVE_ABI);

    const WETH_ADDRESS = "0x74b23882a30290451A17c44f4F05243b6b58C76d";
    const WETH_ABI = [{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint8","name":"_decimals","type":"uint8"},{"internalType":"address","name":"_owner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"},{"indexed":true,"internalType":"uint256","name":"effectiveTime","type":"uint256"}],"name":"LogChangeDCRMOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"txhash","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LogSwapin","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"bindaddr","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"LogSwapout","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"txhash","type":"bytes32"},{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Swapin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"bindaddr","type":"address"}],"name":"Swapout","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TRANSFER_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"changeDCRMOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"target","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"transferAndCall","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"target","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"transferWithPermit","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
    const WETH = new ethers.Contract(WETH_ADDRESS,WETH_ABI);
    
    await AAVE.connect(aaveWhale).approve(_sender.address, "150558000000000000000");
    await WETH.connect(wethWhale).approve(_sender.address, "127530887721044054389");
    
    await AAVE.connect(aaveWhale).transfer(_sender.address, "500000000000000000");
    await WETH.connect(wethWhale).transfer(_sender.address,"500000000000000000");

    const AAVEBalanceOwner = await AAVE.connect(aaveWhale).balanceOf(_sender.address);
    const wethBalanceOwner = await WETH.connect(wethWhale).balanceOf(_sender.address);

    console.log("Owner AAVE Balance: ", AAVEBalanceOwner.toString());
    console.log("Owner WETH Balance: ", wethBalanceOwner.toString());

    console.log("Creating 🎃 Pumpkin (Index  Token)...");
    const _Pumpkin = await ethers.getContractFactory("IndexTokenNew");
    const Pumpkin = await _Pumpkin.deploy(_sender.address,[AAVE.address, WETH.address],[50,50],"pumpkins", "HWEEN");

    console.log("Pumpkin address: ", Pumpkin.address);
    
    console.log("Approving tokens for deposit...")
    await AAVE.connect(_sender).approve(Pumpkin.address, "500000000000000000");
    await WETH.connect(_sender).approve(Pumpkin.address, "500000000000000000");
      console.log("done...")
      console.log("Minting Pumpkins...")
    await Pumpkin.connect(_sender).mint("1000000000000000000");
    console.log("done...")
    const pumpkinBalance = await Pumpkin.balanceOf(_sender.address);
    console.log("🎃 Owner Pumpkin Balance: ", pumpkinBalance.toString());

    const AAVEPumpkinBalance = await AAVE.connect(aaveWhale).balanceOf(Pumpkin.address);
    const wethPumpkinBalance = await WETH.connect(wethWhale).balanceOf(Pumpkin.address);

    console.log("Pumpkin AAVE Balance: ", AAVEPumpkinBalance.toString());
    console.log("Pumpkin WETH Balance: ", wethPumpkinBalance.toString());

    
  
    console.log("done...")

    console.log("Redeeming tokens...");

    await Pumpkin.connect(_sender).redeem("1000000000000000000");

    const AAVEOwnerBalance2 = await AAVE.connect(aaveWhale).balanceOf(_sender.address);
    const wethOwnerBalance2 = await WETH.connect(wethWhale).balanceOf(_sender.address);

    console.log("Owner AAVE Balance: ", AAVEOwnerBalance2.toString());
    console.log("Owner WETH Balance: ", wethOwnerBalance2.toString());




    //console.log("Testing rebalance...")
    //await Pumpkin.connect(_sender).rebalance(0,1,40,60);



    













/*

    console.log("Creating 🎃 Pumpkin (Index  Token)...");
    const _Pumpkin = await ethers.getContractFactory("IndexToken");
    const Pumpkin = await _Pumpkin.deploy(_sender.address,[GenericToken1Address, GenericToken2Address],[50,50],"pumpkins", "HWEEN");

    console.log("🎃 Pumpkin Address: ", Pumpkin.address);

    console.log("Approving pumpkin address...");

    await GenericToken1.connect(_sender).approve(Pumpkin.address, "1000000000000000000000");
    await GenericToken2.connect(_sender).approve(Pumpkin.address, "1000000000000000000000");

    console.log("Checking allowance...");

    //const allowance1 = await GenericToken1.connect(_sender).allowance(senderAddress, Pumpkin.address);
    //const allowance2 = await GenericToken2.connect(_sender).allowance(senderAddress, Pumpkin.address);

    console.log("Owner to 🎃 Pumpkin allowance: ", allowance1.toString(), allowance2.toString());

    console.log("Minting  Pumpkins...")

    await Pumpkin.connect(_sender).mint("1000000000000000000");


    const pumpkinBalance = await Pumpkin.balanceOf(_sender.address);
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

    console.log("\n\nTesting rebalance...")
    await Pumpkin.connect(_sender).rebalance(0,1,60,40);
















    

*/
    
}




// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });