

import {Get, JsonController, Param, Post, Put, UseBefore} from "routing-controllers";
import {verify} from "../middlewares/token-guard";

@JsonController("/wallet")
@UseBefore(verify)
export class WalletController {
    @Get("/:id/:coinId")
    async getBalance(@Param("id") id:number, @Param("coinId") coinId:number){

    }

    @Put("/:id/:coinId")
    async updateBalance(@Param("id") id:number, @Param("coinId") coinId:number){

    }

    @Get("/:id/:coinId")
    async createNewAddress(@Param("id") id:number, @Param("coinId") coinId:number){

    }
}