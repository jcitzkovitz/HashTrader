"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const addresses_1 = require("../entities/addresses");
class AddressRepo {
    getAddressForCoin(walletId, coinId) {
        return typeorm_1.getRepository(addresses_1.addresses).createQueryBuilder("address").select("addressHash")
            .innerJoin("address.wallet", "wallet").innerJoin("address.coin", "coin")
            .where("wallet.id = :walletId AND coin.id = :coinId", { walletId: walletId, coinId: coinId }).getRawOne();
    }
    getBalanceForCoin(walletId, coinId) {
        return typeorm_1.getRepository(addresses_1.addresses).createQueryBuilder("address").select("balance")
            .innerJoin("address.wallet", "wallet").innerJoin("address.coin", "coin")
            .where("wallet.id = :walletId AND coin.id = :coinId", { walletId: walletId, coinId: coinId }).getRawOne();
    }
    getAllBalances(walletId) {
        return typeorm_1.getRepository(addresses_1.addresses).createQueryBuilder("address").select(["coin.ticker", "coin.name", "wallet.balance"])
            .innerJoin("address.wallet", "wallet").innerJoin("address.coin", "coin")
            .where("wallet.id = :walletId", { walletId: walletId }).getRawMany();
    }
    updateBalance(walletId, coinId, newBalance) {
        return typeorm_1.getRepository(addresses_1.addresses).createQueryBuilder("address")
            .innerJoin("address.wallet", "wallet").innerJoin("address.coin", "coin")
            .where("wallet.id = :walletId AND coin.id = :coinId", { walletId: walletId, coinId: coinId })
            .update().set({ balance: newBalance }).execute();
    }
}
exports.AddressRepo = AddressRepo;
//# sourceMappingURL=AddressRepository.js.map