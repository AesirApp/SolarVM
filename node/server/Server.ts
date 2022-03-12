import { WebSocketServer } from "ws";

export class SolarServer{
    public server:WebSocketServer;
    constructor(){
        this.server = new WebSocketServer();
    }

    public init(){
        this.server.on('connection',async (socket,req) =>{
            socket.on('message', message =>{
                
            });
        });
    }
}