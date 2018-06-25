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
const express = require("express");
const bodyParser = require("body-parser");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const appConfig = require("./common/app-config");
const routing_controllers_1 = require("routing-controllers");
/**
 * Controllers (route handlers).
 */
const UserController_1 = require("./controllers/UserController");
const AuthenticationController_1 = require("./controllers/AuthenticationController");
/**
 * Create Express server.
 */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("port", process.env.PORT || 3000);
app.set('secret', appConfig.secret);
/**
 * Create connection to DB using configuration provided in
 * appconfig file.
 */
typeorm_1.createConnection(appConfig.dbOptions).then((connection) => __awaiter(this, void 0, void 0, function* () {
    console.log("Connected to DB");
    routing_controllers_1.createExpressServer({ controllers: [UserController_1.UserController, AuthenticationController_1.AuthenticationController]
    }).listen(3000);
})).catch(error => console.log("TypeORM connection error: ", error));
module.exports = app;
//# sourceMappingURL=app.js.map