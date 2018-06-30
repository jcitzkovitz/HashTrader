import "reflect-metadata";
import {ConnectionOptions} from "typeorm";

export let dbOptionsExchange: ConnectionOptions = {
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

export let dbOptionsStorage1: ConnectionOptions = {
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

export let secret1 = 'brodeur3081martin';
export let secret2 = 'martin8130brodeur';
export let secret3 = 'poopityscoopittypoop';