import {createConnection, getConnection, getRepository,} from "typeorm";
import {addresses} from "../entities/addresses";
import {createExpressServer} from "routing-controllers";
import {Storage1AddressController} from "../../storage1/controllers/AddressController";
import {coins} from "../entities/coins";
import {wallets} from "../entities/wallets";
export class AddressRepo{

    private storage1AddressController: Storage1AddressController = new Storage1AddressController();

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
            .update(addresses).set({balance:newBalance}).execute();
    }
    async createAddressForCoin(walletId:number,coinId:number,stake:boolean){
        let coin:coins = await getRepository(coins).findOne({id:coinId});
        let wallet:wallets = await getRepository(wallets).findOne({id:walletId});
        let coinAddress = (await this.storage1AddressController.generateAddress(coin.ticker)).response;
        let type = 'REGULAR';
        if(stake) type = 'STAKE';
        let address:addresses = {
            id:0,
            addressHash: coinAddress,
            salt: '',
            balance:0,
            wallet: wallet,
            coin: coin,
            type: type
        };
        return await getRepository(addresses).save(address);
    }
    async withdraw(toAddress:string,uuid:number,amount:number){
        return await this.storage1AddressController.sendCoinsTo(toAddress,uuid,amount);
    }
}