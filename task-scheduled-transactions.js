//NOTE:   "type": "module", must be included in package.json to make the below code work.

import { ScheduleCreateTransaction, Client, TransferTransaction, Hbar } from "@hashgraph/sdk";
import dotenv from "dotenv";

dotenv.config();

async function main() {

    const myAccountId = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;

    const account1ID = process.env.ACCOUNT1ID;
    const account2ID = process.env.ACCOUNT2ID;

    // If we weren't able to grab it, we should throw a new error
    if (myAccountId == null ||
        myPrivateKey == null) {
        throw new Error("Environment variables myAccountId and myPrivateKey must be present");
    }
    // Create our connection to the Hedera network
    const client = Client.forTestnet();
    client.setOperator(myAccountId, myPrivateKey);

    // Create a transaction to schedule
    const transactionToSchedule = new TransferTransaction()
        .addHbarTransfer(account1ID, Hbar.fromTinybars(-100))
        .addHbarTransfer(account2ID, Hbar.fromTinybars(100));

    // //Create a schedule transaction
    const transaction = new ScheduleCreateTransaction()
        .setScheduledTransaction(transactionToSchedule);

    //Sign with the client operator key and submit the transaction to a Hedera network
    const txResponse = await transaction.execute(client);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the schedule ID
    const scheduleId = receipt.scheduleId;
    console.log("The schedule ID of the schedule transaction is " + scheduleId);



    //Create the transaction2
const transaction1 = await new ScheduleSignTransaction()
.setScheduleId('0.0.3565755')
.freezeWith(client)
.sign(privateKeySigner1);

//Sign with the client operator key to pay for the transaction and submit to a Hedera network
const txResponse1 = await transaction1.execute(client);

//Get the receipt of the transaction
const receipt1 = await txResponse1.getReceipt(client);

//Get the transaction status
const transactionStatus = receipt1.status;
console.log("The transaction consensus status is " +transactionStatus);

}

main();
