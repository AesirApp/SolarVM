"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidatorWallet_1 = require("./vm/concensus/ValidatorWallet");
const Blockchain_1 = require("./vm/models/block/Blockchain");
var blockchain = new Blockchain_1.SolarBlockchain();
var tempwallet1 = new ValidatorWallet_1.SolarValidatorWallet();
var tempwallet2 = new ValidatorWallet_1.SolarValidatorWallet();
var tempwallet3 = new ValidatorWallet_1.SolarValidatorWallet();
tempwallet1.addStake(blockchain.validator, 10000);
blockchain.validator.addStake({ "address": tempwallet1.getPublicKey, "hydrogen": 10000, "age": 0 });
blockchain.validator.addStake({ "address": tempwallet2.getPublicKey, "hydrogen": 10000, "age": 0 });
//console.log(blockchain.validator)
tempwallet1.createTransaction(blockchain, tempwallet2.publicKey, 1000);
blockchain.generateBlock([], tempwallet1);
blockchain.generateBlock([], tempwallet2);
blockchain.generateBlock([], tempwallet1);
blockchain.generateBlock([], tempwallet2);
blockchain.validator.addStake({ "address": tempwallet3.getPublicKey, "hydrogen": 10000, "age": 0 });
blockchain.generateBlock([], tempwallet1);
blockchain.generateBlock([], tempwallet2);
blockchain.generateBlock([], tempwallet3);
console.log(blockchain.getBalance(tempwallet1.getPublicKey));
console.log(blockchain.getBalance(tempwallet2.getPublicKey));
console.log(blockchain.getBalance(tempwallet3.getPublicKey));
//console.log(blockchain.chain)
//var tempwallet2 = new SolarWallet();
