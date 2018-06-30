import {addresses} from "../entities/addresses";
import {createConnection} from "typeorm";
import * as appConfig from "../../common/app-config";
import {ResponseModel} from "../../models/HelperModels";
export class AddressRepo{
    async saveAddress(address:addresses){
        let connection = await createConnection(appConfig.dbOptionsStorage1);
        await connection.getRepository(addresses).save(address);
        connection.close();
    }
    async getAddress(uuid:number){
        let connection = await createConnection(appConfig.dbOptionsStorage1);
        let address:any =  await connection.getRepository(addresses).findOne({where:{id:uuid}});
        connection.close();
        return address
    }
    async getAddressesFor(ticker:string){
        let connection = await createConnection(appConfig.dbOptionsStorage1);
        let addressesFor:any = await connection.getRepository(addresses).find({where:{coinTicker:ticker}});
        connection.close();
        return addressesFor;
    }
}