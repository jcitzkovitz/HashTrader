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
let people = class people {
};
__decorate([
    typeorm_1.Column("int", {
        generated: true,
        nullable: false,
        primary: true,
        name: "id"
    }),
    __metadata("design:type", Number)
], people.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        nullable: false,
        length: 50,
        name: "firstName"
    }),
    __metadata("design:type", String)
], people.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        nullable: false,
        length: 50,
        name: "lastName"
    }),
    __metadata("design:type", String)
], people.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column("date", {
        nullable: false,
        name: "birthday"
    }),
    __metadata("design:type", String)
], people.prototype, "birthday", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        nullable: false,
        length: 50,
        name: "country"
    }),
    __metadata("design:type", String)
], people.prototype, "country", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        nullable: false,
        length: 50,
        name: "state"
    }),
    __metadata("design:type", String)
], people.prototype, "state", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        nullable: false,
        length: 10,
        name: "zip"
    }),
    __metadata("design:type", String)
], people.prototype, "zip", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        nullable: false,
        length: 50,
        name: "streetAddress"
    }),
    __metadata("design:type", String)
], people.prototype, "streetAddress", void 0);
__decorate([
    typeorm_1.Column("longblob", {
        nullable: true,
        name: "passportPhoto"
    }),
    __metadata("design:type", Buffer)
], people.prototype, "passportPhoto", void 0);
__decorate([
    typeorm_1.Column("longblob", {
        nullable: true,
        name: "photoWithPassport"
    }),
    __metadata("design:type", Buffer)
], people.prototype, "photoWithPassport", void 0);
__decorate([
    typeorm_1.Column("longblob", {
        nullable: true,
        name: "driversLicensePhoto"
    }),
    __metadata("design:type", Buffer)
], people.prototype, "driversLicensePhoto", void 0);
__decorate([
    typeorm_1.OneToMany(type => users_1.users, users => users.person, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], people.prototype, "userss", void 0);
people = __decorate([
    typeorm_1.Entity("people", { schema: "hashtrader_exchange" })
], people);
exports.people = people;
//# sourceMappingURL=people.js.map