# Minting Mutable NFTs #onPolygon with Tableland 

This repo goes along with an [EthMexico](https://mexico.ethglobal.com/) 2022 [workshop by the same name](https://www.canva.com/design/DAFJyRu-DgQ/dGEghPYLu4wnawRwb7pBLQ/edit?utm_content=DAFJyRu-DgQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## Technology intros

### Intro to [Polygon](https://polygon.technology/)

Polygon is the leading Ethereum scaling solution. We'll use Polygon PoS on the Polygon Mumbai testnet to deploy smart contracts and Tableland tables. Switch to the Polygon Mumbai network in Metamask, create a new test account, and [send yourself some Matic from a faucet](https://mumbaifaucet.com/).

### Intro to [Tableland](https://tableland.xyz/)

Tableland is a network and relational metadata protocol for EVM chains like Ethereum. We'll use Tableland to store, query, and update NFT metadata on two tables. Here are some things you can do with Tableland.

- Use tables to store mutable NFT metadata governed by immutable rules.
- Use tables to attach in-app or in-game metadata to existing NFTs.
- Control table write access with token or address-based rules.
- Use tables to build fully decentralized apps and games that require complex relational data models.


## LFB: Let's Build! ;)

Get started building fast. Clone this repo, then create a .env file and add the following as environment variables from [Alchemy](https://alchemy.com/), [Polyscan](https://polygonscan.com/apis), and [Metamask](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key). CREATE A NEW TEST ACCOUNT ON METAMASK. DO NOT USE AN ACCOUNT WITH REAL ASSETS.

```
touch .env
```

Add the following to your .env file

- ALCHEMY_POLYGON_MUMBAI_API_KEY=your_polygon_mumbai_alchemy_api_key 
- POLYGONSCAN_API_KEY=your_polygonscan_api_key
- PRIVATE_KEY=your_new_dev_only_account_metamask_private_key_with_no_real_assets

then install dependencies and deploy the smart contract!

```
npm i
npx hardhat run scripts/deployTequilaTables.js --network "polygon-mumbai"
```

After you've deployed, read the contractAddress and 2 Tableland table names logged in the CLI. Update constants accordingly on lines 2-7 of scripts/constants.js

#### Optional -- mint more NFTs

```
npx hardhat run scripts/mintNFT.js --network polygon-mumbai
```

#### Updating Metadata

Modify code inside of scripts/updateMetadata.js, then run the script to update metadata. One callout -- by default only the contract creator can update metadata. If you want the owner to be able to update their NFT's metadata, look into [Using a TablelandController](https://docs.tableland.xyz/table-ownership-access)

```
 npx hardhat run scripts/updateMetadata.js --network polygon-mumbai
```

#### Smart contract: TequilaTablesNFT 

- contract on Polygon Mumbai: https://mumbai.polygonscan.com/address/0x022e62b3aed7dc93a1d33adcff821e9816544e83
- Testnets tequilatablesnft-v2: https://testnets.opensea.io/collection/tequilatablesnft-v2


#### Tableland tables

Main Tableland Table: table_nft_main_80001_962 

- Polyscan: https://mumbai.polygonscan.com/tx/0x2bf46c9e94aee023d8935b9894a3a5a6c706d4090d52b874fe5a55ec1e71df73
- Testnets Opensea: https://testnets.opensea.io/assets/mumbai/0x4b48841d4b32c4650e4abc117a03fe8b51f38f68/962

Attributes Tableland Table: table_nft_attributes_80001_963 

- Polyscan: https://mumbai.polygonscan.com/tx/0xfaf48151a1ce56ed0475db8ff1a7899da59599855a4dc49d56052836ba54840e
- Testnets Opensea: https://testnets.opensea.io/assets/mumbai/0x4b48841d4b32c4650e4abc117a03fe8b51f38f68/963


#### TokenURI

- NFT minted: tokenURI for tokenId '0' https://testnet.tableland.network/query?mode=list&s=SELECT%20json_object%28%27id%27%2Cid%2C%27name%27%2Cname%2C%27image%27%2Cimage%2C%27description%27%2Cdescription%2C%27attributes%27%2Cjson_group_array%28json_object%28%27trait_type%27%2Ctrait_type%2C%27value%27%2Cvalue%29%29%29%20FROM%20table_nft_main_80001_962%20JOIN%20table_nft_attributes_80001_963%20ON%20table_nft_main_80001_962%2Eid%20%3D%20table_nft_attributes_80001_963%2Emain_id%20WHERE%20id%3D0%20group%20by%20id

#### Images
Drink img assets -- already uploaded to Storj (decentralized file storage) and pinned on IPFS

- Full drink-5.png https://demo.storj-ipfs.com/ipfs/QmSd2WjDkXAFMuwDuaZkNLsLE5w9MsNupwHMXFWJYhkMux
- Medium-full drink-4.png https://demo.storj-ipfs.com/ipfs/Qmcn9L9CEA6XyikhV91fqyNMb36FeJZRLYX9U1ikbAh4Nq
- Half Full drink-3.png https://demo.storj-ipfs.com/ipfs/QmS41uJLCt68XHL2CKWerC315c8rFdAyQqT8WfZYzrNGdL
- Almost Empty drink-2.png https://demo.storj-ipfs.com/ipfs/Qmcd7eUxGLerxoXePLM43Vj4TSxYh6HqHCgDa7bfeLS9AD
- Empty drink-1.png https://demo.storj-ipfs.com/ipfs/QmbqwuGqDaXQnmig6jfyr9PoxfR1Hw924GH9QwTxe45u34

### Shoutout to Tableland's dev rel team!

- This project was inspired by Tableland's tutorial "Deploying an NFT on Polygon" and Polygon https://docs.tableland.xyz/deploying-an-nft-on-polygon
- I used their repo and modified to fit my needs / make metadata mutable through UPDATEs.