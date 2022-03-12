import randomSeed from 'random-seed';

export class DeRandomNumberGenerator{
    public static generateNumber(prevBlockHash:string){
        var rand = randomSeed.create(prevBlockHash);

        var n = rand(100);

        return n/ 100;
    }

}