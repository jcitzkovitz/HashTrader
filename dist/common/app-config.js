"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
exports.dbOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Jcrocks8181",
    database: "hashtrader_exchange",
    entities: [
        "./dist/entities/*.js"
    ],
    synchronize: true,
};
exports.secret = 'brodeur3081martin';
//# sourceMappingURL=app-config.js.map