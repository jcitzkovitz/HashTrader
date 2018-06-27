

import {Body, Get, JsonController, Param, Post, Put, UseBefore} from "routing-controllers";
import {verify} from "../middlewares/token-guard";
import {WalletRepo} from "../repositories/WalletRepository";
import {AddressRepo} from "../repositories/AddressRepository";
import {BalanceChangeModel, ResponseModel} from "../models/HelperModels";
import {UserRepo} from "../repositories/UserRepository";

@JsonController("/wallet")
@UseBefore(verify)
export class WalletController {

    walletRepo: WalletRepo = new WalletRepo();
    addressRepo: AddressRepo = new AddressRepo();
    userRepo: UserRepo = new UserRepo();

    @Get("/:id/:coinId")
    async getBalanceForCoin(@Param("id") id:number, @Param("coinId") coinId:number){
        try{
            let walletId = await this.walletRepo.getWalletForUser(id);
            let response = await this.addressRepo.getBalanceForCoin(walletId,coinId);
            return new ResponseModel(true,'The balance has been selected successfully',response);
        }catch(err){
            return new ResponseModel(false,'The balance could not be selected: '+err.message,null);
        }
    }

    @Get("/:id")
    async getWallet(@Param("id") id:number){
        try{
            let walletId = await this.walletRepo.getWalletForUser(id);
            let response = await this.addressRepo.getAllBalances(walletId);
            return new ResponseModel(true,'The wallet has been selected successfully',response)
        }catch(err){
            return new ResponseModel(false, 'The wallet could not be selected: '+err.message,null);
        }
    }

    @Put("/:id/:coinId")
    async updateBalanceForCoin(@Param("id") id:number, @Param("coinId") coinId:number, @Body() body:BalanceChangeModel){
        try{
            let walletId = await this.walletRepo.getWalletForUser(userId);
            let balance = await this.addressRepo.getBalanceForCoin(walletId,coinId);
            if(body.change == "ADD")
                balance+=body.value;
            else if(balance - body.value >= 0)
                balance-=body.value;
            else
                throw new Error("There are insufficient funds in this wallet for this transaction");
            let response = await this.addressRepo.updateBalance(walletId,coinId,balance);
            return new ResponseModel(true,'The balance has been updated',response);
        }catch(err){
            return new ResponseModel(false,'The balance could not be updated: '+err.message,null);
        }
    }

    @Get("/:id/:coinId")
    async createNewAddress(@Param("id") id:number, @Param("coinId") coinId:number){

    }
}