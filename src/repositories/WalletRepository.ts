import {wallets} from "../entities/wallets";
import {getRepository} from "typeorm";
import {users} from "../entities/users";

export class WalletRepo{

    getWalletForUser(userId: number){
      return  getRepository(wallets).createQueryBuilder("wallet").innerJoin("wallet.user","user").where("user.id = :userId",{userId:userId}).getOne();
    }

    getAll(){
        return getRepository(wallets).find({select:["id"]});
    }
}