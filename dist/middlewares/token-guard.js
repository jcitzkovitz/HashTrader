"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const appConfig = require("../common/app-config");
const UserRepository_1 = require("../exchange/repositories/UserRepository");
const HelperModels_1 = require("../models/HelperModels");
const userRepo = new UserRepository_1.UserRepo();
function verify(request, response, next) {
    let token = request.headers['x-access-token'];
    if (!token)
        return response.status(401).send({ success: false, message: 'No token provided' });
    try {
        jwt.verify(token, appConfig.secret1, { algorithms: ['HS256'] }, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (err)
                    return response.status(500).send({ success: false, message: 'Failed to authenticate token' });
                let user = yield userRepo.getOne(decoded.id);
                if (!user)
                    return response.status(404).send({ success: false, message: 'User not found' });
                next();
            }
            catch (repoErr) {
                return new HelperModels_1.ResponseModel(false, 'The user could not be authenticated', null);
            }
        }));
    }
    catch (err) {
        return new HelperModels_1.ResponseModel(false, 'The token could not be authenticated', null);
    }
}
exports.verify = verify;
//# sourceMappingURL=token-guard.js.map