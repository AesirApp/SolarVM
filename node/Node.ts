import { SolarValidatorWallet } from "../vm/concensus/ValidatorWallet";
import { SolarBlockchain } from "../vm/models/block/Blockchain";
import { SolarTransaction } from "../vm/models/wallet/Transaction";
import { SolarTransactionPool } from "../vm/models/wallet/TransactionPool";
import { SolarWallet } from "../vm/models/wallet/Wallet";
import { SOLARBROADCAST_TYPE } from "./client/Broadcast";
import { SolarServer } from "./server/Server";
import cron from 'node-cron';
import { SolarBlock } from "../vm/models/block/Block";

export class SolarNode{
    public server: SolarServer;
    public blockchain:SolarBlockchain;
    public pool:SolarTransactionPool;

    public localWallets:SolarWallet[];
    public localValidatorWallets:SolarValidatorWallet[];
    public curvalidator:string = "";

    constructor(curport:number){
        this.blockchain = new SolarBlockchain();

        this.server = new SolarServer(this,curport);
        //this.server.init();

        this.pool = new SolarTransactionPool([]);

        this.localWallets = [];
        this.localValidatorWallets = [];
    }

    public initNodeConnections(){

    }

    public addValidatorWallet(){

    }

    public requestChainBroadcast(){
        this.server.createBroadcast({"TYPE":SOLARBROADCAST_TYPE.REQUESTCHAIN,"payload":this.blockchain});
    }

    public addTransactionToPools(transaction:SolarTransaction){
        this.pool.addTransactionToPool(transaction);
        this.server.createBroadcast({"TYPE":SOLARBROADCAST_TYPE.TRANSACTION,"payload":transaction});
    }

    public addProposedBlock(block:SolarBlock | undefined){
        this.server.createBroadcast({"TYPE":SOLARBROADCAST_TYPE.BLOCKPROPOSE,"payload":block});
        this.blockchain.addBlock(block as SolarBlock);
    }

    public scheduleValidation(){
        cron.schedule('30 * * * *', (now) =>{
            var validAddress = this.blockchain.validator.chooseValidator(this.blockchain.getLatestBlock().prevHash);
            this.curvalidator = validAddress;
            for(var i = 0; i < this.localValidatorWallets.length;i++){
                if(this.localValidatorWallets[i].getPublicKey == validAddress){
                   this.addProposedBlock( this.localValidatorWallets[i].ProposeBlock(this,this.blockchain))
                }
            }
        });
    }
}