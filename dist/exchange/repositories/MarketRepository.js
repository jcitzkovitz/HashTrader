"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const markets_1 = require("../entities/markets");
class MarketRepo {
    getAllMarkets(selectWhere) {
        return typeorm_1.getRepository(markets_1.markets).find(selectWhere);
    }
    getMarket(id) {
        return typeorm_1.getRepository(markets_1.markets).findOne({ id: id });
    }
    getAllMarketsFor(coinId) {
        return typeorm_1.getRepository(markets_1.markets).createQueryBuilder("market").select("market.ticker")
            .innerJoin("market.coin", "coin1").innerJoin("market.coin2", "coin2").where("market.coin = :coinId OR market.coin2 = :coinId", { coinId: coinId }).getMany();
    }
    createMarket(market) {
        return typeorm_1.getRepository(markets_1.markets).save(market);
    }
    deleteMarket(id) {
        typeorm_1.getRepository(markets_1.markets).createQueryBuilder().delete().where("id = :id", { id: id }).execute();
    }
}
exports.MarketRepo = MarketRepo;
//# sourceMappingURL=MarketRepository.js.map