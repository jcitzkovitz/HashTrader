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
const wallets_1 = require("./wallets");
let addresses = class addresses {
};
__decorate([
    typeorm_1.Column("int", {
        generated: true,
        nullable: false,
        primary: true,
        name: "id"
    }),
    __metadata("design:type", Number)
], addresses.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        nullable: false,
        length: 256,
        name: "addressHash"
    }),
    __metadata("design:type", String)
], addresses.prototype, "addressHash", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        nullable: false,
        length: 256,
        name: "salt"
    }),
    __metadata("design:type", String)
], addresses.prototype, "salt", void 0);
__decorate([
    typeorm_1.Column("double", {
        nullable: false,
        default: "0",
        precision: 22,
        name: "balance"
    }),
    __metadata("design:type", Number)
], addresses.prototype, "balance", void 0);
__decorate([
    typeorm_1.ManyToOne(type => coins_1.coins, coins => coins.addressess, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'CASCADE' }),
    typeorm_1.JoinColumn({ name: 'coinId' }),
    __metadata("design:type", coins_1.coins)
], addresses.prototype, "coin", void 0);
__decorate([
    typeorm_1.ManyToOne(type => wallets_1.wallets, wallets => wallets.addressess, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'CASCADE' }),
    typeorm_1.JoinColumn({ name: 'walletId' }),
    __metadata("design:type", wallets_1.wallets)
], addresses.prototype, "wallet", void 0);
__decorate([
    typeorm_1.Column("enum", {
        nullable: true,
        default: "REGULAR",
        enum: ["REGULAR", "STAKE"],
        name: "type"
    }),
    __metadata("design:type", String)
], addresses.prototype, "type", void 0);
addresses = __decorate([
    typeorm_1.Entity("addresses", { schema: "hashtrader_exchange" }),
    typeorm_1.Index("coinId", ["coin",]),
    typeorm_1.Index("walletId", ["wallet",])
], addresses);
exports.addresses = addresses;
//# sourceMappingURL=addresses.js.map