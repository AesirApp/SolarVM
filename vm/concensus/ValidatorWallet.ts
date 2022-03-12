import { SolarNode } from "../../node/Node";
import { SolarBlock } from "../models/block/Block";
import { SolarBlockchain } from "../models/block/Blockchain";
import { SolarTransaction } from "../models/wallet/Transaction";
import { SolarWallet } from "../models/wallet/Wallet";
import { SolarStake } from "./model/Stake";
import { SolarStakeValidator } from "./StakeValidator";

export class SolarValidatorWallet extends SolarWallet{
    public stakes:SolarStake[];

    constructor(){
        super();

        this.stakes = [];
    }

    public addStake(stakevalidator:SolarStakeValidator,amount:number){
        stakevalidator.addStake({"address":this.keypair.getPublic('hex'),"age":Date.now(),"hydrogen":amount});
        
        this.stakes.push({"address":this.keypair.getPublic('hex'),"age":Date.now(),"hydrogen":amount});
    }

    public getBalance(blockchain: SolarBlockchain): number {
        var blockbalance = super.getBalance(blockchain);

        var amountstaked = 0;

        for(var i = 0; i < blockchain.chainLength; i++){
            for(var j = 0; j < blockchain.chain[i].stake.length; j++){
                if(blockchain.chain[i].stake[j].address == this.getPublicKey){
                    amountstaked += blockchain.chain[i].stake[j].hydrogen;
                }
            }
        }

        return blockbalance - amountstaked;
    }

    public ProposeBlock(client:SolarNode,blockchain:SolarBlockchain){

                var transaction = new SolarTransaction("system",this.getPublicKey,100,{"note":"validator reward","publicAddresses":true});
                var verified = SolarBlockchain.verifyTransactions(client.pool.transactions);
                verified.push(transaction);
                var block = new SolarBlock(blockchain.getLatestBlock().hash,Date.now(),verified,this,blockchain.validator.stake);
               
                if(SolarBlockchain.verifyBlock(block)){
                    return block;
                }else{
                    console.log("The block is not verified")
                    return undefined;
                }
    }

    public signHash(hash:string){
        return this.keypair.sign(hash).toDER('hex');
    }
}