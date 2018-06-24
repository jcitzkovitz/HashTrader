import * as jwt from 'jsonwebtoken'
import * as appConfig from "../common/app-config"
import {UserRepo} from "../repositories/UserRepository";
import {users} from "../entities/users";

const userRepo: UserRepo = new UserRepo();
export function verify(request: any, response: any, next?: (err?:any) => any): any {
     let token = request.headers['x-access-token'];
     if(!token) return response.status(401).send({success: false, message: 'No token provided'});
     jwt.verify(token,appConfig.secret, { algorithms: ['HS256'] }, async (err:any,decoded:any) => {
         if(err) return response.status(500).send({success: false, message: 'Failed to authenticate token'});
         let user = await userRepo.getOneWithId(decoded.id);
         if(!user) return response.status(404).send({success: false, message: 'User not found'});
         next();
     });
}
