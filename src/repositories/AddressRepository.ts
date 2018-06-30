import {getConnection, getRepository,} from "typeorm";
import {addresses} from "../entities/addresses";
export class AddressRepo{
    getAddressForCoin(walletId:number,coinId:number){
        return getRepository(addresses).createQueryBuilder("address").select("addressHash")
            .innerJoin("address.wallet","wallet").innerJoin("address.coin","coin")
            .where("wallet.id = :walletId AND coin.id = :coinId",{walletId:walletId,coinId:coinId}).getRawOne();
    }
    getBalanceForCoin(walletId:number,coinId:number){
        return getRepository(addresses).createQueryBuilder("address").select("balance")
            .innerJoin("address.wallet","wallet").innerJoin("address.coin","coin")
            .where("wallet.id = :walletId AND coin.id = :coinId",{walletId:walletId,coinId:coinId}).getRawOne();
    }
    getAllBalances(walletId:number){
        return getRepository(addresses).createQueryBuilder("address").select(["coin.ticker","coin.name","wallet.balance"])
            .innerJoin("address.wallet","wallet").innerJoin("address.coin","coin")
            .where("wallet.id = :walletId",{walletId:walletId}).getRawMany();
    }
    updateBalance(walletId:number,coinId:number,newBalance:number){
        return getRepository(addresses).createQueryBuilder("address")
            .innerJoin("address.wallet","wallet").innerJoin("address.coin","coin")
            .where("wallet.id = :walletId AND coin.id = :coinId",{walletId:walletId,coinId:coinId})
            .update().set({balance:newBalance}).execute();
    }
}