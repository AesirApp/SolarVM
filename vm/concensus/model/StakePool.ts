import { SolarStake } from "./Stake";
import { SolarValidatorWallet } from "../ValidatorWallet";

export class SolarStakePool{
    public stakes:SolarStake[];
    constructor(){
        this.stakes = [];
    }

    public addStake(wallet:SolarStake,amount:string){

    }
}