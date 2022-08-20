// Standard `ethers` import for chain interaction, `network` for logging, and `run` for verifying contracts
const { ethers } = require("hardhat");
// Import 'node-fetch' and set globally -- needed for Tableland to work with CommonJS
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
globalThis.fetch = fetch;
require("@nomiclabs/hardhat-etherscan");

const { contractAddress } = require("./constants");

// MINT A SINGLE NFT
async function main() {
  const tequilaNFTContract = await ethers.getContractFactory(
    "TequilaTablesNFT"
  );

  const contract = await tequilaNFTContract.attach(contractAddress);

  const mintToken = await contract.mint();
  const mintTxn = await mintToken.wait();
  const mintReceipient = mintTxn.events[0].args[1];
  const tokenId = mintTxn.events[0].args[2];
  console.log(
    `\nNFT minted: tokenId '${tokenId.toNumber()}' to owner '${mintReceipient}'`
  );
  const tokenURI = await contract.tokenURI(tokenId);
  console.log(
    `See an example of 'tokenURI' using token '${tokenId}' here:\n${tokenURI}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
