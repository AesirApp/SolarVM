"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolarTransaction = void 0;
const crypto_js_1 = require("crypto-js");
const ChainUtil_1 = require("../../util/ChainUtil");
class SolarTransaction {
    constructor(sender, recipient, hydrogen, message) {
        this.sender = sender;
        this.recipient = recipient;
        this.amount = hydrogen;
        this.message = message;
        this.signature = "";
    }
    static CreateTransaction(senderWallet, recipientaddress, hydrogen, message) {
        var transaction = new SolarTransaction(senderWallet.getPublicKey, recipientaddress, hydrogen, message);
        transaction.signTransaction(senderWallet);
        return transaction;
    }
    calculateTransactionHash() {
        return (0, crypto_js_1.SHA256)(this.sender + this.recipient + this.amount.toString() + JSON.stringify(this.message)).toString();
    }
    signTransaction(senderwallet) {
        return senderwallet.sign(this);
    }
    verifyTransaction() {
        return (0, ChainUtil_1.verifySignature)(this.sender, this.signature, this.calculateTransactionHash());
    }
}
exports.SolarTransaction = SolarTransaction;
SolarTransaction.TRANSACTION_FEE = 100;
