import { SolarNode } from "./node/Node";

var node = new SolarNode(7521);
node.server.init();
var node2 = new SolarNode(7532);

node2.server.PEERS.push("ws://localhost:7521");

node2.server.init();

setTimeout(() =>{
    var node3 = new SolarNode(8532);

    node3.server.PEERS.push("ws://localhost:7521")
    node3.server.init()
},10000)




//console.log(blockchain.chain)
//var tempwallet2 = new SolarWallet();