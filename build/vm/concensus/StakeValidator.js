"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolarStakeValidator = void 0;
class SolarStakeValidator {
    constructor(stake) {
        this.stake = stake;
    }
    addStake(stake) {
        this.stake.push(stake);
    }
    broadcaseValidator(prevHash) {
        return this.chooseValidator(prevHash);
    }
    chooseValidator(prevHash) {
        var hashnum = Number("0x" + prevHash);
        var sortedStake = this.stake.sort((a, b) => {
            if (a.hydrogen < b.hydrogen) {
                return -1;
            }
            else if (b.hydrogen > a.hydrogen) {
                return 1;
            }
            else {
                return 0;
            }
        });
        var getValidatorNum = hashnum % this.GetTotalStakeAmount;
        var curamount = 0;
        for (var i = 0; i < sortedStake.length; i++) {
            if (sortedStake[i].hydrogen + curamount >= getValidatorNum) {
                return sortedStake[i].address;
            }
            else {
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
    getStakeAmountOfAddress(address) {
    }
    getAllStakesOfAddress(address) {
        var stakes = [];
        for (var i = 0; i < this.stake.length; i++) {
        }
        return stakes;
    }
    get GetTotalStakeAmount() {
        var amount = 0;
        for (var i = 0; i < this.stake.length; i++) {
            amount += this.stake[i].hydrogen;
        }
        return amount;
    }
}
exports.SolarStakeValidator = SolarStakeValidator;
