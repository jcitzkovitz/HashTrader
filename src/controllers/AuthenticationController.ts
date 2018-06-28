import {
    Controller, Param, Body, Get, Post, Put, Delete, JsonController, HeaderParam,
    NotFoundError, UnauthorizedError
} from "routing-controllers";
import {UserRepo} from "../repositories/UserRepository";
import {users}  from "../entities/users";
import {error} from "util";
import * as appConfig from "../common/app-config";
import {Hashing} from "../common/hashing";
import {AuthenticationModel, ResponseModel} from "../models/HelperModels";

@JsonController("/auth")
export class AuthenticationController {

    userRepo: UserRepo = new UserRepo();
    auth = require('authenticator');
    jwt = require('jsonwebtoken');
    hashing: Hashing = new Hashing();

    @Post("/register")
    async registerUser(@Body() body: any) {
        let user: users = new users();
        user.username = body.username;
        user.phoneNumber = body.phoneNumber;
        user.type = body.type;
        user.email = body.email;
        user.salt = this.hashing.saltGenerator(16);
        user.passwordHash = this.hashing.hash(body.password,user.salt);
        try{
            let newUser = await this.userRepo.registerUser(user);
            let id =  await this.userRepo.getId(newUser.username,newUser.passwordHash);
            return new ResponseModel(true,'Registration Succesful',id);
        } catch(err){
            return new ResponseModel(false,'Registration failed: '+err.message,null);
        }
    }

    @Post("/login")
     async login(@Body() body: AuthenticationModel){
        try{
            let userId = await this.authenticateUser(body,["id"]);
            let jsonToken = this.jwt.sign({id: userId},appConfig.secret,{
                expiresIn: '8h', algorithm: 'HS256'
            });

            return new ResponseModel(true,'Login succesful',{id: userId, token: jsonToken});
        } catch (err){
            return new ResponseModel(false,"Login failed: " + err.message,null);
        }
    }

    async authenticateUser(userInfo:AuthenticationModel,returnInfo:string[]){
        //Get the user with the correct username
        let user = await this.userRepo.getAll({select:returnInfo,where:{username: userInfo.username}});
        if(user.length != 1)
            throw new NotFoundError('The user was not found in the database');
        //Decrypt the sent password

        //Check that the password hashes are correct
        if(!(user[0].passwordHash === this.hashing.hash(userInfo.password,user[0].salt)))
            throw new UnauthorizedError('The password entered is invalid');

        //Generate a google token and check if it matches with the system ID SET UP
        if(user[0].googleAuth !== null){
            let googleTok = this.auth.generateToken(user[0].googleAuth);
            if(this.auth.verifyToken(userInfo.googleAuth,googleTok) != 0)
                throw new UnauthorizedError('The Google Authenticator was not validated');
        }
        return user[0];
    }

    @Get("/logout")
    logout(){

    }

}