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
        stakevalidator.stake.push();
        this.stakes.push({ "address": this.keypair.getPublic('hex'), "age": Date.now(), "hydrogen": amount });
    }
    ProposeBlock(client, blockchain) {
        var transaction = new Transaction_1.SolarTransaction("system", this.getPublicKey, 100, { "note": "validator reward", "publicAddresses": true });
        var block = new Block_1.SolarBlock(blockchain.getLatestBlock().hash, Date.now(), client.pool.transactions, this, blockchain.validator.stake);
        if (Blockchain_1.SolarBlockchain.verifyBlock(block)) {
            //Broadcast block function
            return block;
        }
        else {
            console.log("The block is not verified");
        }
    }
    signHash(hash) {
        return this.keypair.sign(hash).toDER('hex');
    }
}
exports.SolarValidatorWallet = SolarValidatorWallet;
