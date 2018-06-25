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
const users_1 = require("./users");
let transactions = class transactions {
};
__decorate([
    typeorm_1.Column("int", {
        generated: true,
        nullable: false,
        primary: true,
        name: "id"
    }),
    __metadata("design:type", Number)
], transactions.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        nullable: true,
        length: 64,
        name: "txid"
    }),
    __metadata("design:type", String)
], transactions.prototype, "txid", void 0);
__decorate([
    typeorm_1.Column("enum", {
        nullable: true,
        enum: ["PENDING", "CONFIRMED", "FAILED"],
        name: "status"
    }),
    __metadata("design:type", String)
], transactions.prototype, "status", void 0);
__decorate([
    typeorm_1.Column("double", {
        nullable: false,
        precision: 22,
        name: "amount"
    }),
    __metadata("design:type", Number)
], transactions.prototype, "amount", void 0);
__decorate([
    typeorm_1.Column("double", {
        nullable: false,
        precision: 22,
        name: "fee"
    }),
    __metadata("design:type", Number)
], transactions.prototype, "fee", void 0);
__decorate([
    typeorm_1.Column("datetime", {
        nullable: false,
        name: "dateTime"
    }),
    __metadata("design:type", Date)
], transactions.prototype, "dateTime", void 0);
__decorate([
    typeorm_1.ManyToOne(type => users_1.users, users => users.transactionss, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' }),
    typeorm_1.JoinColumn({ name: 'userId' }),
    __metadata("design:type", users_1.users)
], transactions.prototype, "user", void 0);
__decorate([
    typeorm_1.Column("enum", {
        nullable: false,
        enum: ["DEPOSIT", "WITHDRAWAL"],
        name: "type"
    }),
    __metadata("design:type", String)
], transactions.prototype, "type", void 0);
transactions = __decorate([
    typeorm_1.Entity("transactions", { schema: "hashtrader_exchange" }),
    typeorm_1.Index("userId", ["user",])
], transactions);
exports.transactions = transactions;
//# sourceMappingURL=transactions.js.map