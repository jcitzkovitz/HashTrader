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
const addresses_1 = require("./addresses");
let wallets = class wallets {
};
__decorate([
    typeorm_1.Column("int", {
        generated: true,
        nullable: false,
        primary: true,
        name: "id"
    }),
    __metadata("design:type", Number)
], wallets.prototype, "id", void 0);
__decorate([
    typeorm_1.OneToOne(type => users_1.users, users => users.wallets, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' }),
    typeorm_1.JoinColumn({ name: 'userId' }),
    __metadata("design:type", users_1.users)
], wallets.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(type => addresses_1.addresses, addresses => addresses.wallet, { onDelete: 'RESTRICT' }),
    __metadata("design:type", Array)
], wallets.prototype, "addressess", void 0);
wallets = __decorate([
    typeorm_1.Entity("wallets", { schema: "hashtrader_exchange" }),
    typeorm_1.Index("userId", ["user",], { unique: true })
], wallets);
exports.wallets = wallets;
//# sourceMappingURL=wallets.js.map