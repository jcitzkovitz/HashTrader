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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const wallets_1 = require("./wallets");
const transactions_1 = require("./transactions");
let deposits = class deposits {
};
__decorate([
    typeorm_1.Column("int", {
        nullable: false,
        primary: true,
        name: "id"
    }),
    __metadata("design:type", Number)
], deposits.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => wallets_1.wallets, wallets => wallets.depositss, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' }),
    typeorm_1.JoinColumn({ name: 'walletId' }),
    __metadata("design:type", wallets_1.wallets)
], deposits.prototype, "wallet", void 0);
__decorate([
    typeorm_1.ManyToOne(type => transactions_1.transactions, transactions => transactions.depositss, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' }),
    typeorm_1.JoinColumn({ name: 'transactionId' }),
    __metadata("design:type", transactions_1.transactions)
], deposits.prototype, "transaction", void 0);
deposits = __decorate([
    typeorm_1.Entity("deposits", { schema: "hashtrader_exchange" }),
    typeorm_1.Index("walletId", ["wallet",]),
    typeorm_1.Index("transactionId", ["transaction",])
], deposits);
exports.deposits = deposits;
//# sourceMappingURL=deposits.js.map