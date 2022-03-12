import { SHA256 } from "crypto-js";
import { ec } from "elliptic";
import { verifySignature } from "../../util/ChainUtil";
import { SolarWallet } from "./Wallet";

export interface SolarTransactionMessage{
    note:string;
    publicAddresses:boolean;
}

export class SolarTransaction{
    public signature:string;
    public static TRANSACTION_FEE = 100;

    public sender:string;
    public recipient:string;

    public amount:number;
    public message:SolarTransactionMessage;
    constructor(sender:string,recipient:string,hydrogen:number,message:SolarTransactionMessage){
        this.sender = sender;
        this.recipient = recipient;
        this.amount = hydrogen;
        this.message = message;

        this.signature = "";

    }

    public static CreateTransaction(senderWallet:SolarWallet,recipientaddress:string,hydrogen:number,message:SolarTransactionMessage){
        var transaction = new SolarTransaction(senderWallet.getPublicKey,recipientaddress,hydrogen,message);
        transaction.signTransaction(senderWallet);

        return transaction;
    }

    public calculateTransactionHash(){
        return SHA256(this.sender + this.recipient + this.amount.toString() + JSON.stringify(this.message)).toString();
    }

    public signTransaction(senderwallet:SolarWallet){
        return senderwallet.sign(this);
    }

    public verifyTransaction(){
        return verifySignature(this.sender,this.signature,this.calculateTransactionHash());

    }
}