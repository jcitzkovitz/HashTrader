"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const addresses_1 = require("../entities/addresses");
const AddressController_1 = require("../../storage1/controllers/AddressController");
const coins_1 = require("../entities/coins");
const wallets_1 = require("../entities/wallets");
class AddressRepo {
    constructor() {
        this.storage1AddressController = new AddressController_1.Storage1AddressController();
    }
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
            .update(addresses_1.addresses).set({ balance: newBalance }).execute();
    }
    createAddressForCoin(walletId, coinId, stake) {
        return __awaiter(this, void 0, void 0, function* () {
            let coin = yield typeorm_1.getRepository(coins_1.coins).findOne({ id: coinId });
            let wallet = yield typeorm_1.getRepository(wallets_1.wallets).findOne({ id: walletId });
            let coinAddress = (yield this.storage1AddressController.generateAddress(coin.ticker)).response;
            let type = 'REGULAR';
            if (stake)
                type = 'STAKE';
            let address = {
                id: 0,
                addressHash: coinAddress,
                salt: '',
                balance: 0,
                wallet: wallet,
                coin: coin,
                type: type
            };
            return yield typeorm_1.getRepository(addresses_1.addresses).save(address);
        });
    }
    withdraw(toAddress, uuid, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.storage1AddressController.sendCoinsTo(toAddress, uuid, amount);
        });
    }
}
exports.AddressRepo = AddressRepo;
//# sourceMappingURL=AddressRepository.js.map