import { DeRandomNumberGenerator } from "./model/DeRandomNumberGenerator";
import { SolarStake } from "./model/Stake";

export class SolarStakeValidator{
    public stake:SolarStake[];

    constructor(stake:SolarStake[]){
        this.stake = stake;
    }

    public addStake(stake:SolarStake){
        this.stake.push(stake);
    }

    public broadcaseValidator(prevHash:string){
        return this.chooseValidator(prevHash);
    }

    public chooseValidator(prevHash:string){
        var hashnum = Number("0x" + prevHash);

        var sortedStake = this.stake.sort((a:SolarStake,b:SolarStake) =>{
            if(a.hydrogen < b.hydrogen){
                return -1;
            }else if(b.hydrogen > a.hydrogen){
                return 1;
            }else{
                return 0;
            }
        });

        var getValidatorNum = hashnum % this.GetTotalStakeAmount;

        var curamount = 0;

        for(var i = 0; i  <sortedStake.length; i++){
            if(sortedStake[i].hydrogen + curamount >= getValidatorNum){
                return sortedStake[i].address;
            }else{
                curamount += sortedStake[i].hydrogen;
            }
        }

        return sortedStake[sortedStake.length - 1].address;

    }

    //public chooseValidator(prevHash:string):string{
    //    var totalstakes:any = {};
    //    var finalAddress = "";
    //    var randomnum = DeRandomNumberGenerator.generateNumber(prevHash);
    //    var cummulative = 0;
//
    //    for(var i = 0; i <this.stake.length;i++){
    //        if( totalstakes[this.stake[i].address]){
    //            totalstakes[this.stake[i].address] += this.stake[i].hydrogen;
    //        }else{
    //            totalstakes[this.stake[i].address] = this.stake[i].hydrogen;
    //        }
    //        
    //    }
//
    //    console.log(this.GetTotalStakeAmount);
    //    console.log(randomnum)
//
//
    //    var totalstakeskeys = Object.keys(totalstakes);
    //    for(var i = 0; i < totalstakeskeys.length; i++){
    //        if(totalstakes[totalstakeskeys[i]] / this.GetTotalStakeAmount + cummulative >= randomnum){
    //            return totalstakeskeys[i];
    //        }
    //    }
//
    //    return totalstakeskeys[totalstakeskeys.length - 1];
    //}

    public getStakeAmountOfAddress(address:string){

    }

    public getAllStakesOfAddress(address:string):SolarStake[]{
        var stakes:SolarStake[] = [];

        for(var i = 0; i < this.stake.length; i++){

        }

        return stakes;
    }

    public get GetTotalStakeAmount(){
        var amount = 0;

        for(var i = 0; i < this.stake.length;i++){
            amount += this.stake[i].hydrogen;
        }

        return amount;
    }
}