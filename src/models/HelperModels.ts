
export class ResponseModel{
    public success: boolean;
    public message: string;
    public response: any;

    // I initialize the Error subclass hack / intermediary class.
    constructor( success:boolean, message:string, response:any ) {

        this.success = success;
        if(!success) message = (new Error(message)).stack;
        this.message = message;
        this.response = response;

    }
}

export interface BalanceChangeModel{
    userId:number,
    coinId:number,
    change: string,
    value: number
}

export interface WithdrawDepositModel{
    id?:number,
    username?:string,
    password?:string,
    googleAuth?:number,
    coinId:number,
    value:number,
    withdrawalLimit?:number,
    sendToAddress?:string,
    fee?:number;
}

export interface AuthenticationModel{
    username:string,
    password:string,
    googleAuth:number
}

export interface UpdateOrderModel{
    id: number,
    status: string,
    amount: number
}