"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("./node/Node");
var node = new Node_1.SolarNode(7521);
node.server.init();
var node2 = new Node_1.SolarNode(7532);
node2.server.CUR_ADDRESS = 'ws://localhost:7532';
node2.server.PEERS.push("ws://localhost:7521");
node2.server.init();
//console.log(blockchain.chain)
//var tempwallet2 = new SolarWallet();
