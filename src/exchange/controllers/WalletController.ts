

import {Body, Get, JsonController, Param, Post, Put, UseBefore} from "routing-controllers";
import {verify} from "../../middlewares/token-guard";
import {WalletRepo} from "../repositories/WalletRepository";
import {AddressRepo} from "../repositories/AddressRepository";
import {BalanceChangeModel, ResponseModel} from "../../models/HelperModels";

@JsonController("/wallet")
@UseBefore(verify)
export class WalletController {

    walletRepo: WalletRepo = new WalletRepo();
    addressRepo: AddressRepo = new AddressRepo();

    @Get("/:userId/:coinId")
    async getBalanceForCoin(@Param("userId") userId:number, @Param("coinId") coinId:number){
        try{
            let walletId = (await this.walletRepo.getWalletForUser(userId)).id;
            let response = await this.addressRepo.getBalanceForCoin(walletId,coinId);
            return new ResponseModel(true,'The balance has been selected successfully',response);
        }catch(err){
            return new ResponseModel(false,'The balance could not be selected: '+err.message,null);
        }
    }

    @Get("/:userId")
    async getWallet(@Param("userId") userId:number){
        try{
            let walletId = (await this.walletRepo.getWalletForUser(userId)).id;
            let response = await this.addressRepo.getAllBalances(walletId);
            return new ResponseModel(true,'The wallet has been selected successfully',response)
        }catch(err){
            return new ResponseModel(false, 'The wallet could not be selected: '+err.message,null);
        }
    }


    async updateBalanceForCoin(balanceChange:BalanceChangeModel){
        let walletId = (await this.walletRepo.getWalletForUser(balanceChange.userId)).id;
        let balance = await this.addressRepo.getBalanceForCoin(walletId,balanceChange.coinId);
        if(balanceChange.change == "ADD")
            balance+=balanceChange.amount;
        else if(balance - balanceChange.amount >= 0)
            balance-=balanceChange.amount;
        else
            throw new Error("There are insufficient funds in this wallet for this transaction");
        let response = this.addressRepo.updateBalance(walletId,balanceChange.coinId,balance);
        return {walletId:walletId,response:response};
    }

    @Get("/:userId/:coinId")
    async createNewAddress(@Param("userId") userId:number, @Param("coinId") coinId:number,@Body() body:any){
        let walletId = (await this.walletRepo.getWalletForUser(userId)).id;
        return await this.addressRepo.createAddressForCoin(walletId,coinId,body.stake);
    }
}