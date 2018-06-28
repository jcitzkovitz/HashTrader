"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wallets_1 = require("../entities/wallets");
const typeorm_1 = require("typeorm");
class WalletRepo {
    getWalletForUser(user) {
        return typeorm_1.getRepository(wallets_1.wallets).findOne({ user: id });
    }
    getAll() {
        return typeorm_1.getRepository(wallets_1.wallets).find({ select: ["id"] });
    }
}
exports.WalletRepo = WalletRepo;
//# sourceMappingURL=WalletRepository.js.map