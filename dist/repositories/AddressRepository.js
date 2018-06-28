"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const addresses_1 = require("../entities/addresses");
class AddressRepo {
    getInfoForCoin(walletId, coinId) {
        return typeorm_1.getRepository(addresses_1.addresses).find({ where: { walletId: walletId, coinId: coinId } });
    }
    getBalanceForCoin(walletId, coinId) {
        return typeorm_1.getRepository(addresses_1.addresses).find({ select: ["balance", "addressHash"], where: { walletId: walletId, coinId: coinId } });
    }
    getAllBalances(walletId) {
        return typeorm_1.getRepository(addresses_1.addresses).find({ select: ["coin", "balance"], where: { walletId: walletId } });
    }
    updateBalance(walletId, coinId, newBalance) {
        return typeorm_1.getConnection().createQueryBuilder().update(addresses_1.addresses).set({ balance: newBalance }).where({ walletId: walletId, coinId: coinId });
    }
}
exports.AddressRepo = AddressRepo;
//# sourceMappingURL=AddressRepository.js.map