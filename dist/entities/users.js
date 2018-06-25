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
const orders_1 = require("./orders");
const people_1 = require("./people");
const transactions_1 = require("./transactions");
const wallets_1 = require("./wallets");
let users = class users {
};
__decorate([
    typeorm_1.Column("int", {
        generated: true,
        nullable: false,
        primary: true,
        name: "id"
    }),
    __metadata("design:type", Number)
], users.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        nullable: false,
        unique: true,
        length: 50,
        name: "username"
    }),
    __metadata("design:type", String)
], users.prototype, "username", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        nullable: false,
        length: 256,
        name: "passwordHash"
    }),
    __metadata("design:type", String)
], users.prototype, "passwordHash", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        nullable: false,
        length: 256,
        name: "salt"
    }),
    __metadata("design:type", String)
], users.prototype, "salt", void 0);
__decorate([
    typeorm_1.Column("enum", {
        nullable: false,
        enum: ["ADMIN", "EMPLOYEE", "EXUSER"],
        name: "type"
    }),
    __metadata("design:type", String)
], users.prototype, "type", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        nullable: false,
        length: 64,
        name: "email"
    }),
    __metadata("design:type", String)
], users.prototype, "email", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        nullable: false,
        length: 50,
        name: "phoneNumber"
    }),
    __metadata("design:type", String)
], users.prototype, "phoneNumber", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        nullable: true,
        length: 64,
        name: "googleAuth"
    }),
    __metadata("design:type", String)
], users.prototype, "googleAuth", void 0);
__decorate([
    typeorm_1.Column("double", {
        nullable: true,
        default: "0",
        precision: 22,
        name: "withdrawalLimit"
    }),
    __metadata("design:type", Number)
], users.prototype, "withdrawalLimit", void 0);
__decorate([
    typeorm_1.Column("tinyint", {
        nullable: true,
        width: 1,
        default: "0",
        name: "passport"
    }),
    __metadata("design:type", Boolean)
], users.prototype, "passport", void 0);
__decorate([
    typeorm_1.Column("tinyint", {
        nullable: true,
        width: 1,
        default: "0",
        name: "driversLicense"
    }),
    __metadata("design:type", Boolean)
], users.prototype, "driversLicense", void 0);
__decorate([
    typeorm_1.Column("tinyint", {
        nullable: true,
        width: 1,
        default: "0",
        name: "photoWPassport"
    }),
    __metadata("design:type", Boolean)
], users.prototype, "photoWPassport", void 0);
__decorate([
    typeorm_1.OneToMany(type => orders_1.orders, orders => orders.user, { onDelete: 'RESTRICT' }),
    __metadata("design:type", Array)
], users.prototype, "orderss", void 0);
__decorate([
    typeorm_1.OneToOne(type => people_1.people, people => people.user, { onDelete: 'CASCADE' }),
    __metadata("design:type", people_1.people)
], users.prototype, "people", void 0);
__decorate([
    typeorm_1.OneToMany(type => transactions_1.transactions, transactions => transactions.user, { onDelete: 'RESTRICT' }),
    __metadata("design:type", Array)
], users.prototype, "transactionss", void 0);
__decorate([
    typeorm_1.OneToOne(type => wallets_1.wallets, wallets => wallets.user, { onDelete: 'RESTRICT' }),
    __metadata("design:type", wallets_1.wallets)
], users.prototype, "wallets", void 0);
users = __decorate([
    typeorm_1.Entity("users", { schema: "hashtrader_exchange" }),
    typeorm_1.Index("username", ["username",], { unique: true })
], users);
exports.users = users;
//# sourceMappingURL=users.js.map