import {getRepository} from "typeorm";
import {transactions} from "../entities/transactions";
export class TransactionRepo{
    getAll(selectWhere?:any){
        getRepository(transactions).find(selectWhere);
    }
}