import { WebSocket, WebSocketServer } from "ws";
import { SolarTransaction } from "../../vm/models/wallet/Transaction";
import { SolarBroadcast, SOLARBROADCAST_TYPE } from "../client/Broadcast";
import { SolarNode } from "../Node";

export interface openedSockets{
    socket:WebSocket;
    address:string;
}

export class SolarServer{
    public node:SolarNode;
    public server:WebSocketServer;
    public PEERS:any[];

    public CUR_ADDRESS = "ws://localhost:7521";
    public CUR_PORT = 7521;
    public connectedAddresses:string[] = [];
    public openedSockets:openedSockets[] = [];

    constructor(node:SolarNode,curport:number){
        this.node = node;
        this.CUR_PORT = curport;
        this.server = new WebSocketServer({"port":this.CUR_PORT});
        this.PEERS = [];
    }

    public init(){
        this.server.on('connection',async (socket,req) =>{
            socket.on('message', message =>{
                var broadcast :SolarBroadcast = JSON.parse(message.toString());

                switch(broadcast.TYPE){
                    case SOLARBROADCAST_TYPE.HANDSHAKE:
                        var curnodes = broadcast.payload;

                        curnodes.forEach((node:string) => this.connectHandshake(node));
                        console.log("initalized",this.CUR_ADDRESS);
                    case SOLARBROADCAST_TYPE.TRANSACTION:
                        this.node.pool.addTransactionToPool(broadcast.payload);

                    case SOLARBROADCAST_TYPE.BLOCKPROPOSE:


                }
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