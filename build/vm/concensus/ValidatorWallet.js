"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolarValidatorWallet = void 0;
const Block_1 = require("../models/block/Block");
const Blockchain_1 = require("../models/block/Blockchain");
const Transaction_1 = require("../models/wallet/Transaction");
const Wallet_1 = require("../models/wallet/Wallet");
class SolarValidatorWallet extends Wallet_1.SolarWallet {
    constructor() {
        super();
        this.stakes = [];
    }
    addStake(stakevalidator, amount) {
        stakevalidator.addStake({ "address": this.keypair.getPublic('hex'), "age": Date.now(), "hydrogen": amount });
        this.stakes.push({ "address": this.keypair.getPublic('hex'), "age": Date.now(), "hydrogen": amount });
    }
    getBalance(blockchain) {
        var blockbalance = super.getBalance(blockchain);
        var amountstaked = 0;
        for (var i = 0; i < blockchain.chainLength; i++) {
            for (var j = 0; j < blockchain.chain[i].stake.length; j++) {
                if (blockchain.chain[i].stake[j].address == this.getPublicKey) {
                    amountstaked += blockchain.chain[i].stake[j].hydrogen;
                }
            }
        }
        return blockbalance - amountstaked;
    }
    ProposeBlock(client, blockchain) {
        var transaction = new Transaction_1.SolarTransaction("system", this.getPublicKey, 100, { "note": "validator reward", "publicAddresses": true });
        var verified = Blockchain_1.SolarBlockchain.verifyTransactions(client.pool.transactions);
        verified.push(transaction);
        var block = new Block_1.SolarBlock(blockchain.getLatestBlock().hash, Date.now(), verified, this, blockchain.validator.stake);
        if (Blockchain_1.SolarBlockchain.verifyBlock(block)) {
            return block;
        }
        else {
            console.log("The block is not verified");
            return undefined;
        }
    }
    signHash(hash) {
        return this.keypair.sign(hash).toDER('hex');
    }
}
exports.SolarValidatorWallet = SolarValidatorWallet;
