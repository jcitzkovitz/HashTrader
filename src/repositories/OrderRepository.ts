import {UpdateOrderModel} from "../models/HelperModels";
import {getRepository} from "typeorm";
import {orders} from "../entities/orders";
import {totalmem} from "os";
export class OrderRepo{

    pertinentInfo = ["dateTime","price","amount","total","status","type","sellCoin","buyCoin","market"];

    getAllOrders(options?:any){
        return getRepository(orders).find(options);
    }
    getAllOrdersFor(userId:number){
        return getRepository(orders).createQueryBuilder("order").select(this.pertinentInfo)
            .innerJoin("order.user","user").where("user.id = :userId",{userId:userId}).getMany();
    }
    createOrder(order:orders){
        return getRepository(orders).save(order);
    }
    updateOrder(updateInfo:UpdateOrderModel){
        getRepository(orders).createQueryBuilder().update().set({status:updateInfo.status,amount:updateInfo.amount}).where("id = :id",{id:updateInfo.id}).execute();
    }
    cancelOrder(id:number){
        getRepository(orders).createQueryBuilder().update().set({status:"CANCELLED"}).where("id = :id",{id:id});
    }
    deleteOrder(id:number){
        getRepository(orders).createQueryBuilder().delete().where({id:id});
    }
    matchOrders(marketId:number){
        return getRepository(orders).query(
            "SELECT * FROM "+
            "(SELECT ob.id AS bId, ob.price AS bPrice, ob.amount AS bAmount, ob.dateTime AS bTime, ob.userId AS bUserId "+
            "FROM orders AS ob WHERE ob.type = 'BUY' AND ob.status = 'NOT FILLED' AND ob.marketId = ? "+
            "ORDER BY ob.dateTime ASC) AS buyOrders, "+
            "(SELECT os.id AS sId, os.price AS sPrice, os.amount AS sAmount, os.dateTime AS sTime, os.userId AS sUserId "+
            "FROM orders AS os WHERE os.type = 'SELL' AND os.status = 'NOT FILLED' AND os.marketId = ? "+
            "ORDER BY os.dateTime ASC) AS sellOrders "+
            "WHERE buyOrders.bPrice >= sellOrders.sPrice "+
            "LIMIT 1;",[marketId,marketId]);
    }
}