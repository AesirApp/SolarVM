import { SolarBlockchain } from "../vm/models/block/Blockchain";
import { SolarTransactionPool } from "../vm/models/wallet/TransactionPool";
import { SolarServer } from "./server/Server";

export class SolarNode{
    public server: SolarServer;
    public blockchain:SolarBlockchain;
    public pool:SolarTransactionPool;

    constructor(){
        this.blockchain = new SolarBlockchain();
        this.server = new SolarServer();
        this.pool = new SolarTransactionPool([]);
    }
}