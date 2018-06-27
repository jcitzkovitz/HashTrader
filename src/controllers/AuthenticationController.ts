import {
    Controller, Param, Body, Get, Post, Put, Delete, JsonController, HeaderParam,
    NotFoundError, UnauthorizedError
} from "routing-controllers";
import {UserRepo} from "../repositories/UserRepository";
import {users}  from "../entities/users";
import {error} from "util";
import * as appConfig from "../common/app-config";
import {Hashing} from "../common/hashing";
import {ResponseModel} from "../models/HelperModels";

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
    async login(@Body() body: any){
        try{
            //Get the user with the correct username
            console.log(body);
            let user = await this.userRepo.getAll({username: body.username});
            if(user.length != 1)
                throw new NotFoundError('The user was not found in the database');
            //Decrypt the sent password

            //Check that the password hashes are correct
            if(!(user[0].passwordHash === this.hashing.hash(body.password,user[0].salt)))
                throw new UnauthorizedError('The password entered is invalid');

            //Generate a google token and check if it matches with the system ID SET UP
            if(user[0].googleAuth !== null){
                let googleTok = this.auth.generateToken(user[0].googleAuth);
                if(this.auth.verifyToken(user[0].googleAuth,googleTok).delta != 0)
                    throw new UnauthorizedError('The Google Authenticator was not validated');
            }

            let jsonToken = this.jwt.sign({id: user[0].id},appConfig.secret,{
                expiresIn: '8h', algorithm: 'HS256'
            });

            return new ResponseModel(true,'Login succesful',{id: user[0].id, token: jsonToken});
        } catch (err){
            return new ResponseModel(false,"Login failed: " + err.message,null);
        }
    }

    @Get("/logout")
    logout(){

    }

}