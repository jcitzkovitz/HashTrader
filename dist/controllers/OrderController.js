"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const token_guard_1 = require("../middlewares/token-guard");
const OrderRepository_1 = require("../repositories/OrderRepository");
const HelperModels_1 = require("../models/HelperModels");
const orders_1 = require("../entities/orders");
let OrderController = class OrderController {
    constructor() {
        this.orderRepo = new OrderRepository_1.OrderRepo();
    }
    getAllForUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield this.orderRepo.getAll({ where: { id: id } });
                return new HelperModels_1.ResponseModel(true, 'The orders for this user have been selected successfully', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The orders for this user could not be selected: ' + err.message, null);
            }
        });
    }
    getSellOrders(marketId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield this.orderRepo.getAll({ where: { type: "SELL", marketId: marketId, status: "NOT FILLED" } });
                return new HelperModels_1.ResponseModel(true, 'The sell orders for this market have been selected successfully', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The sell orders for this market could not be selected: ' + err.message, null);
            }
        });
    }
    getBuyOrders(marketId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield this.orderRepo.getAll({ where: { type: "BUY", marketId: marketId, status: "NOT FILLED" } });
                return new HelperModels_1.ResponseModel(true, 'The buy orders for this market have been selected successfully', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The buy orders for this market could not be selected: ' + err.message, null);
            }
        });
    }
    createOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield this.orderRepo.createOrder(order);
                return new HelperModels_1.ResponseModel(true, 'The order has been created successfully', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The order could not be created: ' + err.message, null);
            }
        });
    }
    cancelOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield this.orderRepo.cancelOrder(id);
                return new HelperModels_1.ResponseModel(true, 'The order has been cancelled successfully', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The order could not be cancelled: ' + err.message, null);
            }
        });
    }
    updateOrder(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield this.orderRepo.updateOrder(body);
                return new HelperModels_1.ResponseModel(true, 'The order has been updated successfully', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The order could not be updated: ' + err.message, null);
            }
        });
    }
};
__decorate([
    routing_controllers_1.Get("/:id"),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllForUser", null);
__decorate([
    routing_controllers_1.Get("/sell/:marketId"),
    __param(0, routing_controllers_1.Param("marketId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getSellOrders", null);
__decorate([
    routing_controllers_1.Get("/buy/:marketId"),
    __param(0, routing_controllers_1.Param("marketId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getBuyOrders", null);
__decorate([
    routing_controllers_1.Post("/"),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [orders_1.orders]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    routing_controllers_1.Put("/:id/cancel"),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "cancelOrder", null);
__decorate([
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateOrder", null);
OrderController = __decorate([
    routing_controllers_1.JsonController("order"),
    routing_controllers_1.UseBefore(token_guard_1.verify)
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=OrderController.js.map