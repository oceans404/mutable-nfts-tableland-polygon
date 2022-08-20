const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("tequilaTablesNFT", function () {
  let TequilaTablesNFT;
  let tequilaTablesNFT;
  let owner;
  let addr1;
  let tokenId;
  let mainTable;
  let attributesTable;
  let tablelandGatewayURI;
  // Set up some common variables used throughout, as defined in the `deploy` script
  before(async () => {
    [owner, addr1] = await ethers.getSigners();
    tablelandGatewayURI =
      "https://testnet.tableland.network/query?mode=list&s=";
    mainTable = "table_nft_main_80001_1"; // Make up some table prefix_chainId_tableId
    attributesTable = "table_nft_attributes_80001_2";
    TequilaTablesNFT = await ethers.getContractFactory("TequilaTablesNFT");
    tequilaTablesNFT = await TequilaTablesNFT.deploy(
      tablelandGatewayURI,
      mainTable,
      attributesTable
    );
    await tequilaTablesNFT.deployed();
  });
  it("Should mint a token to the caller address and allow a transfer", async function () {
    // Mint an NFT to the calling `owner` & wait until the transaction is mined
    const mintTx = await tequilaTablesNFT.connect(owner).mint();
    await mintTx.wait();

    // Validate the owner of the minted token is `owner`
    expect(await tequilaTablesNFT.ownerOf(0)).to.equal(owner.address);
    // Validate the NFT can be transferred
    await tequilaTablesNFT["safeTransferFrom(address,address,uint256)"](
      owner.address,
      addr1.address,
      0
    );
    expect(await tequilaTablesNFT.ownerOf(0)).to.equal(addr1.address);
  });
  it("Should return `tokenURI` for a valid `tokenId`", async function () {
    // Mint an NFT to the calling `owner` & wait until the transaction is mined
    const mintTx = await tequilaTablesNFT.connect(owner).mint();
    await mintTx.wait();

    // Validate the `tokenURI` of id `0`
    let tokenURI = await tequilaTablesNFT.tokenURI(0);
    expect(await tokenURI).to.equal(
      `${tablelandGatewayURI}SELECT%20json_object%28%27id%27%2Cid%2C%27name%27%2Cname%2C%27description%27%2Cdescription%2C%27attributes%27%2Cjson_group_array%28json_object%28%27trait_type%27%2Ctrait_type%2C%27value%27%2Cvalue%29%29%29%20FROM%20${mainTable}%20JOIN%20${attributesTable}%20ON%20${mainTable}%2Eid%20%3D%20${attributesTable}%2Emain_id%20WHERE%20id%3D0%20group%20by%20id`
    );
  });
  it("Should fail if more than 2 tokens are attempted to be minted", async function () {
    // Expect a failure when the onwer mints a 3rd token
    await expect(tequilaTablesNFT.connect(owner).mint()).to.be.revertedWith(
      "Maximum number of tokens have been minted"
    );
  });
});
