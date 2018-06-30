

import {Body, Delete, Get, JsonController, Param, Post, Put, UseBefore} from "routing-controllers";
import {verify} from "../middlewares/token-guard";
import {coins} from "../entities/coins";
import {users} from "../entities/users";
import {CoinRepo} from "../repositories/CoinRepository";
import {ResponseModel} from "../models/HelperModels";

@JsonController("/coin")
@UseBefore(verify)
export class CoinController{

    coinRepo: CoinRepo = new CoinRepo();

    @Post("/")
    async listNewCoin(@Body() body:coins){
        try{
            //REQUIRES ADMIN AUTHENTICATION
            let response = await this.coinRepo.listNewCoin(body);
            return new ResponseModel(true,'The coin was added successfully',response);
        }catch(err){
            return new ResponseModel(false,'The coin could not be added: '+err.message,null);
        }
    }

    @Put("/:id/update")
    async updateCoin(@Param("id") id:number,@Body() body:any){
        try{
            console.log("UPDATE");
            //REQUIRES ADMIN AUTHENTICATION
            await this.coinRepo.updateCoin(id,body);
            return new ResponseModel(true,'The coin was updated successfully',null);
        }catch(err){
            return new ResponseModel(false,'The coin could not be added: '+err.message,null);
        }
    }

    @Delete("/:id")
    async deleteCoin(@Param("id") id:number, @Body() user:users){
        try{
            //REQUIRES ADMIN AUTHENTICATION
            await this.coinRepo.deleteCoin(id);
            return new ResponseModel(true,'The coin was succesfully deleted',null);
        }catch(err){
            return new ResponseModel(false,'The coin could not be deleted: '+err.message,null);
        }
    }

    @Get("/:id")
    async getOneCoinInfo(@Param("id") id:number){
        try{
            let response = await this.coinRepo.getAllCoinInfo({id:id});
            return new ResponseModel(true,'The coin has been selected successfully',response)
        }catch(err){
            return new ResponseModel(false,'The coin could not be selected: '+err.message,null);
        }
    }

    @Get("/")
    async getAll(){
        try{
            let response = await this.coinRepo.getAllCoinInfo();
            return new ResponseModel(true,'All of the coins have been selected successfully',response);
        }catch(err){
            return new ResponseModel(false,'The coins could not be selected: '+ err.message,null);
        }
    }
}