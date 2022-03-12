"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeRandomNumberGenerator = void 0;
const random_seed_1 = __importDefault(require("random-seed"));
class DeRandomNumberGenerator {
    static generateNumber(prevBlockHash) {
        var rand = random_seed_1.default.create(prevBlockHash);
        var n = rand(100);
        return n / 100;
    }
}
exports.DeRandomNumberGenerator = DeRandomNumberGenerator;
