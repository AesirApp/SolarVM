import { WebSocket, WebSocketServer } from "ws";
import { SolarBlock } from "../../vm/models/block/Block";
import { SolarBlockchain } from "../../vm/models/block/Blockchain";
import { SolarBroadcast, SOLARBROADCAST_TYPE } from "../client/Broadcast";
import { SolarNode } from "../Node";
import ip from 'ip';

export interface openedSockets{
    socket:WebSocket;
    address:string;
}

//the websocket server for Solar, mainly used in local test networks, although can be used for the global network
export class SolarWsServer{
    public node:SolarNode;
    public server:WebSocketServer;
    public PEERS:any[];

    public CUR_ADDRESS:string = "";
    public CUR_PORT:number = 75215;
    public connectedAddresses:string[] = [];
    public openedSockets:openedSockets[] = [];

    constructor(node:SolarNode,curport:number,nodeType:string,bootPeers:any[]){
        this.node = node;
        this.CUR_PORT = curport;
        if(nodeType == "local"){
            this.CUR_ADDRESS =  "ws://"+ ip.address() +":" + curport.toString();
        }else{
            this.CUR_ADDRESS = "PUBLIC IP ADDRESS" + ":" + curport.toString();
        }
       
        this.server = new WebSocketServer({"port":this.CUR_PORT});
        this.PEERS = bootPeers;
    }

    public init(){
        this.server.on('connection',async (socket,req) =>{
            socket.on('message', message =>{
                var broadcast :SolarBroadcast = JSON.parse(message.toString());

                console.log("cur address:",this.CUR_ADDRESS,"other address: ",broadcast)

                if(broadcast.TYPE == SOLARBROADCAST_TYPE.HANDSHAKE){
                    var curnodes = broadcast.payload;

                    curnodes.forEach((node:string) => this.connectHandshake(node));
                }else if(broadcast.TYPE == SOLARBROADCAST_TYPE.TRANSACTION){
                    console.log("transaction")
                    this.node.pool.addTransactionToPool(broadcast.payload);
                }else if(broadcast.TYPE == SOLARBROADCAST_TYPE.BLOCKPROPOSE){
                    //Get the broadcast when the validator mints a new block
                    if(broadcast.payload){
                        var validblock = new SolarBlock(broadcast.payload.prevHash,broadcast.payload.timestamp,broadcast.payload.transactions,broadcast.payload.validator,broadcast.payload.stake,broadcast.payload.blocksignature);
                        if(SolarBlockchain.verifyBlock(new SolarBlock(broadcast.payload.prevHash,broadcast.payload.timestamp,broadcast.payload.transactions,broadcast.payload.validator,broadcast.payload.stake,broadcast.payload.blocksignature))){
                            this.node.blockchain.addBlock(validblock);
                        }
                        
                    }
                   

                }else if(broadcast.TYPE == SOLARBROADCAST_TYPE.GETPROPOSER){


                }else if(broadcast.TYPE == SOLARBROADCAST_TYPE.ADDSTAKE){


                }else if(broadcast.TYPE == SOLARBROADCAST_TYPE.REMOVESTAKE){
                    
                }else if(broadcast.TYPE == SOLARBROADCAST_TYPE.REQUESTCHAIN){

                }else if(broadcast.TYPE == SOLARBROADCAST_TYPE.REROLLPROPOSER){
                
                }

                //switch(broadcast.TYPE){
                //    case SOLARBROADCAST_TYPE.HANDSHAKE:
//
                //        //console.log("initalized",this.CUR_ADDRESS);
                //    case SOLARBROADCAST_TYPE.TRANSACTION:
                //        console.log("transaction")
                //        this.node.pool.addTransactionToPool(broadcast.payload);
//
                //    case SOLARBROADCAST_TYPE.BLOCKPROPOSE:
//
//
                //}
            });
        });

        this.PEERS.forEach(peer => this.connectHandshake(peer));

    }

    public async connectHandshake(address:string){
        if(address !== this.CUR_ADDRESS && !this.connectedAddresses.find(peeraddress => peeraddress === address)){
            const socket = new WebSocket(address);

            socket.on('open', () =>{
                var broadcast:SolarBroadcast = {"TYPE":SOLARBROADCAST_TYPE.HANDSHAKE,payload: [this.CUR_ADDRESS, ...this.connectedAddresses]};
                socket.send(JSON.stringify(broadcast));

                this.openedSockets.forEach(node => node.socket.send(JSON.stringify({"TYPE":SOLARBROADCAST_TYPE.HANDSHAKE,payload:[address]})));

                if(!this.openedSockets.find(peerAddress => peerAddress.address === address) && address !== this.CUR_ADDRESS){
                    this.openedSockets.push({"address":address,socket:socket});
                }

                if(!this.connectedAddresses.find(peerAddress => peerAddress === address) && address !== this.CUR_ADDRESS){
                    this.connectedAddresses.push(address);
                }

            })

            socket.on("close", () => {
                this.openedSockets.splice(this.connectedAddresses.indexOf(address), 1);
                this.connectedAddresses.splice(this.connectedAddresses.indexOf(address), 1);
            });
        }
    }

    public createBroadcast(broadcast:SolarBroadcast){
        this.openedSockets.forEach(node =>{
            node.socket.send(JSON.stringify(broadcast));
        })
    }
}