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
const addresses_1 = require("./addresses");
const markets_1 = require("./markets");
const orders_1 = require("./orders");
let coins = class coins {
};
__decorate([
    typeorm_1.Column("int", {
        generated: true,
        nullable: false,
        primary: true,
        name: "id"
    }),
    __metadata("design:type", Number)
], coins.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        nullable: false,
        unique: true,
        length: 5,
        name: "ticker"
    }),
    __metadata("design:type", String)
], coins.prototype, "ticker", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        nullable: false,
        length: 20,
        name: "name"
    }),
    __metadata("design:type", String)
], coins.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("enum", {
        nullable: true,
        default: "NO",
        enum: ["YES", "NO"],
        name: "stakeable"
    }),
    __metadata("design:type", String)
], coins.prototype, "stakeable", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        nullable: true,
        length: 64,
        name: "coinWebsite"
    }),
    __metadata("design:type", String)
], coins.prototype, "coinWebsite", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        nullable: true,
        length: 64,
        name: "coinBlockExplore"
    }),
    __metadata("design:type", String)
], coins.prototype, "coinBlockExplore", void 0);
__decorate([
    typeorm_1.OneToMany(type => addresses_1.addresses, addresses => addresses.coin, { onDelete: 'RESTRICT' }),
    __metadata("design:type", Array)
], coins.prototype, "addressess", void 0);
__decorate([
    typeorm_1.OneToMany(type => markets_1.markets, markets => markets.coin, { onDelete: 'RESTRICT' }),
    __metadata("design:type", Array)
], coins.prototype, "marketss", void 0);
__decorate([
    typeorm_1.OneToMany(type => markets_1.markets, markets => markets.coin2, { onDelete: 'RESTRICT' }),
    __metadata("design:type", Array)
], coins.prototype, "marketss2", void 0);
__decorate([
    typeorm_1.OneToMany(type => orders_1.orders, orders => orders.sellCoin, { onDelete: 'RESTRICT' }),
    __metadata("design:type", Array)
], coins.prototype, "orderss", void 0);
__decorate([
    typeorm_1.OneToMany(type => orders_1.orders, orders => orders.buyCoin, { onDelete: 'RESTRICT' }),
    __metadata("design:type", Array)
], coins.prototype, "orderss2", void 0);
coins = __decorate([
    typeorm_1.Entity("coins", { schema: "hashtrader_exchange" }),
    typeorm_1.Index("ticker", ["ticker",], { unique: true })
], coins);
exports.coins = coins;
//# sourceMappingURL=coins.js.map