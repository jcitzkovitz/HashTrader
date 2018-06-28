import {getConnection, getRepository} from "typeorm";
import {markets} from "../entities/markets";
export class MarketRepo{
    getAll(){
        return getRepository(markets).find();
    }
    getAllFor(coinId:number){
        return getConnection().createQueryBuilder("market").from(markets).select(["ticker"]).innerJoin("market.coin","id").innerJoin("market.coin2","id").where("market.coin = :coinId OR market.coin2 = :coinId",{coinId:coinId});
    }
    create(market:markets){
        return getRepository(markets).save(market);
    }
    delete(id:number){
        return getConnection().createQueryBuilder().delete().from(markets).where("id = :id",{id:id});
    }
}