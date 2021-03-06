import * as jwt from 'jsonwebtoken'
import * as appConfig from "../common/app-config"
import {UserRepo} from "../exchange/repositories/UserRepository";
import {users} from "../exchange/entities/users";
import {ResponseModel} from "../models/HelperModels";

const userRepo: UserRepo = new UserRepo();
export function verify(request: any, response: any, next?: (err?:any) => any): any {
     let token = request.headers['x-access-token'];
     if(!token) return response.status(401).send({success: false, message: 'No token provided'});
     try{
         jwt.verify(token,appConfig.secret1, { algorithms: ['HS256'] }, async (err:any,decoded:any) => {
             try{
                 if(err) return response.status(500).send({success: false, message: 'Failed to authenticate token'});
                 let user = await userRepo.getOne(decoded.id);
                 if(!user) return response.status(404).send({success: false, message: 'User not found'});
                 next();
             }catch(repoErr){
                 return new ResponseModel(false,'The user could not be authenticated',null);
             }
         });
     }catch(err){
         return new ResponseModel(false,'The token could not be authenticated',null);
     }
}
