"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coins_1 = require("../entities/coins");
const typeorm_1 = require("typeorm");
class CoinRepo {
    listNewCoin(coin) {
        return typeorm_1.getRepository(coins_1.coins).save(coin);
    }
    deleteCoin(id) {
        typeorm_1.getRepository(coins_1.coins).createQueryBuilder().delete().where("id = :id", { id: id }).execute();
    }
    getOne(id) {
        return typeorm_1.getRepository(coins_1.coins).findOne({ where: { id: id } });
    }
    getAllCoinInfo(where) {
        return typeorm_1.getRepository(coins_1.coins).find({ select: ["ticker", "name", "stakeable", "coinWebsite", "coinBlockExplore"], where: where });
    }
    updateCoin(id, setValues) {
        typeorm_1.getRepository(coins_1.coins).createQueryBuilder().update().set(setValues).where("id = :id", { id: id }).execute();
    }
}
exports.CoinRepo = CoinRepo;
//# sourceMappingURL=CoinRepository.js.map