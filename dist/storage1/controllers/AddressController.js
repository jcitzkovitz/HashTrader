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
const AddressRepository_1 = require("../repositories/AddressRepository");
const CoinMethods_1 = require("../CoinMethods");
const uuid = require("uuid");
const HelperModels_1 = require("../../models/HelperModels");
class Storage1AddressController {
    constructor() {
        this.addressRepo = new AddressRepository_1.AddressRepo();
    }
    generateAddress(ticker) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the coin we are to make the transaction with
                let coin = (new CoinMethods_1.Coin(ticker)).coin;
                //Get all addresses for ticker and see if a new address is needed
                let coinAddresses = yield this.addressRepo.getAddressesFor(ticker);
                let tempAddress;
                //***** GENERATE NEW COIN ADDRESS CRITERIA ******
                //If a new coin address is needed, generate one
                tempAddress = coin.generateAddress();
                //Otherwise store the new address for the user with an existing coin address
                //***** ADDRESS SELECTION PROCESS *****
                //Generate a salt for the coin address and hash it
                let salt = '';
                let id = Buffer.from(parseInt(uuid().replace("-", ""), 16).toString(2));
                let address = {
                    id: id,
                    addressHash: tempAddress,
                    salt: salt,
                    coinTicker: ticker
                };
                yield this.addressRepo.saveAddress(address);
                return new HelperModels_1.ResponseModel(true, 'The address has been generated succesfully', tempAddress);
            }
            catch (err) {
                return new HelperModels_1.ResponseModel(false, 'The address could not be saved nor generated: ' + err, null);
            }
        });
    }
    getAddress(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //unhash address
                let address = yield this.addressRepo.getAddress(uuid);
                return address;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getBalanceForAddress(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //unhash address
                let address = yield this.addressRepo.getAddress(uuid);
                let coin = (new CoinMethods_1.Coin(address.coinTicker)).coin;
                return coin.getBalance(address);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    sendCoinsTo(address, uuid, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //unhash address
                let localAddress = yield this.addressRepo.getAddress(uuid);
                let coin = (new CoinMethods_1.Coin(localAddress.coinTicker)).coin;
                return coin.sendTo(address, localAddress, amount);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    receiveCoinsFrom(address, uuid, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //unhash address
                let localAddress = yield this.addressRepo.getAddress(uuid);
                let coin = (new CoinMethods_1.Coin(localAddress.coinTicker)).coin;
                return coin.receiveFrom(address, localAddress, amount);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
exports.Storage1AddressController = Storage1AddressController;
//# sourceMappingURL=AddressController.js.map