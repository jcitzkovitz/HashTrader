import {UpdateOrderModel} from "../models/HelperModels";
import {getRepository} from "typeorm";
import {orders} from "../entities/orders";
import {totalmem} from "os";
export class OrderRepo{
    getAll(selectWhere?:any){
        return getRepository(orders).find(selectWhere);
    }
    createOrder(order:orders){
        return getRepository(orders).save(order);
    }
    updateOrder(updateInfo:UpdateOrderModel){
        return getRepository(orders).createQueryBuilder().update().set({status:updateInfo.status,amount:updateInfo.amount}).where("id = :id",{id:updateInfo.id});
    }
    cancelOrder(id:Number){
        return getRepository(orders).createQueryBuilder().update().set({status:"CANCELLED"}).where("id = :id",{id:id});
    }
    deleteOrder(id:number){
        return getRepository(orders).createQueryBuilder().delete().where({id:id});
    }
}