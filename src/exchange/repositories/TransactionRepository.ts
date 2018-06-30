import {getRepository} from "typeorm";
import {transactions} from "../entities/transactions";
export class TransactionRepo{
    getAllTransactions(selectWhere?:any){
        return getRepository(transactions).find(selectWhere);
    }
    saveTransation(transaction:transactions){
       getRepository(transactions).save(transaction);
    }
}