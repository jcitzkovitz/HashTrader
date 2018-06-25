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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const token_guard_1 = require("../middlewares/token-guard");
const PersonRepository_1 = require("../repositories/PersonRepository");
const people_1 = require("../entities/people");
let UserController = class UserController {
    constructor() {
        this.personRepo = new PersonRepository_1.PersonRepo();
    }
    getPeople(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.personRepo.getAll(body.select, body.where);
            }
            catch (err) {
                return { success: false, message: err.name + ": " + err.message };
            }
        });
    }
    savePerson(person) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.personRepo.savePerson(person);
            }
            catch (err) {
                return { success: false, message: err.name + ": " + err.message };
            }
        });
    }
    updatePerson(userId, person) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.personRepo.updatePerson(userId, person);
            }
            catch (err) {
                return { success: false, message: err.name + ": " + err.message };
            }
        });
    }
};
__decorate([
    routing_controllers_1.Post("/getPeople"),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getPeople", null);
__decorate([
    routing_controllers_1.Post("/"),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [people_1.people]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "savePerson", null);
__decorate([
    routing_controllers_1.Put("/:id"),
    __param(0, routing_controllers_1.Param("userId")), __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, people_1.people]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePerson", null);
UserController = __decorate([
    routing_controllers_1.JsonController("/people"),
    routing_controllers_1.UseBefore(token_guard_1.verify)
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=PersonController.js.map