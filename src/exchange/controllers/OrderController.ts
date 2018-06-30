import {Body, Get, JsonController, Param, Post, Put, UseBefore} from "routing-controllers";
import {verify} from "../../middlewares/token-guard";
import {OrderRepo} from "../repositories/OrderRepository";
import {ResponseModel, UpdateOrderModel} from "../../models/HelperModels";
import {orders} from "../entities/orders";
import {CoinRepo} from "../repositories/CoinRepository";
import {MarketRepo} from "../repositories/MarketRepository";
import {UserRepo} from "../repositories/UserRepository";

@JsonController("/order")
@UseBefore(verify)
export class OrderController{

    orderRepo: OrderRepo = new OrderRepo();
    coinRepo: CoinRepo = new CoinRepo();
    marketRepo: MarketRepo = new MarketRepo();
    userRepo: UserRepo = new UserRepo();

    @Get("/:userId")
    async getAllForUser(@Param("userId") userId:number){
        try{
            let response = await this.orderRepo.getAllOrdersFor(userId);
            return new ResponseModel(true,'The orders for this user have been selected successfully',response);
        }catch(err){
            return new ResponseModel(false,'The orders for this user could not be selected: '+err.message,null);
        }
    }

    @Get("/sell/:marketId")
    async getSellOrders(@Param("marketId") marketId:number){
        try{
            let response = await this.orderRepo.getAllOrders({select: this.orderRepo.pertinentInfo,where:{type:"SELL",marketId:marketId,status:"NOT FILLED"},order:{price:"ASC",dateTime:"ASC"}});
            return new ResponseModel(true,'The sell orders for this market have been selected successfully',response);
        }catch(err){
            return new ResponseModel(false,'The sell orders for this market could not be selected: '+err.message,null);
        }
    }

    @Get("/buy/:marketId")
    async getBuyOrders(@Param("marketId") marketId:number){
        try{
            let response = await this.orderRepo.getAllOrders({select: this.orderRepo.pertinentInfo,where:{type:"BUY",marketId:marketId,status:"NOT FILLED"},order:{price:"DESC",dateTime:"ASC"}});
            return new ResponseModel(true,'The buy orders for this market have been selected successfully',response);
        }catch(err){
            return new ResponseModel(false,'The buy orders for this market could not be selected: '+err.message,null);
        }
    }

    @Post("/")
    async createOrder(@Body() order:any){
        try{
            let finalOrder:orders = new orders();
            finalOrder.dateTime = new Date();
            finalOrder.status = "NOT FILLED";
            finalOrder.sellCoin = await this.coinRepo.getOne(order.sellCoinId);
            finalOrder.buyCoin = await this.coinRepo.getOne(order.buyCoinId);
            finalOrder.market = await this.marketRepo.getMarket(order.marketId);
            finalOrder.user = await this.userRepo.getOne(order.userId);
            finalOrder.price = order.price;
            finalOrder.amount = order.amount;
            finalOrder.total = order.total;
            finalOrder.type = order.type;
            let response = await this.orderRepo.createOrder(finalOrder);
            response.user = null;
            this.matchOrders(order.marketId);
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

    // @Put("/update")
    // async updateOrder(w:any){
    //     try{
    //         let response = await this.orderRepo.updateOrder({status:"FILLED",amount:0,id:1});
    //         return new ResponseModel(true,'The order has been updated successfully',response);
    //     }catch(err){
    //         return new ResponseModel(false,'The order could not be cancelled: '+err.message,null);
    //     }
    // }

        async matchOrders(marketId:number){
        try{
            let matchedOrders = await this.orderRepo.matchOrders(marketId);
            let sellOrder: UpdateOrderModel;
            let buyOrder: UpdateOrderModel;
            while(matchedOrders.length > 0){
                //Set update sell order criterion
                sellOrder ={
                    id: matchedOrders[0].sId,
                    status: "NOT FILLED",
                    amount: 0
                };

                //Set update buy order criterion
                buyOrder ={
                    id: matchedOrders[0].bId,
                    status: "NOT FILLED",
                    amount: 0
                };
                //Set the transferred amounts
                if(matchedOrders[0].sAmount > matchedOrders[0].bAmount){
                    sellOrder.amount = matchedOrders[0].sAmount - matchedOrders[0].bAmount;
                    buyOrder.amount = 0;
                    buyOrder.status = "FILLED";
                }else if(matchedOrders[0].sAmount < matchedOrders[0].bAmount){
                    sellOrder.amount = 0;
                    buyOrder.amount = matchedOrders[0].bAmount - matchedOrders[0].sAmount;
                    sellOrder.status = "FILLED";
                }else{
                    sellOrder.amount = 0;
                    buyOrder.amount = 0;
                    sellOrder.status = "FILLED";
                    buyOrder.status = "FILLED";
                }

                //Update the orders in the system
                await this.updateOrder(sellOrder);
                await this.updateOrder(buyOrder);

                //Update the user balances

                //Get the next match
                matchedOrders = await this.orderRepo.matchOrders(marketId);
            }
            return;
        }catch(err){
            return new ResponseModel(false,'Could not get matched orders: '+err.message,null);
        }
    }

    async updateOrder(body:UpdateOrderModel){
        try{
            await this.orderRepo.updateOrder(body);
            return new ResponseModel(true,'The order has been updated successfully',null);
        }catch(err){
            return new ResponseModel(false,'The order could not be updated: '+err.message,null);
        }
    }
}