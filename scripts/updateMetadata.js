// Standard `ethers` import for chain interaction, `network` for logging, and `run` for verifying contracts
const { ethers } = require("hardhat");
// The script required to upload metadata to IPFS
const { prepareSqlForTables } = require("./prepareSql");
// Import Tableland
const { connect } = require("@tableland/sdk");
// Import 'node-fetch' and set globally -- needed for Tableland to work with CommonJS
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
globalThis.fetch = fetch;

require("@nomiclabs/hardhat-etherscan");

const { TablelandTables } = require("./constants");

async function main() {
  const [signer] = await ethers.getSigners();
  const tableland = await connect({ signer, chain: "polygon-mumbai" });

  const mainTable = TablelandTables.main;
  const attributesTable = TablelandTables.attributes;

  // Get info for all tables associated with your account
  const tables = await tableland.list();
  console.log(tables);

  // Read all records in the main table
  const { columns: mc, rows: mr } = await tableland.read(
    `SELECT * FROM ${mainTable}`
  );
  console.log(mc, mr);

  // Read all records in the attributes table
  const { columns: ac, rows: ar } = await tableland.read(
    `SELECT * FROM ${attributesTable}`
  );
  console.log(ac, ar);

  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  // MODIFY THIS TO YOUR LIKING! Update the attributes table with SQL

  const updateTable = await tableland.write(
    //`UPDATE ${attributesTable} SET value = 'Tequila on the rocks!' WHERE main_id = 0 AND trait_type = 'DrinkName'`
    `UPDATE ${mainTable} SET image = 'https://demo.storj-ipfs.com/ipfs/Qmcd7eUxGLerxoXePLM43Vj4TSxYh6HqHCgDa7bfeLS9AD' WHERE id = 0;`
  );
  console.log(updateTable);

  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
