"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Coin {
    constructor(ticker) {
        if (ticker === 'BTC')
            this.coin = new btc();
        else if (ticker === 'LTC')
            this.coin = new ltc();
        else if (ticker === 'DODGE')
            this.coin = new dodge();
    }
}
exports.Coin = Coin;
class btc {
    getBalance(address) {
    }
    generateAddress() {
    }
    sendTo(toAddress, fromAddress, amount) {
    }
    receiveFrom(fromAddress, toAddress, amount) {
    }
}
class ltc {
    getBalance(address) {
    }
    generateAddress() {
    }
    sendTo(toAddress, fromAddress, amount) {
    }
    receiveFrom(fromAddress, toAddress, amount) {
    }
}
class dodge {
    getBalance(address) {
    }
    generateAddress() {
    }
    sendTo(toAddress, fromAddress, amount) {
    }
    receiveFrom(fromAddress, toAddress, amount) {
    }
}
//# sourceMappingURL=CoinMethods.js.map