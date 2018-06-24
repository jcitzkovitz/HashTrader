import "reflect-metadata";
import {ConnectionOptions} from "typeorm";

export let dbOptions: ConnectionOptions = {
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

export let secret = 'brodeur3081martin';