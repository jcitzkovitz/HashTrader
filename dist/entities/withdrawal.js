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
const transactions_1 = require("./transactions");
let withdrawal = class withdrawal {
};
__decorate([
    typeorm_1.Column("int", {
        nullable: false,
        primary: true,
        name: "id"
    }),
    __metadata("design:type", Number)
], withdrawal.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        nullable: false,
        length: 64,
        name: "sendToAddress"
    }),
    __metadata("design:type", String)
], withdrawal.prototype, "sendToAddress", void 0);
__decorate([
    typeorm_1.ManyToOne(type => transactions_1.transactions, transactions => transactions.withdrawals, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' }),
    typeorm_1.JoinColumn({ name: 'transactionId' }),
    __metadata("design:type", transactions_1.transactions)
], withdrawal.prototype, "transaction", void 0);
withdrawal = __decorate([
    typeorm_1.Entity("withdrawal", { schema: "hashtrader_exchange" }),
    typeorm_1.Index("transactionId", ["transaction",])
], withdrawal);
exports.withdrawal = withdrawal;
//# sourceMappingURL=withdrawal.js.map