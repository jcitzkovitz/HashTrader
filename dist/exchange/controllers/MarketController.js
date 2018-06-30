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
const token_guard_1 = require("../../middlewares/token-guard");
const MarketRepository_1 = require("../repositories/MarketRepository");
const HelperModels_1 = require("../../models/HelperModels");
const CoinRepository_1 = require("../repositories/CoinRepository");
let MarketController = class MarketController {
    constructor() {
        this.marketRepo = new MarketRepository_1.MarketRepo();
        this.coinRepo = new CoinRepository_1.CoinRepo();
    }
    getAllMarkets() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield this.marketRepo.getAllMarkets();
                return new HelperModels_1.ResponseModel(true, 'All markets have been selected successfully', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The markets could not be selected: ' + err.message, null);
            }
        });
    }
    getAllMarketsFor(coinId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield this.marketRepo.getAllMarketsFor(coinId);
                return new HelperModels_1.ResponseModel(true, 'The markets for this coin has been selected successfully', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The markets could not be selected: ' + err.message, null);
            }
        });
    }
    getMarket(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield this.marketRepo.getMarket(id);
                return new HelperModels_1.ResponseModel(true, 'The market has been selected successfully', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The market could not be selected: ' + err.message, null);
            }
        });
    }
    createMarket(id1, id2) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //REQUIRES ADMIN AUTHENTICATION
                //Check that coin1 is a main market coi
                let coin1 = yield this.coinRepo.getOne(id1);
                let coin2 = yield this.coinRepo.getOne(id2);
                // if(coin1.marketType != "MAIN") throw new Error("Coin 1 must be a main market coin");
                let ticker = coin1.ticker + "_" + coin2.ticker;
                let response = yield this.marketRepo.createMarket({ id: null, ticker: ticker, coin: coin1, coin2: coin2, orderss: null });
                return new HelperModels_1.ResponseModel(true, 'The market has been created successfully', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The market could not be created: ' + err.message, null);
            }
        });
    }
    deleteMarket(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //REQUIRES ADMIN AUTHENTICATION
                yield this.marketRepo.deleteMarket(id);
                return new HelperModels_1.ResponseModel(true, 'The market has been deleted successfully', null);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The market could not be created', null);
            }
        });
    }
};
__decorate([
    routing_controllers_1.Get("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MarketController.prototype, "getAllMarkets", null);
__decorate([
    routing_controllers_1.Get("/forCoin/:coinId"),
    __param(0, routing_controllers_1.Param("coinId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MarketController.prototype, "getAllMarketsFor", null);
__decorate([
    routing_controllers_1.Get("/:id"),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MarketController.prototype, "getMarket", null);
__decorate([
    routing_controllers_1.Post("/:id1/:id2"),
    __param(0, routing_controllers_1.Param("id1")), __param(1, routing_controllers_1.Param("id2")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], MarketController.prototype, "createMarket", null);
__decorate([
    routing_controllers_1.Delete("/:id"),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MarketController.prototype, "deleteMarket", null);
MarketController = __decorate([
    routing_controllers_1.JsonController("/market"),
    routing_controllers_1.UseBefore(token_guard_1.verify)
], MarketController);
exports.MarketController = MarketController;
//# sourceMappingURL=MarketController.js.map