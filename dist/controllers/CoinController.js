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
const users_1 = require("../entities/users");
const CoinRepository_1 = require("../repositories/CoinRepository");
const HelperModels_1 = require("../models/HelperModels");
let CoinController = class CoinController {
    constructor() {
        this.coinRepo = new CoinRepository_1.CoinRepo();
    }
    listNewCoin(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //REQUIRES ADMIN AUTHENTICATION
                let coin = body.coin;
                let response = yield this.coinRepo.listNewCoin(coin);
                return new HelperModels_1.ResponseModel(true, 'The coin was added successfully', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The coin could not be added: ' + err.message, null);
            }
        });
    }
    updateCoin(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //REQUIRES ADMIN AUTHENTICATION
                let coin = body.coin;
                let response = yield this.coinRepo.updateCoin(coin);
                return new HelperModels_1.ResponseModel(true, 'The coin was added successfully', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The coin could not be added: ' + err.message, null);
            }
        });
    }
    deleteCoin(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //REQUIRES ADMIN AUTHENTICATION
                let response = yield this.coinRepo.deleteCoin(id);
                return new HelperModels_1.ResponseModel(true, 'The coin was succesfully deleted', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The coin could not be deleted: ' + err.message, null);
            }
        });
    }
    getOneCoinInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield this.coinRepo.getAllCoinInfo({ id: id });
                return new HelperModels_1.ResponseModel(true, 'The coin has been selected successfully', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The coin could not be selected: ' + err.message, null);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield this.coinRepo.getAllCoinInfo();
                return new HelperModels_1.ResponseModel(true, 'All of the coins have been selected successfully', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The coins could not be selected: ' + err.message, null);
            }
        });
    }
};
__decorate([
    routing_controllers_1.Post("/"),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoinController.prototype, "listNewCoin", null);
__decorate([
    routing_controllers_1.Post("/update"),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoinController.prototype, "updateCoin", null);
__decorate([
    routing_controllers_1.Delete("/:id"),
    __param(0, routing_controllers_1.Param("id")), __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, users_1.users]),
    __metadata("design:returntype", Promise)
], CoinController.prototype, "deleteCoin", null);
__decorate([
    routing_controllers_1.Get("/:id"),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CoinController.prototype, "getOneCoinInfo", null);
__decorate([
    routing_controllers_1.Get("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CoinController.prototype, "getAll", null);
CoinController = __decorate([
    routing_controllers_1.JsonController("/coin"),
    routing_controllers_1.UseBefore(token_guard_1.verify)
], CoinController);
exports.CoinController = CoinController;
//# sourceMappingURL=CoinController.js.map