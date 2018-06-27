import {getConnection, getRepository} from "typeorm";
import {markets} from "../entities/markets";
export class MarketRepo{
    getAll(){
        return getRepository(markets).find();
    }
    getAllFor(coinId:number){
        return getConnection().createQueryBuilder("market").from(markets).select(["ticker"]).innerJoin("market.coinId","id").where("coin1Id = :coinId OR coin2Id = :coinId",{coinId:coinId});
    }
    create(market:markets){
        return getRepository(markets).save(market);
    }
    delete(id:number){
        return getConnection().createQueryBuilder().delete().from(markets).where("id = :id",{id:id});
    }
}