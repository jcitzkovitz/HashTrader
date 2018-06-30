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
const coins_1 = require("./coins");
const markets_1 = require("./markets");
const users_1 = require("./users");
let orders = class orders {
};
__decorate([
    typeorm_1.Column("int", {
        generated: true,
        nullable: false,
        primary: true,
        name: "id"
    }),
    __metadata("design:type", Number)
], orders.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("datetime", {
        nullable: false,
        name: "dateTime"
    }),
    __metadata("design:type", Date)
], orders.prototype, "dateTime", void 0);
__decorate([
    typeorm_1.Column("double", {
        nullable: false,
        precision: 22,
        name: "price"
    }),
    __metadata("design:type", Number)
], orders.prototype, "price", void 0);
__decorate([
    typeorm_1.Column("double", {
        nullable: false,
        precision: 22,
        name: "amount"
    }),
    __metadata("design:type", Number)
], orders.prototype, "amount", void 0);
__decorate([
    typeorm_1.Column("double", {
        nullable: false,
        precision: 22,
        name: "total"
    }),
    __metadata("design:type", Number)
], orders.prototype, "total", void 0);
__decorate([
    typeorm_1.Column("enum", {
        nullable: true,
        enum: ["FILLED", "NOT FILLED", "CANCELLED"],
        name: "status"
    }),
    __metadata("design:type", String)
], orders.prototype, "status", void 0);
__decorate([
    typeorm_1.Column("enum", {
        nullable: true,
        enum: ["BUY", "SELL"],
        name: "type"
    }),
    __metadata("design:type", String)
], orders.prototype, "type", void 0);
__decorate([
    typeorm_1.ManyToOne(type => coins_1.coins, coins => coins.orderss, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'CASCADE' }),
    typeorm_1.JoinColumn({ name: 'sellCoin' }),
    __metadata("design:type", coins_1.coins)
], orders.prototype, "sellCoin", void 0);
__decorate([
    typeorm_1.ManyToOne(type => coins_1.coins, coins => coins.orderss2, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'CASCADE' }),
    typeorm_1.JoinColumn({ name: 'buyCoin' }),
    __metadata("design:type", coins_1.coins)
], orders.prototype, "buyCoin", void 0);
__decorate([
    typeorm_1.ManyToOne(type => markets_1.markets, markets => markets.orderss, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'CASCADE' }),
    typeorm_1.JoinColumn({ name: 'marketId' }),
    __metadata("design:type", markets_1.markets)
], orders.prototype, "market", void 0);
__decorate([
    typeorm_1.ManyToOne(type => users_1.users, users => users.orderss, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'CASCADE' }),
    typeorm_1.JoinColumn({ name: 'userId' }),
    __metadata("design:type", users_1.users)
], orders.prototype, "user", void 0);
orders = __decorate([
    typeorm_1.Entity("orders", { schema: "hashtrader_exchange" }),
    typeorm_1.Index("userId", ["user",]),
    typeorm_1.Index("sellCoin", ["sellCoin",]),
    typeorm_1.Index("buyCoin", ["buyCoin",]),
    typeorm_1.Index("marketId", ["market",])
], orders);
exports.orders = orders;
//# sourceMappingURL=orders.js.map