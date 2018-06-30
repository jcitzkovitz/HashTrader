"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wallets_1 = require("../entities/wallets");
const typeorm_1 = require("typeorm");
class WalletRepo {
    getWalletForUser(userId) {
        return typeorm_1.getRepository(wallets_1.wallets).createQueryBuilder("wallet").innerJoin("wallet.user", "user").where("user.id = :userId", { userId: userId }).getOne();
    }
    getAll() {
        return typeorm_1.getRepository(wallets_1.wallets).find({ select: ["id"] });
    }
    createWallet(wallet) {
        return typeorm_1.getRepository(wallets_1.wallets).save(wallet);
    }
}
exports.WalletRepo = WalletRepo;
//# sourceMappingURL=WalletRepository.js.map