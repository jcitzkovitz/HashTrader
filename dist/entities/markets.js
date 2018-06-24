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
const orders_1 = require("./orders");
let markets = class markets {
};
__decorate([
    typeorm_1.Column("int", {
        generated: true,
        nullable: false,
        primary: true,
        name: "id"
    }),
    __metadata("design:type", Number)
], markets.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(type => coins_1.coins, coins => coins.marketss, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' }),
    typeorm_1.JoinColumn({ name: 'coin1Id' }),
    __metadata("design:type", coins_1.coins)
], markets.prototype, "coin", void 0);
__decorate([
    typeorm_1.ManyToOne(type => coins_1.coins, coins => coins.marketss2, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' }),
    typeorm_1.JoinColumn({ name: 'coin2Id' }),
    __metadata("design:type", coins_1.coins)
], markets.prototype, "coin2", void 0);
__decorate([
    typeorm_1.OneToMany(type => orders_1.orders, orders => orders.market, { onDelete: 'RESTRICT' }),
    __metadata("design:type", Array)
], markets.prototype, "orderss", void 0);
markets = __decorate([
    typeorm_1.Entity("markets", { schema: "hashtrader_exchange" }),
    typeorm_1.Index("coin1Id", ["coin",]),
    typeorm_1.Index("coin2Id", ["coin2",])
], markets);
exports.markets = markets;
//# sourceMappingURL=markets.js.map