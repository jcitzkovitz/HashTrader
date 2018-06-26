import {getConnection, getRepository,} from "typeorm";
import {addresses} from "../entities/addresses";
export class AddressRepo{
    getAddressForCoin(walletId:number,coinId:number){
        return getRepository(addresses).find({select:["addressHash"],where: {walletId:walletId,coinId:coinId}});
    }
    getBalanceForCoin(walletId:number,coinId:number){
        return getRepository(addresses).find({select:["balance"],where:{walletId:walletId,coinId:coinId}})
    }
    getAllBalances(walletId:number){
        return getRepository(addresses).find({select:["coinId","balance"],where:{walletId:walletId}})
    }
    updateBalance(walletId:number,coinId:number,newBalance:number){
        return getConnection().createQueryBuilder().update(addresses).set({balance:newBalance}).where({walletId:walletId, coinId:coinId})
    }
}