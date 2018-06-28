"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coins_1 = require("../entities/coins");
const typeorm_1 = require("typeorm");
class CoinRepo {
    listNewCoin(coin) {
        return typeorm_1.getRepository(coins_1.coins).save(coin);
    }
    deleteCoin(id) {
        return typeorm_1.getConnection().createQueryBuilder().delete().from(coins_1.coins).where("id = :id", { id: id });
    }
    getOne(id) {
        return typeorm_1.getRepository(coins_1.coins).findOne({ where: { id: id } });
    }
    getAllCoinInfo(where) {
        return typeorm_1.getRepository(coins_1.coins).find({ select: ["ticker", "name", "stakeable", "coinWebsite", "coinBlockExplore"], where: where });
    }
    updateCoin(coin) {
        return typeorm_1.getConnection().createQueryBuilder().update(coins_1.coins).set(coin).where("id = :id", { id: coin.id });
    }
}
exports.CoinRepo = CoinRepo;
//# sourceMappingURL=CoinRepository.js.map