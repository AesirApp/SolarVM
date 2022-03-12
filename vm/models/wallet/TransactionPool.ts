import { SolarTransaction } from "./Transaction";

export class SolarTransactionPool{
    public transactions:SolarTransaction[];

    constructor(transactions:SolarTransaction[]){
        this.transactions = transactions;
    }

    public addTransactionToPool(transaction:SolarTransaction){
        this.transactions.push(transaction);
    }

    public validTransactions(){
        return this.transactions.filter(transaction =>{
            if(transaction.verifyTransaction()){
                return transaction;
            }else{
                return;
            }
        });
    }

    public clear(){
        this.transactions = [];
    }
}