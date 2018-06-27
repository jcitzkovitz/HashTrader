import {Delete, Get, JsonController, Param, Post, UseBefore} from "routing-controllers";
import {verify} from "../middlewares/token-guard";
import {MarketRepo} from "../repositories/MarketRepository";
import {ResponseModel} from "../models/HelperModels";
import {markets} from "../entities/markets";
import {CoinRepo} from "../repositories/CoinRepository";
@JsonController("/market")
@UseBefore(verify)
export class MarketController{

    marketRepo: MarketRepo = new MarketRepo();
    coinRepo: CoinRepo = new CoinRepo();

    @Get("/")
    async getAll(){
        try{
            let response = await this.marketRepo.getAll();
            return new ResponseModel(true,'All markets have been selected successfully',response);
        }catch(err){
            return new ResponseModel(false,'The markets could not be selected: '+err.message,null);
        }
    }

    @Get("/:coinId")
    async getAllFor(@Param("coinId") coinId:number){
        try{
            let response = await this.marketRepo.getAllFor(coinId);
            return new ResponseModel(true,'The markets for this coin has been selected successfully',response);
        }catch(err){
            return new ResponseModel(false,'The markets could not be selected: '+err.message,null);
        }
    }

    @Post("/:id1/:id2")
    async createMarket(@Param("id1") id1:number,@Param("id2") id2:number){
        try{
            //REQUIRES ADMIN AUTHENTICATION
            //Check that coin1 is a main market coi
            let coin1 = await this.coinRepo.getOne(id1);
            if(coin1.marketType != "MAIN") throw new Error("Coin 1 must be a main market coin");
            let response = await this.marketRepo.create({coin1Id:id1,coin2Id:id2});
            return new ResponseModel(true,'The market has been created successfully',response);
        }catch(err){
            return new ResponseModel(false,'The market could not be created: '+err.message,null);
        }
    }

    @Delete("/:id")
    async deleteMarket(@Param("id") id:number){
        try{
            //REQUIRES ADMIN AUTHENTICATION
            let response = await this.marketRepo.delete(id);
            return new ResponseModel(true,'The market has been deleted successfully',response);
        }catch(err){
            return new ResponseModel(false,'The market could not be created',null);
        }
    }
}