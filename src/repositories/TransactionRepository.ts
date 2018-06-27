import {SelectWhereModel} from "../models/HelperModels";
import {getRepository} from "typeorm";
import {transactions} from "../entities/transactions";
export class TransactionRepo{
    getAll(selectWhere:SelectWhereModel){
        getRepository(transactions).find({select:selectWhere.select,where:selectWhere.where});
    }
}