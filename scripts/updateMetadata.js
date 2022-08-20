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

  const tables = await tableland.list();
  console.log(tables);

  const { columns, rows } = await tableland.read(
    `SELECT * FROM ${attributesTable}`
  );

  console.log(columns, rows);

  const updateTable = await tableland.write(
    `UPDATE ${attributesTable} SET value = 'Green' WHERE main_id = 0 AND trait_type = 'Color'`
    // `UPDATE ${mainTable} SET image = '${cv}' WHERE id = 1;`
  );
  console.log(updateTable);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
