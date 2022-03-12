"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolarWallet = void 0;
const ChainUtil_1 = require("../../util/ChainUtil");
const Transaction_1 = require("./Transaction");
class SolarWallet {
    constructor() {
        this.balance = 0;
        this.keypair = (0, ChainUtil_1.GenerateUniqueKeyPair)();
        this.publicKey = this.keypair.getPublic('hex');
    }
    loadWallet() {
    }
    saveWallet() {
    }
    createTransaction(blockchain, recipient, hydrogen) {
        var balance = this.getBalance(blockchain);
        if (balance >= hydrogen + Transaction_1.SolarTransaction.TRANSACTION_FEE) {
            Transaction_1.SolarTransaction.CreateTransaction(this, recipient, hydrogen, { "note": "no note specified", "publicAddresses": true });
        }
    }
    getBalance(blockchain) {
        blockchain.getBalance(this.getPublicKey);
        return 0;
    }
    get getPublicKey() {
        return this.keypair.getPublic('hex');
    }
    sign(transaction) {
        return this.keypair.sign(transaction.calculateTransactionHash()).toDER('hex');
    }
}
exports.SolarWallet = SolarWallet;
