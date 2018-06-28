import {Body, Get, JsonController, Param, Post, Put, UseBefore} from "routing-controllers";
import {verify} from "../middlewares/token-guard";
import {OrderRepo} from "../repositories/OrderRepository";
import {ResponseModel, UpdateOrderModel} from "../models/HelperModels";
import {orders} from "../entities/orders";
@JsonController("order")
@UseBefore(verify)
export class OrderController{

    orderRepo: OrderRepo = new OrderRepo();

    @Get("/:id")
    async getAllForUser(@Param("id") id:number){
        try{
            let response = await this.orderRepo.getAll({where:{id:id}});
            return new ResponseModel(true,'The orders for this user have been selected successfully',response);
        }catch(err){
            return new ResponseModel(false,'The orders for this user could not be selected: '+err.message,null);
        }
    }

    @Get("/sell/:marketId")
    async getSellOrders(@Param("marketId") marketId:number){
        try{
            let response = await this.orderRepo.getAll({where:{type:"SELL",marketId:marketId,status:"NOT FILLED"}});
            return new ResponseModel(true,'The sell orders for this market have been selected successfully',response);
        }catch(err){
            return new ResponseModel(false,'The sell orders for this market could not be selected: '+err.message,null);
        }
    }

    @Get("/buy/:marketId")
    async getBuyOrders(@Param("marketId") marketId:number){
        try{
            let response = await this.orderRepo.getAll({where:{type:"BUY",marketId:marketId,status:"NOT FILLED"}});
            return new ResponseModel(true,'The buy orders for this market have been selected successfully',response);
        }catch(err){
            return new ResponseModel(false,'The buy orders for this market could not be selected: '+err.message,null);
        }
    }

    @Post("/")
    async createOrder(@Body() order:orders){
        try{
            let response = await this.orderRepo.createOrder(order);
            return new ResponseModel(true,'The order has been created successfully',response);
        }catch(err){
            return new ResponseModel(false,'The order could not be created: '+err.message,null);
        }
    }

    @Put("/:id/cancel")
    async cancelOrder(@Param("id") id:number){
        try{
            let response = await this.orderRepo.cancelOrder(id);
            return new ResponseModel(true,'The order has been cancelled successfully',response);
        }catch(err){
            return new ResponseModel(false,'The order could not be cancelled: '+err.message,null);
        }
    }

    async updateOrder(@Body() body:UpdateOrderModel){
        try{
            let response = await this.orderRepo.updateOrder(body);
            return new ResponseModel(true,'The order has been updated successfully',response);
        }catch(err){
            return new ResponseModel(false,'The order could not be updated: '+err.message,null);
        }
    }
}