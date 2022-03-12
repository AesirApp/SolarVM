"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolarServer = void 0;
const ws_1 = require("ws");
const Broadcast_1 = require("../client/Broadcast");
class SolarServer {
    constructor(node, curport) {
        this.CUR_ADDRESS = "ws://localhost:7521";
        this.CUR_PORT = 7521;
        this.connectedAddresses = [];
        this.openedSockets = [];
        this.node = node;
        this.CUR_PORT = curport;
        this.server = new ws_1.WebSocketServer({ "port": this.CUR_PORT });
        this.PEERS = [];
    }
    init() {
        this.server.on('connection', (socket, req) => __awaiter(this, void 0, void 0, function* () {
            socket.on('message', message => {
                var broadcast = JSON.parse(message.toString());
                switch (broadcast.TYPE) {
                    case Broadcast_1.SOLARBROADCAST_TYPE.HANDSHAKE:
                        var curnodes = broadcast.payload;
                        curnodes.forEach((node) => this.connectHandshake(node));
                        console.log("initalized", this.CUR_ADDRESS);
                    case Broadcast_1.SOLARBROADCAST_TYPE.TRANSACTION:
                        this.node.pool.addTransactionToPool(broadcast.payload);
                    case Broadcast_1.SOLARBROADCAST_TYPE.BLOCKPROPOSE:
                }
            });
        }));
        this.PEERS.forEach(peer => this.connectHandshake(peer));
    }
    connectHandshake(address) {
        return __awaiter(this, void 0, void 0, function* () {
            if (address !== this.CUR_ADDRESS && !this.connectedAddresses.find(peeraddress => peeraddress === address)) {
                const socket = new ws_1.WebSocket(address);
                socket.on('open', () => {
                    var broadcast = { "TYPE": Broadcast_1.SOLARBROADCAST_TYPE.HANDSHAKE, payload: [this.CUR_ADDRESS, ...this.connectedAddresses] };
                    socket.send(JSON.stringify(broadcast));
                    this.openedSockets.forEach(node => node.socket.send(JSON.stringify({ "TYPE": Broadcast_1.SOLARBROADCAST_TYPE.HANDSHAKE, payload: [address] })));
                    if (!this.openedSockets.find(peerAddress => peerAddress.address === address) && address !== this.CUR_ADDRESS) {
                        this.openedSockets.push({ "address": address, socket: socket });
                    }
                    if (!this.connectedAddresses.find(peerAddress => peerAddress === address) && address !== this.CUR_ADDRESS) {
                        this.connectedAddresses.push(address);
                    }
                });
                socket.on("close", () => {
                    this.openedSockets.splice(this.connectedAddresses.indexOf(address), 1);
                    this.connectedAddresses.splice(this.connectedAddresses.indexOf(address), 1);
                });
            }
        });
    }
    createBroadcast(broadcast) {
        this.openedSockets.forEach(node => {
            node.socket.send(JSON.stringify(broadcast));
        });
    }
}
exports.SolarServer = SolarServer;
