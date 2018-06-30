

import {coins} from "../entities/coins";
import {getConnection, getRepository} from "typeorm";
export class CoinRepo{
    listNewCoin(coin:coins){
        return getRepository(coins).save(coin);
    }

    deleteCoin(id:number){
        getRepository(coins).createQueryBuilder().delete().where("id = :id",{id:id}).execute();
    }
    getOne(id:number){
        return getRepository(coins).findOne({where:{id:id}});
    }
    getAllCoinInfo(where?:any){
        return getRepository(coins).find({select:["ticker","name","stakeable","coinWebsite","coinBlockExplore"],where:where});
    }
    updateCoin(id:number,setValues:any){
        getRepository(coins).createQueryBuilder().update().set(setValues).where("id = :id",{id:id}).execute();
    }
}