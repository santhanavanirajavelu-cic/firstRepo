// Use Account1 as a treasury account so that Account2 can spend
// 20 Hbar on behalf of Account1.
// Create a transaction that transfers the 20 Hbar to Account3.
// Re-run the same operation and show that the allowance has been
// used and that the second transaction fails.

console.clear();
require("dotenv").config();
const {
    Client,
    TopicCreateTransaction,
    TopicMessageQuery,
    TopicMessageSubmitTransaction,
} = require("@hashgraph/sdk");

// Grab the Account1Id and Account1Key from the .env file
const myAccountId = process.env.ACCOUNT1ID;
const myPrivateKey = process.env.ACCOUNT1_PRIVATE_KEY;

// Build Hedera testnet and mirror node client
const client = Client.forTestnet();

// Set the Account1 ID and Account1 key
client.setOperator(myAccountId, myPrivateKey);

async function main() {

}

main();