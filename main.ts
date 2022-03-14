import { SolarNode } from "./node/Node";
//var natapi = require('nat-api');
import ip from 'ip';


var node = new SolarNode("local",["ws://192.168.1.14:7521"],7521);
node.wsserver.init();

//const client = new natapi();
//client.map(7521,function(err:any){
//    if(err) return console.log(err);
//
//    console.log("working")
//})

//var node2 = new SolarNode("local",["ws://192.168.1.14:7521"],7522);
//node2.wsserver.init();