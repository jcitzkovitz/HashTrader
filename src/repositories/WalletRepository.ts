import {wallets} from "../entities/wallets";
import {getRepository} from "typeorm";

export class WalletRepo{

    getWalletForUser(id: number){
      return  getRepository(wallets).findOne({userId: id});
    }

    getAll(){
        return getRepository(wallets).find({select:["id"]});
    }
}