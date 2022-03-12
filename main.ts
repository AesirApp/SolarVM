import { SolarValidatorWallet } from "./vm/concensus/ValidatorWallet";
import { SolarBlockchain } from "./vm/models/block/Blockchain";
import { SolarWallet } from "./vm/models/wallet/Wallet";

var blockchain = new SolarBlockchain();

var tempwallet1 = new SolarValidatorWallet();
var tempwallet2 = new SolarValidatorWallet();
var tempwallet3 = new SolarValidatorWallet();

tempwallet1.addStake(blockchain.validator,10000);
blockchain.validator.addStake({"address":tempwallet1.getPublicKey,"hydrogen":10000,"age":0})
blockchain.validator.addStake({"address":tempwallet2.getPublicKey,"hydrogen":10000,"age":0})


//console.log(blockchain.validator)
tempwallet1.createTransaction(blockchain,tempwallet2.publicKey,1000);

blockchain.generateBlock([],tempwallet1);
blockchain.generateBlock([],tempwallet2);

blockchain.generateBlock([],tempwallet1);
blockchain.generateBlock([],tempwallet2);
blockchain.validator.addStake({"address":tempwallet3.getPublicKey,"hydrogen":10000,"age":0})

blockchain.generateBlock([],tempwallet1);
blockchain.generateBlock([],tempwallet2);
blockchain.generateBlock([],tempwallet3);

console.log(blockchain.getBalance(tempwallet1.getPublicKey));
console.log(blockchain.getBalance(tempwallet2.getPublicKey));
console.log(blockchain.getBalance(tempwallet3.getPublicKey));



//console.log(blockchain.chain)
//var tempwallet2 = new SolarWallet();