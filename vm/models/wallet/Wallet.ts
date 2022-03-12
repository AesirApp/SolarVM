import { ec } from "elliptic";
import { GenerateUniqueKeyPair } from "../../util/ChainUtil";
import { SolarBlockchain } from "../block/Blockchain";
import { SolarTransaction } from "./Transaction";

export class SolarWallet{
    public balance:number;
    public keypair: ec.KeyPair;
    public publicKey:string;

    constructor(){
        this.balance = 0;
        this.keypair = GenerateUniqueKeyPair();
        this.publicKey = this.keypair.getPublic('hex');

    }

    public loadWallet(){

    }

    public saveWallet(){

    }
    public createTransaction(blockchain:SolarBlockchain,recipient:string,hydrogen:number){
        var balance = this.getBalance(blockchain);
        if(balance >= hydrogen + SolarTransaction.TRANSACTION_FEE){
            SolarTransaction.CreateTransaction(this,recipient,hydrogen,{"note":"no note specified","publicAddresses":true});
        }
    }

    public getBalance(blockchain:SolarBlockchain):number{
        blockchain.getBalance(this.getPublicKey);
        return 0;
    }

    public get getPublicKey():string{
        return this.keypair.getPublic('hex');
    }

    public sign(transaction:SolarTransaction){
        return this.keypair.sign(transaction.calculateTransactionHash()).toDER('hex');
    }
}