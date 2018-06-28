"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const orders_1 = require("../entities/orders");
class OrderRepo {
    getAll(selectWhere) {
        return typeorm_1.getRepository(orders_1.orders).find(selectWhere);
    }
    createOrder(order) {
        return typeorm_1.getRepository(orders_1.orders).save(order);
    }
    updateOrder(updateInfo) {
        return typeorm_1.getRepository(orders_1.orders).createQueryBuilder().update().set({ status: updateInfo.status, amount: updateInfo.amount }).where("id = :id", { id: updateInfo.id });
    }
    cancelOrder(id) {
        return typeorm_1.getRepository(orders_1.orders).createQueryBuilder().update().set({ status: "CANCELLED" }).where("id = :id", { id: id });
    }
    deleteOrder(id) {
        return typeorm_1.getRepository(orders_1.orders).createQueryBuilder().delete().where({ id: id });
    }
}
exports.OrderRepo = OrderRepo;
//# sourceMappingURL=OrderRepository.js.map