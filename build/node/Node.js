"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolarNode = void 0;
const Blockchain_1 = require("../vm/models/block/Blockchain");
const TransactionPool_1 = require("../vm/models/wallet/TransactionPool");
const Server_1 = require("./server/Server");
class SolarNode {
    constructor() {
        this.blockchain = new Blockchain_1.SolarBlockchain();
        this.server = new Server_1.SolarServer();
        this.pool = new TransactionPool_1.SolarTransactionPool([]);
    }
}
exports.SolarNode = SolarNode;
