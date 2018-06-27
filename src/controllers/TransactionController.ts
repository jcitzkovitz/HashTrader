import {Body, Get, JsonController, Param, Post, UnauthorizedError, UseBefore} from "routing-controllers";
import {verify} from "../middlewares/token-guard";
import {WalletController} from "./WalletController";
import {AuthenticationController} from "./AuthenticationController";
import {
    AuthenticationModel, BalanceChangeModel, ResponseModel, SelectWhereModel,
    WithdrawDepositModel
} from "../models/HelperModels";
import {AddressRepo} from "../repositories/AddressRepository";
import {transactions} from "../entities/transactions";
import {UserRepo} from "../repositories/UserRepository";
import {TransactionRepo} from "../repositories/TransactionRepository";
@JsonController("/transaction")
@UseBefore(verify)
export class TransactionController{

    walletController: WalletController = new WalletController();
    authController: AuthenticationController = new AuthenticationController();
    addressRepo: AddressRepo = new AddressRepo();
    userRepo: UserRepo = new UserRepo();
    transactionRepo: TransactionRepo = new TransactionRepo();

    @Get("/:userId")
    async getAllTransactionsForUser(@Param("userId") userId:number){
        try{
            let selectWhere: SelectWhereModel = {select:[],where:{userId:userId}};
            let response = await this.transactionRepo.getAll(selectWhere);
            return new ResponseModel(true,'The transactions for this user have been selected',response);
        }catch(err){
            return new ResponseModel(false,'The transactions for this user could not be selected',null);
        }
    }

    @Get("/:userId/:coinId")
    async getAllTransactionsForUserWithCoin(@Param("userId") userId:number, @Param("coinId") coinId:number){
        try{
            let selectWhere: SelectWhereModel = {select:[],where:{userId:userId,coinId:coinId}};
            let response = await this.transactionRepo.getAll(selectWhere);
            return new ResponseModel(true,'The transactions for this user have been selected',response);
        }catch(err){
            return new ResponseModel(false,'The transactions for this user and coin could not be selected',null);
        }
    }

    @Get("/")
    async getAllTransactions(where?:any){
        try{
            //REQUIRES ADMIN AUTHENTICATION
            let selectWhere: SelectWhereModel = {select:[],where:where};
            let response = await this.transactionRepo.getAll(selectWhere);
            return new ResponseModel(true,'The transactions could not be selected',response);
        }catch(err){
            return new ResponseModel(false,'The transactions could not be selected',null);
        }
    }

    @Post("/withdraw")
    async makeWithdrawal(@Body() body:WithdrawDepositModel){
        try{
            //Authenticate user
            let auth: AuthenticationModel = {username:body.username,password:body.password,googleAuth:body.googleAuth};
            let user = await this.authController.authenticateUser(auth,["id","withdrawalLimit"]);

            //Check if the withdrawal amount is below the users limit
            if(body.value > user.withdrawalLimit) throw new UnauthorizedError("The user cannot withdraw an amount greater than their stated limit");

            //Change the users balance
            let balanceChange: BalanceChangeModel = {userId: userId, coinId:body.coinId, change: "SUB",value:body.value};
            let updatedBalanceResponse = await this.walletController.updateBalanceForCoin(balanceChange);

            //Send money to selected address
            let fromAddressHash = await this.addressRepo.getInfoForCoin(updatedBalanceResponse.walletId,body.coinId,["addressHash"]);
            //****GET ADDR FROM OTHER DB****
            //****SEND MONEY TO GIVEN ADDR****
            let txid = '';

            let transaction:transactions = {
                txid: txid,
                status: "PENDING",
                amount:body.value,
                fee: body.fee,
                dateTime: new Date(),
                userId: user.id,
                coin: body.coinId,
                type: "WITHDRAWAL"
            };

            let response;

            return new ResponseModel(true,'The transaction was successful',response);
        }catch(err){
            return new ResponseModel(false,'The transaction could not go through: '+err.message,null);
        }
    }

    @Post("/deposit")
    async makeDeposit(@Body() body:WithdrawDepositModel){
        try{
            //Get userId
            let userId = this.userRepo.getOne(body.id);

            //Change the users balance
            let balanceChange: BalanceChangeModel = {userId: userId, coinId:body.coinId, change: "SUB",value:body.value};
            let updatedBalanceResponse = await this.walletController.updateBalanceForCoin(balanceChange);

            //Get money from selected address
            let toAddressHash = await this.addressRepo.getInfoForCoin(updatedBalanceResponse.walletId,body.coinId,["addressHash"]);
            //****GET ADDR FROM OTHER DB****
            //****SEND MONEY TO DB ADDR****
            let txid = '';

            let transaction:transactions = {
                txid: txid,
                status: "PENDING",
                amount:body.value,
                dateTime: new Date(),
                userId: user.id,
                coin: body.coinId,
                type: "DEPOSIT"
            };

            let response;
            return new ResponseModel(true,'The transaction was successful',response);
        }catch(err){
            return new ResponseModel(false,'The transaction could not go through: '+err.message,null);
        }
    }

}