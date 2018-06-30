"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const orders_1 = require("../entities/orders");
class OrderRepo {
    constructor() {
        this.pertinentInfo = ["dateTime", "price", "amount", "total", "status", "type", "sellCoin", "buyCoin", "market"];
    }
    getAllOrders(options) {
        return typeorm_1.getRepository(orders_1.orders).find(options);
    }
    getAllOrdersFor(userId) {
        return typeorm_1.getRepository(orders_1.orders).createQueryBuilder("order").select(this.pertinentInfo)
            .innerJoin("order.user", "user").where("user.id = :userId", { userId: userId }).getMany();
    }
    createOrder(order) {
        return typeorm_1.getRepository(orders_1.orders).save(order);
    }
    updateOrder(updateInfo) {
        console.log("UPDATE INFO: ");
        console.log(updateInfo);
        typeorm_1.getRepository(orders_1.orders).createQueryBuilder().update().set({ status: updateInfo.status, amount: updateInfo.amount }).where("id = :id", { id: updateInfo.id }).execute();
    }
    cancelOrder(id) {
        typeorm_1.getRepository(orders_1.orders).createQueryBuilder().update().set({ status: "CANCELLED" }).where("id = :id", { id: id });
    }
    deleteOrder(id) {
        typeorm_1.getRepository(orders_1.orders).createQueryBuilder().delete().where({ id: id });
    }
    matchOrders(marketId) {
        return typeorm_1.getRepository(orders_1.orders).query("SELECT * FROM " +
            "(SELECT ob.id AS bId, ob.price AS bPrice, ob.amount AS bAmount, ob.dateTime AS bTime, ob.userId AS bUserId " +
            "FROM orders AS ob WHERE ob.type = 'BUY' AND ob.status = 'NOT FILLED' AND ob.marketId = ? " +
            "ORDER BY ob.dateTime ASC) AS buyOrders, " +
            "(SELECT os.id AS sId, os.price AS sPrice, os.amount AS sAmount, os.dateTime AS sTime, os.userId AS sUserId " +
            "FROM orders AS os WHERE os.type = 'SELL' AND os.status = 'NOT FILLED' AND os.marketId = ? " +
            "ORDER BY os.dateTime ASC) AS sellOrders " +
            "WHERE buyOrders.bPrice >= sellOrders.sPrice " +
            "LIMIT 1;", [marketId, marketId]);
    }
}
exports.OrderRepo = OrderRepo;
//# sourceMappingURL=OrderRepository.js.map