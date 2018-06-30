import * as express from 'express';
import * as bodyParser from "body-parser";
import "reflect-metadata";
import {createConnection, Connection } from "typeorm";
import * as appConfig from "./common/app-config";
import {createExpressServer} from "routing-controllers";
import * as jwt from 'jsonwebtoken';

/**
 * Controllers (route handlers).
 */
import {UserController} from "./exchange/controllers/UserController";
import {AuthenticationController} from "./exchange/controllers/AuthenticationController";
import {CoinController} from "./exchange/controllers/CoinController";
import {MarketController} from "./exchange/controllers/MarketController";
import {OrderController} from "./exchange/controllers/OrderController";
import {PersonController} from "./exchange/controllers/PersonController";
import {TransactionController} from "./exchange/controllers/TransactionController";
import {WalletController} from "./exchange/controllers/WalletController";

/**
 * Create Express server.
 */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("port", process.env.PORT || 3000);
app.set('secret',appConfig.secret1);

/**
 * Create connection to DB using configuration provided in
 * appconfig file.
 */
createConnection(appConfig.dbOptionsExchange).then(async connection => {
    console.log("Connected to DB");
    createExpressServer({controllers:
    [UserController, AuthenticationController,CoinController,MarketController,
    OrderController,PersonController,TransactionController,WalletController]
    }).listen(3000);
}).catch(error => console.log("TypeORM connection error: ", error));

module.exports = app;
