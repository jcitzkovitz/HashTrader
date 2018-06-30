"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
exports.dbOptionsExchange = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Jcrocks8181",
    database: "hashtrader_exchange",
    entities: [
        "./dist/echange/entities/*.js"
    ],
    synchronize: true,
};
exports.dbOptionsStorage1 = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Jcrocks8181",
    database: "hashtrader_storage1",
    entities: [
        "./dist/storage1/entities/*.js"
    ],
    synchronize: true,
};
exports.secret1 = 'brodeur3081martin';
exports.secret2 = 'martin8130brodeur';
exports.secret3 = 'poopityscoopittypoop';
//# sourceMappingURL=app-config.js.map