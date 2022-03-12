export enum SOLARBROADCAST_TYPE{
    HANDSHAKE,
    TRANSACTION,
    REQUESTCHAIN,

    ADDSTAKE,
    REMOVESTAKE,

    BLOCKPROPOSE,
    GETPROPOSER,
    REROLLPROPOSER
}

export interface SolarBroadcast{
    TYPE:SOLARBROADCAST_TYPE;
    payload:any;
}