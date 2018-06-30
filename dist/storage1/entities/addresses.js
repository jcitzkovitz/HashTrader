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
let addresses = class addresses {
};
__decorate([
    typeorm_1.Column("binary", {
        nullable: false,
        length: 16,
        primary: true,
        name: "id"
    }),
    __metadata("design:type", Buffer)
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
    typeorm_1.Column("varchar", {
        nullable: false,
        length: 5,
        name: "coinTicker"
    }),
    __metadata("design:type", String)
], addresses.prototype, "coinTicker", void 0);
addresses = __decorate([
    typeorm_1.Entity("addresses", { schema: "hashtrader_storage1" })
], addresses);
exports.addresses = addresses;
//# sourceMappingURL=addresses.js.map