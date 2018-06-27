

import {coins} from "../entities/coins";
import {getConnection, getRepository} from "typeorm";
export class CoinRepo{
    listNewCoin(coin:coins){
        return getRepository(coins).save(coin);
    }

    deleteCoin(id:number){
        return getConnection().createQueryBuilder().delete().from(coins).where("id = :id",{id:id});
    }
    getOne(id:number){
        return getRepository(coins).findOne({select:["ticker","name","stakeable","coinWebsite","coinBlockExplore"],where:{id:id}});
    }
    getAll(where?:any){
        return getRepository(coins).find({select:["ticker","name","stakeable","coinWebsite","coinBlockExplore"],where:where});
    }
    updateCoin(coin:coins){
        return getConnection().createQueryBuilder().update(coins).set(coin).where("id = :id",{id:coin.id});
    }
}