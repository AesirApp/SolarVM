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

    constructor(prevHash:string,timestamp:number,transactions:SolarTransaction[],validatorWallet:SolarValidatorWallet,stake:SolarStake[]){
        this.prevHash = prevHash;
        this.timestamp = timestamp;
        this.stake = stake;

        this.validator = validatorWallet.getPublicKey;
        this.hash = this.CreateHash();
        this.blocksignature = this.signBlockHash(this.hash,validatorWallet);

        this.transactions = transactions;
    }

    public CreateHash():string{
        return SHA256(JSON.stringify(`${this.timestamp}${this.prevHash}${this.transactions}${this.stake}`)).toString();
    }

    public signBlockHash(hash:string,validatorWallet:SolarValidatorWallet){
        return validatorWallet.signHash(hash);
    }
}