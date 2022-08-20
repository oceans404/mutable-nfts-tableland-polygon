# Minting Mutable NFTs #onPolygon with Tableland 

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

Optional -- verify the contract on Polyscan and mint more NFTs

```
npx hardhat run scripts/mintNFT.js --network polygon-mumbai
```


#### Tableland table creation

- Main Tableland Table: table_nft_main_80001_962 https://mumbai.polygonscan.com/tx/0x2bf46c9e94aee023d8935b9894a3a5a6c706d4090d52b874fe5a55ec1e71df73
- Attributes Tableland Table: table_nft_attributes_80001_963 https://mumbai.polygonscan.com/tx/0xfaf48151a1ce56ed0475db8ff1a7899da59599855a4dc49d56052836ba54840e


#### Smart contract

- TequilaTablesNFT contract on Polygon Mumbai: https://mumbai.polygonscan.com/address/0x022e62b3aed7dc93a1d33adcff821e9816544e83


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