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
const UserRepository_1 = require("../repositories/UserRepository");
const users_1 = require("../entities/users");
const token_guard_1 = require("../middlewares/token-guard");
const hashing_1 = require("../common/hashing");
const HelperModels_1 = require("../models/HelperModels");
let UserController = class UserController {
    constructor() {
        this.userRepo = new UserRepository_1.UserRepo();
        this.crypto = require('crypto');
        this.auth = require('authenticator');
        this.jwt = require('jsonwebtoken');
        this.hashing = new hashing_1.Hashing();
    }
    checkUsernameAvail(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let chosenUsername = yield this.userRepo.checkUsername(username);
                if (chosenUsername)
                    return new HelperModels_1.ResponseModel(false, 'This username has already been selected', null);
                return new HelperModels_1.ResponseModel(true, 'This username is all yours!', null);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'There was an error while looking for usernames: ' + err.message, null);
            }
        });
    }
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield this.userRepo.updateUser(id, user);
                return new HelperModels_1.ResponseModel(true, 'The user was succesfully updated', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The user could not be updated: ' + err.message, null);
            }
        });
    }
    updatePassword(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            let salt = this.hashing.saltGenerator(16);
            try {
                let user = yield this.userRepo.getOne(id);
                if (user.passwordHash !== this.hashing.hash(body.oldPassword, user.salt))
                    throw new routing_controllers_1.UnauthorizedError('The original password you have entered is invalid');
                let response = yield this.userRepo.updatePassword(id, { passwordHash: this.hashing.hash(body.newPassword, salt), salt: salt });
                return new HelperModels_1.ResponseModel(true, 'The password has been succesfully updated', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The password could not be updated: ' + err.message, null);
            }
        });
    }
    setGoogleAuth(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.userRepo.getOne(id);
                //Set google auth
                user.googleAuth = body.code;
                let response = yield this.userRepo.updateUser(id, user);
                return new HelperModels_1.ResponseModel(true, 'The google auth was succesfully updated', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The google auth could not be updated: ' + err.message, null);
            }
        });
    }
    setPPPhoto(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.userRepo.getOne(id);
                //Set file system storage directory hash
                user.passport = body.image;
                let response = yield this.userRepo.updateUser(id, user);
                return new HelperModels_1.ResponseModel(true, 'The ppp status was succesfully updated', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The ppp status could not be updated: ' + err.message, null);
            }
        });
    }
    setWPPPhoto(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.userRepo.getOne(id);
                //Set file system storage directory hash
                user.photoWPassport = body.image;
                let response = yield this.userRepo.updateUser(id, user);
                return new HelperModels_1.ResponseModel(true, 'The wpp status was succesfully updated', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The wpp status could not be updated: ' + err.message, null);
            }
        });
    }
    setDLPhoto(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.userRepo.getOne(id);
                //Set file system storage directory hash
                user.driversLicense = body.image;
                let response = yield this.userRepo.updateUser(id, user);
                return new HelperModels_1.ResponseModel(true, 'The dlp status was succesfully updated', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The dlp status could not be updated: ' + err.message, null);
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield this.userRepo.deleteUser(id);
                return new HelperModels_1.ResponseModel(true, 'The user was succesfully deleted', response);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The user could not be deleted: ' + err.message, null);
            }
        });
    }
};
__decorate([
    routing_controllers_1.Get("/checkUsername/:username"),
    __param(0, routing_controllers_1.Param("username")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "checkUsernameAvail", null);
__decorate([
    routing_controllers_1.Put("/:id"),
    __param(0, routing_controllers_1.Param("id")), __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, users_1.users]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    routing_controllers_1.Put("/:id/updatePW"),
    __param(0, routing_controllers_1.Param("id")), __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
__decorate([
    routing_controllers_1.Put("/:id/setGA"),
    __param(0, routing_controllers_1.Param("id")), __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setGoogleAuth", null);
__decorate([
    routing_controllers_1.Put("/:id/setPP"),
    __param(0, routing_controllers_1.Param("id")), __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setPPPhoto", null);
__decorate([
    routing_controllers_1.Put("/:id/setWPP"),
    __param(0, routing_controllers_1.Param("id")), __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setWPPPhoto", null);
__decorate([
    routing_controllers_1.Put("/:id/setDLP"),
    __param(0, routing_controllers_1.Param("id")), __param(1, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "setDLPhoto", null);
__decorate([
    routing_controllers_1.Delete("/:id"),
    __param(0, routing_controllers_1.Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    routing_controllers_1.JsonController("/users"),
    routing_controllers_1.UseBefore(token_guard_1.verify)
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map