import * as crypto from "crypto";

export class Hashing {
    public saltGenerator(length: number){
        return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
    }

     public hash(password: string, salt: string){
        let hash = crypto.createHmac('sha512',salt);
        hash.update(password);
        return hash.digest('hex');
    }
}