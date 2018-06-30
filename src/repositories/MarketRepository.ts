import {getConnection, getRepository} from "typeorm";
import {markets} from "../entities/markets";
export class MarketRepo{
    getAllMarkets(selectWhere?:any){
        return getRepository(markets).find(selectWhere);
    }
    getMarket(id:number){
        return getRepository(markets).findOne({id:id});
    }
    getAllMarketsFor(coinId:number){
        return getRepository(markets).createQueryBuilder("market").select("market.ticker")
            .innerJoin("market.coin","coin1").innerJoin("market.coin2","coin2").where("market.coin = :coinId OR market.coin2 = :coinId",{coinId:coinId}).getMany();
    }
    createMarket(market:markets){
        return getRepository(markets).save(market);
    }
    deleteMarket(id:number){
        getRepository(markets).createQueryBuilder().delete().where("id = :id",{id:id}).execute();
    }
}