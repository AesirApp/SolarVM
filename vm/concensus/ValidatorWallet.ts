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
        stakevalidator.stake.push()
        this.stakes.push({"address":this.keypair.getPublic('hex'),"age":Date.now(),"hydrogen":amount});
    }

    public ProposeBlock(client:SolarNode,blockchain:SolarBlockchain){

                var transaction = new SolarTransaction("system",this.getPublicKey,100,{"note":"validator reward","publicAddresses":true});
                var block = new SolarBlock(blockchain.getLatestBlock().hash,Date.now(),client.pool.transactions,this,blockchain.validator.stake);
               
                if(SolarBlockchain.verifyBlock(block)){
                     //Broadcast block function
                     
                    return block;
                }else{
                    console.log("The block is not verified")
                }
    }

    public signHash(hash:string){
        return this.keypair.sign(hash).toDER('hex');
    }
}