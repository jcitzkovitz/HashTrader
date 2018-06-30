import {AddressRepo} from "../repositories/AddressRepository";
import {Coin} from "../CoinMethods";
import * as uuid from "uuid"
import {addresses} from "../entities/addresses";
import {ResponseModel} from "../../models/HelperModels";
export class Storage1AddressController{

    addressRepo: AddressRepo = new AddressRepo();

    async generateAddress(ticker:string){
        try{
            //Get the coin we are to make the transaction with
            let coin = (new Coin(ticker)).coin;

            //Get all addresses for ticker and see if a new address is needed
            let coinAddresses = await this.addressRepo.getAddressesFor(ticker);

            let tempAddress;

            //***** GENERATE NEW COIN ADDRESS CRITERIA ******
            //If a new coin address is needed, generate one
            tempAddress = coin.generateAddress();

            //Otherwise store the new address for the user with an existing coin address
            //***** ADDRESS SELECTION PROCESS *****

            //Generate a salt for the coin address and hash it
            let salt = '';

            let id = Buffer.from(parseInt(uuid().replace("-",""),16).toString(2));
            let address: addresses = {
                id: id,
                addressHash: tempAddress,
                salt: salt,
                coinTicker:ticker
            };
            await this.addressRepo.saveAddress(address);
            return new ResponseModel(true,'The address has been generated succesfully',tempAddress);
        }catch(err){
            return new ResponseModel(false,'The address could not be saved nor generated: '+err,null);
        }
    }
    async getAddress(uuid:number){
        try{
            //unhash address
            let address = await this.addressRepo.getAddress(uuid);
            return address;
        }catch(err){
            console.log(err)
        }
    }

    async getBalanceForAddress(uuid:number){
        try{
            //unhash address
            let address = await this.addressRepo.getAddress(uuid);
            let coin = (new Coin(address.coinTicker)).coin;
            return coin.getBalance(address);
        }catch(err){
            console.log(err);
        }
    }

    async sendCoinsTo(address:string,uuid:number,amount:number){
        try{
            //unhash address
            let localAddress = await this.addressRepo.getAddress(uuid);
            let coin = (new Coin(localAddress.coinTicker)).coin;
            return coin.sendTo(address,localAddress,amount);
        }catch(err){
            console.log(err);
        }
    }

    async receiveCoinsFrom(address:string,uuid:number,amount:number){
        try{
            //unhash address
            let localAddress = await this.addressRepo.getAddress(uuid);
            let coin = (new Coin(localAddress.coinTicker)).coin;
            return coin.receiveFrom(address,localAddress,amount);
        }catch(err){
            console.log(err);
        }
    }
}