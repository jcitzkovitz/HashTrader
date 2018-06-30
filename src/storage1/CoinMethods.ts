export class Coin{
    coin:any;
    constructor(ticker:string){
        if(ticker === 'BTC') this.coin = new btc();
        else if(ticker === 'LTC') this.coin = new ltc();
        else if(ticker === 'DODGE') this.coin = new dodge();
    }
}

class btc {
    getBalance(address:string){

    }
    generateAddress(){

    }
    sendTo(toAddress:string,fromAddress:string,amount:number){

    }
    receiveFrom(fromAddress:string,toAddress:string,amount:number){

    }
}
class ltc {
    getBalance(address:string){

    }
    generateAddress(){

    }
    sendTo(toAddress:string,fromAddress:string,amount:number){

    }
    receiveFrom(fromAddress:string,toAddress:string,amount:number){

    }
}
class dodge {
    getBalance(address:string){

    }
    generateAddress(){

    }
    sendTo(toAddress:string,fromAddress:string,amount:number){

    }
    receiveFrom(fromAddress:string,toAddress:string,amount:number){

    }
}