"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolarNode = void 0;
const Blockchain_1 = require("../vm/models/block/Blockchain");
const TransactionPool_1 = require("../vm/models/wallet/TransactionPool");
const Broadcast_1 = require("./client/Broadcast");
const Server_1 = require("./server/Server");
const node_cron_1 = __importDefault(require("node-cron"));
class SolarNode {
    constructor(curport) {
        this.curvalidator = "";
        this.blockchain = new Blockchain_1.SolarBlockchain();
        this.server = new Server_1.SolarServer(this, curport);
        //this.server.init();
        this.pool = new TransactionPool_1.SolarTransactionPool([]);
        this.localWallets = [];
        this.localValidatorWallets = [];
    }
    initNodeConnections() {
    }
    addValidatorWallet() {
    }
    requestChainBroadcast() {
        this.server.createBroadcast({ "TYPE": Broadcast_1.SOLARBROADCAST_TYPE.REQUESTCHAIN, "payload": this.blockchain });
    }
    addTransactionToPools(transaction) {
        this.pool.addTransactionToPool(transaction);
        this.server.createBroadcast({ "TYPE": Broadcast_1.SOLARBROADCAST_TYPE.TRANSACTION, "payload": transaction });
    }
    addProposedBlock(block) {
        this.server.createBroadcast({ "TYPE": Broadcast_1.SOLARBROADCAST_TYPE.BLOCKPROPOSE, "payload": block });
        this.blockchain.addBlock(block);
    }
    scheduleValidation() {
        node_cron_1.default.schedule('30 * * * *', (now) => {
            var validAddress = this.blockchain.validator.chooseValidator(this.blockchain.getLatestBlock().prevHash);
            for (var i = 0; i < this.localValidatorWallets.length; i++) {
                if (this.localValidatorWallets[i].getPublicKey == validAddress) {
                    this.addProposedBlock(this.localValidatorWallets[i].ProposeBlock(this, this.blockchain));
                }
            }
        });
    }
}
exports.SolarNode = SolarNode;
