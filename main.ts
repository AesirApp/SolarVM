import { SolarNode } from "./node/Node";

var node = new SolarNode(7521);
node.server.init();
var node2 = new SolarNode(7532);

node2.server.PEERS.push("ws://localhost:7521");

node2.server.init();



//console.log(blockchain.chain)
//var tempwallet2 = new SolarWallet();