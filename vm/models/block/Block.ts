import { SHA256 } from "crypto-js";
import { SolarStake } from "../../concensus/model/Stake";
import { SolarValidatorWallet } from "../../concensus/ValidatorWallet";
import { SolarTransaction } from "../wallet/Transaction";

export class SolarBlock{
    public hash:string;
    public prevHash:string;
    public timestamp:number;
    public transactions: SolarTransaction[];
    
    public validator:string;
    public blocksignature:string;
    public stake:SolarStake[];

    constructor(prevHash:string,timestamp:number,transactions:SolarTransaction[],validatorWallet:SolarValidatorWallet | string,stake:SolarStake[],blocksignature?:string){
        this.prevHash = prevHash;
        this.timestamp = timestamp;
        this.stake = stake;

        
        this.hash = this.CreateHash();
        if(validatorWallet instanceof SolarValidatorWallet && blocksignature == undefined){
            this.validator = validatorWallet.getPublicKey;

            this.blocksignature = this.signBlockHash(this.hash,validatorWallet);
    
        }else if(blocksignature != undefined && !(validatorWallet instanceof SolarValidatorWallet)){
            this.validator = validatorWallet;
            this.blocksignature = blocksignature;
        }else{
            this.validator = '';
            this.blocksignature = '';
        }



        this.transactions = transactions;
    }

    public CreateHash():string{
        return SHA256(JSON.stringify(`${this.timestamp}${this.prevHash}${this.transactions}${this.stake}`)).toString();
    }

    public signBlockHash(hash:string,validatorWallet:SolarValidatorWallet){
        return validatorWallet.signHash(hash);
    }
}