"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const appConfig = require("../../common/app-config");
exports.verify = (token) => {
    if (!token)
        return { success: false, message: 'The token is missing' };
    jwt.verify(token, appConfig.secret, (err, decoded) => {
        console.log('ERROR: ' + err);
        console.log('DECODED: ' + decoded.id);
    });
};
//# sourceMappingURL=VerifyToken.js.map