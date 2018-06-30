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
let employee = class employee {
};
__decorate([
    typeorm_1.Column("int", {
        generated: true,
        nullable: false,
        primary: true,
        name: "employeeId"
    }),
    __metadata("design:type", Number)
], employee.prototype, "employeeId", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        nullable: false,
        length: 100,
        name: "firstName"
    }),
    __metadata("design:type", String)
], employee.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        nullable: false,
        length: 100,
        name: "lastName"
    }),
    __metadata("design:type", String)
], employee.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column("varchar", {
        nullable: false,
        length: 100,
        name: "email"
    }),
    __metadata("design:type", String)
], employee.prototype, "email", void 0);
employee = __decorate([
    typeorm_1.Entity("employee", { schema: "hashtrader_exchange" })
], employee);
exports.employee = employee;
//# sourceMappingURL=employee.js.map