const dotenv = require("dotenv");
dotenv.config();

const { maxMintNumber } = require("./constants");

/**
 * Prepare metadata as an array of metadata objects.
 * @returns {Array<Object>} Metadata files parsed to objects, including the starter image
 */
async function generateStarterMetadata() {
  const idsArray = Array(maxMintNumber)
    .fill(0)
    .map((_, i) => i);

  // naive solution for trait randomness -- use Chainlink VRF in prod https://docs.chain.link/docs/chainlink-vrf/
  const tequilaTypes = ["Reposado", "Joven", "Añejo"];
  const drinkName = ["Margharita", "Paloma"];
  const finalMetadata = idsArray.map((nftId) => ({
    id: nftId,
    name: `TequilaNFT #${nftId}`,
    description: "A refreshing NFT by oceans404",
    image:
      "https://demo.storj-ipfs.com/ipfs/QmSd2WjDkXAFMuwDuaZkNLsLE5w9MsNupwHMXFWJYhkMux",
    attributes: [
      {
        trait_type: "TequilaType",
        value: tequilaTypes[Math.floor(Math.random() * tequilaTypes.length)],
      },
      {
        trait_type: "DrinkName",
        value: drinkName[Math.floor(Math.random() * drinkName.length)],
      },
    ],
  }));
  return finalMetadata;
}

module.exports = generateStarterMetadata;
