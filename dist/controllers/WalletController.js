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
const WalletRepository_1 = require("../repositories/WalletRepository");
const AddressRepository_1 = require("../repositories/AddressRepository");
const HelperModels_1 = require("../models/HelperModels");
let WalletController = class WalletController {
    constructor() {
        this.walletRepo = new WalletRepository_1.WalletRepo();
        this.addressRepo = new AddressRepository_1.AddressRepo();
    }
    getBalanceForCoin(userId, coinId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let walletId = (yield this.walletRepo.getWalletForUser(userId)).id;
                let response = yield this.addressRepo.getBalanceForCoin(walletId, coinId);
                return new HelperModels_1.ResponseModel(true, 'The balance has been selected successfully', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The balance could not be selected: ' + err.message, null);
            }
        });
    }
    getWallet(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let walletId = (yield this.walletRepo.getWalletForUser(userId)).id;
                let response = yield this.addressRepo.getAllBalances(walletId);
                return new HelperModels_1.ResponseModel(true, 'The wallet has been selected successfully', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The wallet could not be selected: ' + err.message, null);
            }
        });
    }
    updateBalanceForCoin(balanceChange) {
        return __awaiter(this, void 0, void 0, function* () {
            let walletId = (yield this.walletRepo.getWalletForUser(balanceChange.userId)).id;
            let balance = yield this.addressRepo.getBalanceForCoin(walletId, balanceChange.coinId);
            if (balanceChange.change == "ADD")
                balance += balanceChange.value;
            else if (balance - balanceChange.value >= 0)
                balance -= balanceChange.value;
            else
                throw new Error("There are insufficient funds in this wallet for this transaction");
            let response = this.addressRepo.updateBalance(walletId, balanceChange.coinId, balance);
            return { walletId: walletId, response: response };
        });
    }
    createNewAddress(userId, coinId) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
__decorate([
    routing_controllers_1.Get("/:userId/:coinId"),
    __param(0, routing_controllers_1.Param("userId")), __param(1, routing_controllers_1.Param("coinId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getBalanceForCoin", null);
__decorate([
    routing_controllers_1.Get("/:userId"),
    __param(0, routing_controllers_1.Param("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getWallet", null);
__decorate([
    routing_controllers_1.Get("/:userId/:coinId"),
    __param(0, routing_controllers_1.Param("userId")), __param(1, routing_controllers_1.Param("coinId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "createNewAddress", null);
WalletController = __decorate([
    routing_controllers_1.JsonController("/wallet"),
    routing_controllers_1.UseBefore(token_guard_1.verify)
], WalletController);
exports.WalletController = WalletController;
//# sourceMappingURL=WalletController.js.map