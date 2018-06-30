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
const WalletController_1 = require("./WalletController");
const AuthenticationController_1 = require("./AuthenticationController");
const HelperModels_1 = require("../../models/HelperModels");
const AddressRepository_1 = require("../repositories/AddressRepository");
const UserRepository_1 = require("../repositories/UserRepository");
const TransactionRepository_1 = require("../repositories/TransactionRepository");
const CoinRepository_1 = require("../repositories/CoinRepository");
let TransactionController = class TransactionController {
    constructor() {
        this.walletController = new WalletController_1.WalletController();
        this.authController = new AuthenticationController_1.AuthenticationController();
        this.coinRepo = new CoinRepository_1.CoinRepo();
        this.addressRepo = new AddressRepository_1.AddressRepo();
        this.userRepo = new UserRepository_1.UserRepo();
        this.transactionRepo = new TransactionRepository_1.TransactionRepo();
    }
    getAllTransactionsForUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield this.transactionRepo.getAllTransactions({ where: { userId: userId } });
                return new HelperModels_1.ResponseModel(true, 'The transactions for this user have been selected', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The transactions for this user could not be selected', null);
            }
        });
    }
    getAllTransactionsForUserWithCoin(userId, coinId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield this.transactionRepo.getAllTransactions({ where: { userId: userId, coinId: coinId } });
                return new HelperModels_1.ResponseModel(true, 'The transactions for this user have been selected', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The transactions for this user and coin could not be selected', null);
            }
        });
    }
    getAllTransactions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //REQUIRES ADMIN AUTHENTICATION
                let response = yield this.transactionRepo.getAllTransactions();
                return new HelperModels_1.ResponseModel(true, 'The transactions could not be selected', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The transactions could not be selected', null);
            }
        });
    }
    makeWithdrawal(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Authenticate user
                let auth = { username: body.username, password: body.password, googleAuth: body.googleAuth };
                let user = yield this.authController.authenticateUser(auth);
                //Check if the withdrawal amount is below the users limit
                if (body.amount > user.withdrawalLimit)
                    throw new routing_controllers_1.UnauthorizedError("The user cannot withdraw an amount greater than their stated limit");
                //Change the users balance
                let balanceChange = { userId: user.id, coinId: body.coinId, change: "SUB", amount: body.amount };
                let updatedBalanceResponse = yield this.walletController.updateBalanceForCoin(balanceChange);
                //Send money to selected address
                let fromAddressHash = yield this.addressRepo.getAddressForCoin(updatedBalanceResponse.walletId, body.coinId);
                //****GET ADDR FROM OTHER DB****
                //****SEND MONEY TO GIVEN ADDR****
                let txid = yield this.addressRepo.withdraw(body.sendToAddress, fromAddressHash, body.amount);
                let transaction = {
                    id: 0,
                    txid: txid,
                    status: "PENDING",
                    amount: body.amount,
                    fee: body.fee,
                    dateTime: new Date(),
                    user: user,
                    coin: yield this.coinRepo.getOne(body.coinId),
                    type: "WITHDRAWAL"
                };
                let response = yield this.transactionRepo.saveTransation(transaction);
                return new HelperModels_1.ResponseModel(true, 'The transaction was successful', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The transaction could not go through: ' + err.message, null);
            }
        });
    }
    makeDeposit(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get userId
                let user = yield this.userRepo.getOne(body.id);
                //Change the users balance
                let balanceChange = { userId: user.id, coinId: body.coinId, change: "ADD", amount: body.amount };
                let updatedBalanceResponse = yield this.walletController.updateBalanceForCoin(balanceChange);
                //Get money from selected address
                let toAddressHash = yield this.addressRepo.getAddressForCoin(updatedBalanceResponse.walletId, body.coinId);
                //****GET ADDR FROM OTHER DB****
                //****SEND MONEY TO DB ADDR****
                let txid = '';
                let transaction = {
                    id: 0,
                    txid: txid,
                    status: "PENDING",
                    amount: body.amount,
                    dateTime: new Date(),
                    fee: 0,
                    user: user,
                    coin: yield this.coinRepo.getOne(body.coinId),
                    type: "DEPOSIT"
                };
                let response;
                return new HelperModels_1.ResponseModel(true, 'The transaction was successful', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The transaction could not go through: ' + err.message, null);
            }
        });
    }
};
__decorate([
    routing_controllers_1.Get("/:userId"),
    __param(0, routing_controllers_1.Param("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "getAllTransactionsForUser", null);
__decorate([
    routing_controllers_1.Get("/:userId/:coinId"),
    __param(0, routing_controllers_1.Param("userId")), __param(1, routing_controllers_1.Param("coinId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "getAllTransactionsForUserWithCoin", null);
__decorate([
    routing_controllers_1.Get("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "getAllTransactions", null);
__decorate([
    routing_controllers_1.Post("/withdraw"),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "makeWithdrawal", null);
__decorate([
    routing_controllers_1.Post("/deposit"),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "makeDeposit", null);
TransactionController = __decorate([
    routing_controllers_1.JsonController("/transaction"),
    routing_controllers_1.UseBefore(token_guard_1.verify)
], TransactionController);
exports.TransactionController = TransactionController;
//# sourceMappingURL=TransactionController.js.map