import { ec } from "elliptic";

var ecpair = new ec('secp256k1')
export function GenerateUniqueKeyPair(){
    return ecpair.genKeyPair();
}

export function verifySignature(publicKey:string,signature:string,transactionHash:string){
    return ecpair.keyFromPublic(publicKey,'hex').verify(transactionHash,signature);
}