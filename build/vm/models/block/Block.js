"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolarBlock = void 0;
const crypto_js_1 = require("crypto-js");
class SolarBlock {
    constructor(prevHash, timestamp, transactions, validatorWallet, stake) {
        this.prevHash = prevHash;
        this.timestamp = timestamp;
        this.stake = stake;
        this.validator = validatorWallet.getPublicKey;
        this.hash = this.CreateHash();
        this.blocksignature = this.signBlockHash(this.hash, validatorWallet);
        this.transactions = transactions;
    }
    CreateHash() {
        return (0, crypto_js_1.SHA256)(JSON.stringify(`${this.timestamp}${this.prevHash}${this.transactions}${this.stake}`)).toString();
    }
    signBlockHash(hash, validatorWallet) {
        return validatorWallet.signHash(hash);
    }
}
exports.SolarBlock = SolarBlock;
