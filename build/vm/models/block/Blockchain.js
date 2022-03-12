"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolarBlockchain = void 0;
const StakeValidator_1 = require("../../concensus/StakeValidator");
const ValidatorWallet_1 = require("../../concensus/ValidatorWallet");
const ChainUtil_1 = require("../../util/ChainUtil");
const Transaction_1 = require("../wallet/Transaction");
const Block_1 = require("./Block");
class SolarBlockchain {
    constructor() {
        this.chain = [SolarBlockchain.GenesisBlock()];
        this.validator = new StakeValidator_1.SolarStakeValidator([]);
    }
    get chainLength() {
        return this.chain.length;
    }
    //needed for everyone to keep a current copy of all the blocks
    addBlock(block) {
        this.chain.push(block);
    }
    //ONLY THE BLOCK VERIFIER CAN GENERATE BLOCKS
    generateBlock(transactions, validator) {
        //console.log(this.validator.chooseValidator(this.getLatestBlock().hash))
        if (this.validator.chooseValidator(this.getLatestBlock().hash) != validator.getPublicKey) {
            console.log("not the right validator");
            return;
        }
        transactions.push(new Transaction_1.SolarTransaction("system", validator.getPublicKey, 100, { "note": "validator reward", "publicAddresses": true }));
        var block = new Block_1.SolarBlock(this.getLatestBlock().hash, Date.now(), transactions, validator, this.validator.stake);
        if (SolarBlockchain.verifyBlock(block)) {
            //Broadcast block function
            this.chain.push(block);
        }
        else {
            console.log("The block is not verified");
        }
    }
    static verifyTransactions(transactions) {
        for (var i = 0; i < transactions.length; i++) {
        }
    }
    isChainValid() {
    }
    getLatestBlock() {
        return this.chain[this.chainLength - 1];
    }
    //verify that the block was created by the correct validator
    static verifyBlock(block) {
        console.log(block);
        return (0, ChainUtil_1.verifySignature)(block.validator, block.blocksignature, block.hash);
    }
    static GenesisBlock() {
        return new Block_1.SolarBlock("genesis", 0, [], new ValidatorWallet_1.SolarValidatorWallet(), []);
    }
    getBalance(address) {
        var amount = 0;
        for (var i = 0; i < this.chain.length; i++) {
            for (var j = 0; j < this.chain[i].transactions.length; j++) {
                if (this.chain[i].transactions[j].sender == address) {
                    amount -= this.chain[i].transactions[j].amount;
                }
                if (this.chain[i].transactions[j].recipient == address) {
                    amount += this.chain[i].transactions[j].amount;
                }
            }
        }
        return amount;
    }
}
exports.SolarBlockchain = SolarBlockchain;
