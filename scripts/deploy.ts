import { ethers } from "hardhat";
const hre = require("hardhat");

// NFT OpenSea https://testnets.opensea.io/assets/rinkeby/0x570bf25021abd2a409d84343fb2a7324327ada81/0

async function main() {
  const VoucherPets = await ethers.getContractFactory("VoucherPets");
  const voucher = await VoucherPets.deploy();

  await voucher.deployed();

  console.log("VoucherPets deployed to:", voucher.address);

  console.log(
    "Waiting 30 seconds for Etherscan update before verification requests..."
  );
  await new Promise((resolve) => setTimeout(resolve, 30000)); // pause for Etherscan update

  try {
    await hre.run("verify:verify", {
      address: voucher.address,
      contract: "contracts/VoucherPets.sol:VoucherPets",
    });
  } catch (err) {
    console.log(err);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
