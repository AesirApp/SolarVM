"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolarTransactionPool = void 0;
class SolarTransactionPool {
    constructor(transactions) {
        this.transactions = transactions;
    }
    addTransactionToPool(transaction) {
        this.transactions.push(transaction);
    }
    validTransactions() {
        return this.transactions.filter(transaction => {
            if (transaction.verifyTransaction()) {
                return transaction;
            }
            else {
                return;
            }
        });
    }
    clear() {
        this.transactions = [];
    }
}
exports.SolarTransactionPool = SolarTransactionPool;
