import {wallets} from "../entities/wallets";
import {getRepository} from "typeorm";
import {users} from "../entities/users";

export class WalletRepo{

    getWalletForUser(user: users){
      return  getRepository(wallets).findOne({user: id});
    }

    getAll(){
        return getRepository(wallets).find({select:["id"]});
    }
}