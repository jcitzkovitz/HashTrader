
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

export interface SelectWhereModel  {
    select: string[],
    where: any
}

export interface BalanceChangeModel{
    change: {"ADD","SUB"},
    value: number
}

export interface WithdrawDepositModel{
    coinId:number,
    value:number
}