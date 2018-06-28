"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const markets_1 = require("../entities/markets");
class MarketRepo {
    getAll() {
        return typeorm_1.getRepository(markets_1.markets).find();
    }
    getAllFor(coinId) {
        return typeorm_1.getConnection().createQueryBuilder("market").from(markets_1.markets).select(["ticker"]).innerJoin("market.coin", "id").innerJoin("market.coin2", "id").where("market.coin = :coinId OR market.coin2 = :coinId", { coinId: coinId });
    }
    create(market) {
        return typeorm_1.getRepository(markets_1.markets).save(market);
    }
    delete(id) {
        return typeorm_1.getConnection().createQueryBuilder().delete().from(markets_1.markets).where("id = :id", { id: id });
    }
}
exports.MarketRepo = MarketRepo;
//# sourceMappingURL=MarketRepository.js.map