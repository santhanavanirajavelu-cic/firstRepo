const {
    Client,
    PrivateKey,
    AccountCreateTransaction,
    Hbar,
    AccountBalanceQuery
} = require("@hashgraph/sdk");

require('dotenv').config({ path: '.env' });
async function main() {

    const myAccountId = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;

    // throw error if key is not found
    if (myAccountId == null ||
        myPrivateKey == null) {
        throw new Error("Environment variables myAccountId and myPrivateKey must be present");
    }

    // Create connection to the Hedera network
    const client = Client.forTestnet();
    client.setOperator(myAccountId, myPrivateKey);

    //  Create new keys
    const account1PrivateKey = PrivateKey.generateED25519();
    const account1PublicKey = account1PrivateKey.publicKey;

    const account2PrivateKey = PrivateKey.generateED25519();
    const account2PublicKey = account2PrivateKey.publicKey;

    const account3PrivateKey = PrivateKey.generateED25519();
    const account3PublicKey = account3PrivateKey.publicKey;

    const account4PrivateKey = PrivateKey.generateED25519();
    const account4PublicKey = account4PrivateKey.publicKey;

    const account5PrivateKey = PrivateKey.generateED25519();
    const account5PublicKey = account5PrivateKey.publicKey;

    //set initial balance for every accounts
    const account1 = await new AccountCreateTransaction()
        .setKey(account1PublicKey)
        .setInitialBalance(new Hbar(100))
        .execute(client);

    const account2 = await new AccountCreateTransaction()
        .setKey(account2PublicKey)
        .setInitialBalance(new Hbar(100))
        .execute(client);

    const account3 = await new AccountCreateTransaction()
        .setKey(account3PublicKey)
        .setInitialBalance(new Hbar(100))
        .execute(client);

    const account4 = await new AccountCreateTransaction()
        .setKey(account4PublicKey)
        .setInitialBalance(new Hbar(100))
        .execute(client);

    const account5 = await new AccountCreateTransaction()
        .setKey(account5PublicKey)
        .setInitialBalance(new Hbar(100))
        .execute(client);

    // Get the new account IDs
    //get Account1 keys
    const getReceipt1 = await account1.getReceipt(client);
    const account1Id = getReceipt1.accountId;
    console.log("The account1 ID is: " + account1Id);
    console.log("The account1 privateKey is: " + account1PrivateKey.toStringRaw());
    console.log("The account1 PublicKey is: " + account1PublicKey.toStringRaw());

    // get Account2 keys

    const getReceipt2 = await account2.getReceipt(client);
    const account2Id = getReceipt2.accountId;
    console.log("The account2 ID is: " + account2Id);
    console.log("The account2 privateKey is: " + account2PrivateKey.toStringRaw());
    console.log("The account2 PublicKey is: " + account2PublicKey.toStringRaw());

    // get Account3 keys
    const getReceipt3 = await account3.getReceipt(client);
    const account3Id = getReceipt3.accountId;
    console.log("The account3 ID is: " + account3Id);
    console.log("The account3 privateKey is: " + account3PrivateKey.toStringRaw());
    console.log("The account3 PublicKey is: " + account3PublicKey.toStringRaw());

    // get Account4 keys
    const getReceipt4 = await account4.getReceipt(client);
    const account4Id = getReceipt4.accountId;
    console.log("The account4 ID is: " + account4Id);
    console.log("The account4 privateKey is: " + account4PrivateKey.toStringRaw());
    console.log("The account4 PublicKey is: " + account4PublicKey.toStringRaw());

    // get Account5 keys
    const getReceipt5 = await account5.getReceipt(client);
    const account5Id = getReceipt5.accountId;
    console.log("The account5 ID is: " + account5Id);
    console.log("The account5 privateKey is: " + account5PrivateKey.toStringRaw());
    console.log("The account5 PublicKey is: " + account5PublicKey.toStringRaw());


    //Check the new account's balance
    const getNewBalance1 = await new AccountBalanceQuery()
        .setAccountId(account1Id)
        .execute(client);

    console.log("The account1 balance after the transfer is: " + getNewBalance1.hbars.toTinybars() + " tinybar.")


    const getNewBalance2 = await new AccountBalanceQuery()
        .setAccountId(account2Id)
        .execute(client);

    console.log("The account2 balance after the transfer is: " + getNewBalance2.hbars.toTinybars() + " tinybar.")


    const getNewBalance3 = await new AccountBalanceQuery()
        .setAccountId(account3Id)
        .execute(client);

    console.log("The account3 balance after the transfer is: " + getNewBalance3.hbars.toTinybars() + " tinybar.")

    const getNewBalance4 = await new AccountBalanceQuery()
        .setAccountId(account4Id)
        .execute(client);

    console.log("The account4 balance after the transfer is: " + getNewBalance4.hbars.toTinybars() + " tinybar.")

    const getNewBalance5 = await new AccountBalanceQuery()
        .setAccountId(account5Id)
        .execute(client);

    console.log("The account5 balance after the transfer is: " + getNewBalance5.hbars.toTinybars() + " tinybar.")

}

main();