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
const appConfig = require("../common/app-config");
const hashing_1 = require("../common/hashing");
const HelperModels_1 = require("../models/HelperModels");
let AuthenticationController = class AuthenticationController {
    constructor() {
        this.userRepo = new UserRepository_1.UserRepo();
        this.auth = require('authenticator');
        this.jwt = require('jsonwebtoken');
        this.hashing = new hashing_1.Hashing();
    }
    registerUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = new users_1.users();
            user.username = body.username;
            user.phoneNumber = body.phoneNumber;
            user.type = body.type;
            user.email = body.email;
            user.salt = this.hashing.saltGenerator(16);
            user.passwordHash = this.hashing.hash(body.password, user.salt);
            try {
                let newUser = yield this.userRepo.registerUser(user);
                let id = yield this.userRepo.getId(newUser.username, newUser.passwordHash);
                return new HelperModels_1.ResponseModel(true, 'Registration Succesful', id);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'Registration failed: ' + err.message, null);
            }
        });
    }
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userId = yield this.authenticateUser(body, ["id"]);
                let jsonToken = this.jwt.sign({ id: userId }, appConfig.secret, {
                    expiresIn: '8h', algorithm: 'HS256'
                });
                return new HelperModels_1.ResponseModel(true, 'Login succesful', { id: userId, token: jsonToken });
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, "Login failed: " + err.message, null);
            }
        });
    }
    authenticateUser(userInfo, returnInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            //Get the user with the correct username
            let user = yield this.userRepo.getAll({ select: returnInfo, where: { username: userInfo.username } });
            if (user.length != 1)
                throw new routing_controllers_1.NotFoundError('The user was not found in the database');
            //Decrypt the sent password
            //Check that the password hashes are correct
            if (!(user[0].passwordHash === this.hashing.hash(userInfo.password, user[0].salt)))
                throw new routing_controllers_1.UnauthorizedError('The password entered is invalid');
            //Generate a google token and check if it matches with the system ID SET UP
            if (user[0].googleAuth !== null) {
                let googleTok = this.auth.generateToken(user[0].googleAuth);
                if (this.auth.verifyToken(userInfo.googleAuth, googleTok) != 0)
                    throw new routing_controllers_1.UnauthorizedError('The Google Authenticator was not validated');
            }
            return user[0];
        });
    }
    logout() {
    }
};
__decorate([
    routing_controllers_1.Post("/register"),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "registerUser", null);
__decorate([
    routing_controllers_1.Post("/login"),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "login", null);
__decorate([
    routing_controllers_1.Get("/logout"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthenticationController.prototype, "logout", null);
AuthenticationController = __decorate([
    routing_controllers_1.JsonController("/auth")
], AuthenticationController);
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=AuthenticationController.js.map