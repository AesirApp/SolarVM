"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifySignature = exports.GenerateUniqueKeyPair = void 0;
const elliptic_1 = require("elliptic");
var ecpair = new elliptic_1.ec('secp256k1');
function GenerateUniqueKeyPair() {
    return ecpair.genKeyPair();
}
exports.GenerateUniqueKeyPair = GenerateUniqueKeyPair;
function verifySignature(publicKey, signature, transactionHash) {
    return ecpair.keyFromPublic(publicKey, 'hex').verify(transactionHash, signature);
}
exports.verifySignature = verifySignature;
