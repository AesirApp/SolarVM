import { SolarStakeValidator } from "../../concensus/StakeValidator";
import { SolarValidatorWallet } from "../../concensus/ValidatorWallet";
import { verifySignature } from "../../util/ChainUtil";
import { SolarTransaction } from "../wallet/Transaction";
import { SolarBlock } from "./Block";

export class SolarBlockchain{
    public chain:SolarBlock[];
    public validator:SolarStakeValidator;

    constructor(){
        this.chain = [SolarBlockchain.GenesisBlock()];
        this.validator = new SolarStakeValidator([]);
    }

    public get chainLength():number{
        return this.chain.length;
    }

    //needed for everyone to keep a current copy of all the blocks
    public addBlock(block:SolarBlock){
        this.chain.push(block);
    }

    //ONLY THE BLOCK VERIFIER CAN GENERATE BLOCKS
    public generateBlock(transactions:SolarTransaction[],validator:SolarValidatorWallet){
        //console.log(this.validator.chooseValidator(this.getLatestBlock().hash))
        if(this.validator.chooseValidator(this.getLatestBlock().hash) != validator.getPublicKey){
            console.log("not the right validator")
            return;
        }
        transactions.push(new SolarTransaction("system",validator.getPublicKey,100,{"note":"validator reward","publicAddresses":true}));

        var block = new SolarBlock(this.getLatestBlock().hash,Date.now(),transactions,validator,this.validator.stake);
       
        if(SolarBlockchain.verifyBlock(block)){
             //Broadcast block function
             
            this.chain.push(block);
        }else{
            console.log("The block is not verified")
        }
       
    }

    public static verifyTransactions(transactions:SolarTransaction[]){
        var verifiedTransactions:SolarTransaction[] = [];
        for(var i = 0; i < transactions.length; i++){
            if(transactions[i].verifyTransaction()){
                verifiedTransactions.push(transactions[i]);
            }
            
        }

        return verifiedTransactions;
    }

    public isChainValid(){

    }

    public getLatestBlock(){
        return this.chain[this.chainLength - 1];
    }
    //verify that the block was created by the correct validator
    public static verifyBlock(block:SolarBlock):boolean{
       return verifySignature(block.validator,block.blocksignature,block.hash)
    }

    public static GenesisBlock(){
        return new SolarBlock("genesis",0,[],new SolarValidatorWallet(),[]);
    }

    public getBalance(address:string){
        var amount = 0;
        for(var i = 0; i < this.chain.length; i++){
            for(var j = 0; j < this.chain[i].transactions.length;j++){
                if(this.chain[i].transactions[j].sender == address){
                    amount -= this.chain[i].transactions[j].amount;
                }

                if(this.chain[i].transactions[j].recipient == address){
                    amount += this.chain[i].transactions[j].amount;
                }
            }
        }

        return amount;
    }
}