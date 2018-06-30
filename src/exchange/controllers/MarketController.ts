import {Delete, Get, JsonController, Param, Post, UseBefore} from "routing-controllers";
import {verify} from "../../middlewares/token-guard";
import {MarketRepo} from "../repositories/MarketRepository";
import {ResponseModel} from "../../models/HelperModels";
import {markets} from "../entities/markets";
import {CoinRepo} from "../repositories/CoinRepository";
@JsonController("/market")
@UseBefore(verify)
export class MarketController{

    marketRepo: MarketRepo = new MarketRepo();
    coinRepo: CoinRepo = new CoinRepo();

    @Get("/")
    async getAllMarkets(){
        try{
            let response = await this.marketRepo.getAllMarkets();
            return new ResponseModel(true,'All markets have been selected successfully',response);
        }catch(err){
            return new ResponseModel(false,'The markets could not be selected: '+err.message,null);
        }
    }

    @Get("/forCoin/:coinId")
    async getAllMarketsFor(@Param("coinId") coinId:number){
        try{
            let response = await this.marketRepo.getAllMarketsFor(coinId);
            return new ResponseModel(true,'The markets for this coin has been selected successfully',response);
        }catch(err){
            return new ResponseModel(false,'The markets could not be selected: '+err.message,null);
        }
    }

    @Get("/:id")
    async getMarket(@Param("id") id:number){
        try{
            let response = await this.marketRepo.getMarket(id);
            return new ResponseModel(true,'The market has been selected successfully',response);
        }catch(err){
            return new ResponseModel(false,'The market could not be selected: '+err.message,null);
        }
    }

    @Post("/:id1/:id2")
    async createMarket(@Param("id1") id1:number,@Param("id2") id2:number){
        try{
            //REQUIRES ADMIN AUTHENTICATION
            //Check that coin1 is a main market coi
            let coin1 = await this.coinRepo.getOne(id1);
            let coin2 = await this.coinRepo.getOne(id2);
            // if(coin1.marketType != "MAIN") throw new Error("Coin 1 must be a main market coin");
            let ticker = coin1.ticker+"_"+coin2.ticker;
            let response = await this.marketRepo.createMarket({id:null,ticker:ticker,coin:coin1,coin2:coin2,orderss:null});
            return new ResponseModel(true,'The market has been created successfully',response);
        }catch(err){
            return new ResponseModel(false,'The market could not be created: '+err.message,null);
        }
    }

    @Delete("/:id")
    async deleteMarket(@Param("id") id:number){
        try{
            //REQUIRES ADMIN AUTHENTICATION
            await this.marketRepo.deleteMarket(id);
            return new ResponseModel(true,'The market has been deleted successfully',null);
        }catch(err){
            return new ResponseModel(false,'The market could not be created',null);
        }
    }
}