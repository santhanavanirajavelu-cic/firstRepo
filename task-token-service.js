// Create a script that creates a fungible token with the Hedera Token Service belonging to Account1.
// The initial supply should be 350.50 and additional supply can be created by Account2. The maximum supply should be 500.
// Create a script to send 25.25 tokens to each of Accounts3 and Account4.
// Pause the token. Then make another transfer of 1.35 to Account3. The transaction fails. Unpause the token and complete the transfer.

console.clear();
require("dotenv").config();
const {
	AccountId,
	PrivateKey,
	Client,
	TokenCreateTransaction,
	TokenType,
	TokenSupplyType,
	TransferTransaction,
	AccountBalanceQuery,
	TokenAssociateTransaction,
} = require("@hashgraph/sdk");

// Configure accounts and client, and generate needed keys
const account1Id = AccountId.fromString(process.env.ACCOUNT1ID);
const account1Key = PrivateKey.fromString(process.env.ACCOUNT1_PRIVATE_KEY);

const account2Id = AccountId.fromString(process.env.ACCOUNT2ID);
const account2Key = PrivateKey.fromString(process.env.ACCOUNT2_PRIVATE_KEY);

const account3Id = AccountId.fromString(process.env.ACCOUNT3ID);
const account3Key = PrivateKey.fromString(process.env.ACCOUNT3_PRIVATE_KEY);

const account4Id = AccountId.fromString(process.env.ACCOUNT4ID);
const account4Key = PrivateKey.fromString(process.env.ACCOUNT4_PRIVATE_KEY);


const client = Client.forTestnet().setOperator(account1Id, account1Key);

const supplyKey = PrivateKey.generate();

// test
async function main() {
	//CREATE FUNGIBLE TOKEN (STABLECOIN)
	let tokenCreateTx = await new TokenCreateTransaction()
		.setTokenName("USD Bar")
		.setTokenSymbol("USDB")
		.setTokenType(TokenType.FungibleCommon)
		.setDecimals(2)
		.setInitialSupply(35050)
		.setTreasuryAccountId(account2Id)
		.setSupplyType(TokenSupplyType.Infinite)
		.setSupplyKey(supplyKey)
		.freezeWith(client);

	let tokenCreateSign = await tokenCreateTx.sign(account2Key);
	let tokenCreateSubmit = await tokenCreateSign.execute(client);
	let tokenCreateRx = await tokenCreateSubmit.getReceipt(client);
	let tokenId = tokenCreateRx.tokenId;
	console.log(`- Created token with ID: ${tokenId} \n`);


    	//CREATE FUNGIBLE TOKEN (STABLECOIN)
	let tokenCreateTx1 = await new TokenCreateTransaction()
    .setTokenName("USD Bar")
    .setTokenSymbol("USDB")
    .setTokenType(TokenType.FungibleCommon)
    .setDecimals(2)
    .setInitialSupply(150)
    .setTreasuryAccountId(account1Id)
    .setSupplyType(TokenSupplyType.Infinite)
    .setSupplyKey(supplyKey)
    .freezeWith(client);

let tokenCreateSign1 = await tokenCreateTx1.sign(account2Key);
let tokenCreateSubmit1 = await tokenCreateSign1.execute(client);
let tokenCreateRx1 = await tokenCreateSubmit1.getReceipt(client);
let tokenId1 = tokenCreateRx1.tokenId;
console.log(`- Created token with ID: ${tokenId1} \n`);


	//TOKEN ASSOCIATION WITH ACCOUNT3
	let associateaccountTx = await new TokenAssociateTransaction()
		.setAccountId(account3Id)
		.setTokenIds([tokenId])
		.freezeWith(client)
		.sign(account3Key);
	let associateaccountTxSubmit = await associateaccountTx.execute(client);
	let associateaccountRx = await associateaccountTxSubmit.getReceipt(client);
	console.log(`- Token association with account3: ${associateaccountRx.status} \n`);

	//BALANCE CHECK
	var balanceCheckTx = await new AccountBalanceQuery().setAccountId(account2Id).execute(client);
	console.log(`- Account 2: ${balanceCheckTx.tokens._map.get(tokenId.toString())} units of token ID ${tokenId}`);
	var balanceCheckTx = await new AccountBalanceQuery().setAccountId(account3Id).execute(client);
	console.log(`- Account3 balance: ${balanceCheckTx.tokens._map.get(tokenId.toString())} units of token ID ${tokenId}`);

    	//TOKEN ASSOCIATION WITH ACCOUNT4
	let associateaccountTx4 = await new TokenAssociateTransaction()
    .setAccountId(account4Id)
    .setTokenIds([tokenId])
    .freezeWith(client)
    .sign(account4Key);
let associateaccountTxSubmit4 = await associateaccountTx4.execute(client);
let associateaccountRx4 = await associateaccountTxSubmit4.getReceipt(client);
console.log(`- Token association with account4: ${associateaccountRx4.status} \n`);


	//TRANSFER STABLECOIN FROM Account2 TO Account3
	let tokenTransferTx = await new TransferTransaction()
		.addTokenTransfer(tokenId, account2Id, -25.25)
		.addTokenTransfer(tokenId, account3Id, 25.25)
		.freezeWith(client)
		.sign(account2Key);
	let tokenTransferSubmit = await tokenTransferTx.execute(client);
	let tokenTransferRx = await tokenTransferSubmit.getReceipt(client);
	console.log(`\n- Stablecoin transfer from Account2 to Account3: ${tokenTransferRx.status} \n`);

	//BALANCE CHECK
	var balanceCheckTx = await new AccountBalanceQuery().setAccountId(account2Id).execute(client);
	console.log(`- Account2 balance: ${balanceCheckTx.tokens._map.get(tokenId.toString())} units of token ID ${tokenId}`);
	var balanceCheckTx = await new AccountBalanceQuery().setAccountId(account3Id).execute(client);
	console.log(`- Account3 balance: ${balanceCheckTx.tokens._map.get(tokenId.toString())} units of token ID ${tokenId}`);



    //TRANSFER STABLECOIN FROM Account2 TO Account4
	let tokenTransferTx4 = await new TransferTransaction()
    .addTokenTransfer(tokenId, account2Id, -25.25)
    .addTokenTransfer(tokenId, account4Id, 25.25)
    .freezeWith(client)
    .sign(account2Key);
let tokenTransferSubmit4 = await tokenTransferTx4.execute(client);
let tokenTransferRx4 = await tokenTransferSubmit4.getReceipt(client);
console.log(`\n- Stablecoin transfer from Account2 to Account4: ${tokenTransferRx4.status} \n`);

//BALANCE CHECK
var balanceCheckTx = await new AccountBalanceQuery().setAccountId(account2Id).execute(client);
console.log(`- Account2 balance: ${balanceCheckTx.tokens._map.get(tokenId.toString())} units of token ID ${tokenId}`);
var balanceCheckTx = await new AccountBalanceQuery().setAccountId(account4Id).execute(client);
console.log(`- Account4 balance: ${balanceCheckTx.tokens._map.get(tokenId.toString())} units of token ID ${tokenId}`);





}
main();