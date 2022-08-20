// Standard `ethers` import for blockchain operations, plus `network` for logging the flagged network
const { ethers, network } = require("hardhat");
require("@nomiclabs/hardhat-etherscan");
const dotenv = require("dotenv");
dotenv.config();

const { TablelandTables, contractAddress } = require("./constants");

async function main() {
  await hre.run("verify:verify", {
    address: contractAddress, // Update with your contract address
    constructorArguments: [
      "https://testnet.tableland.network/query?mode=list&s=",
      TablelandTables.main,
      TablelandTables.attributes,
    ],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
