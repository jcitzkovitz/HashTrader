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
const addresses_1 = require("../entities/addresses");
const typeorm_1 = require("typeorm");
const appConfig = require("../../common/app-config");
class AddressRepo {
    saveAddress(address) {
        return __awaiter(this, void 0, void 0, function* () {
            let connection = yield typeorm_1.createConnection(appConfig.dbOptionsStorage1);
            yield connection.getRepository(addresses_1.addresses).save(address);
            connection.close();
        });
    }
    getAddress(uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            let connection = yield typeorm_1.createConnection(appConfig.dbOptionsStorage1);
            let address = yield connection.getRepository(addresses_1.addresses).findOne({ where: { id: uuid } });
            connection.close();
            return address;
        });
    }
    getAddressesFor(ticker) {
        return __awaiter(this, void 0, void 0, function* () {
            let connection = yield typeorm_1.createConnection(appConfig.dbOptionsStorage1);
            let addressesFor = yield connection.getRepository(addresses_1.addresses).find({ where: { coinTicker: ticker } });
            connection.close();
            return addressesFor;
        });
    }
}
exports.AddressRepo = AddressRepo;
//# sourceMappingURL=AddressRepository.js.map