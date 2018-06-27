import {
    Controller, Param, Body, Get, Post, Put, Delete, JsonController, HeaderParams,
    HeaderParam, UseBefore, UnauthorizedError
} from "routing-controllers";
import {UserRepo} from "../repositories/UserRepository";
import {users}  from "../entities/users";
import {error} from "util";
import * as appConfig from "../common/app-config";
import {verify} from "../middlewares/token-guard";
import {Hashing} from "../common/hashing"
import {ResponseModel} from "../models/HelperModels";

@JsonController("/users")
@UseBefore(verify)
export class UserController {

    userRepo: UserRepo = new UserRepo();
    crypto = require('crypto');
    auth = require('authenticator');
    jwt = require('jsonwebtoken');
    hashing: Hashing = new Hashing();


    @Get("/checkUsername/:username")
    async checkUsernameAvail(@Param("username") username:string){
        try{
            let chosenUsername = await this.userRepo.checkUsername(username);
            if(chosenUsername)  return new ResponseModel(false,'This username has already been selected',null);
            return new ResponseModel(true,'This username is all yours!',null);
        } catch(err){
            return new ResponseModel(false,'There was an error while looking for usernames: '+err.message,null);
        }
    }


    @Put("/:id")
    async updateUser(@Param("id") id:number, @Body() user: users) {
        try{
            let response = await this.userRepo.updateUser(id,user);
            return new ResponseModel(true,'The user was succesfully updated',response);
        } catch(err){
            return new ResponseModel(false,'The user could not be updated: '+err.message,null);
        }
    }

    @Put("/:id/updatePW")
    async updatePassword(@Param("id") id:number, @Body() body:any) {
        let salt = this.hashing.saltGenerator(16);
        try{
            let user = await this.userRepo.getOne(id);
            if(user.passwordHash !== this.hashing.hash(body.oldPassword,user.salt))
                throw new UnauthorizedError('The original password you have entered is invalid');

            let response = await this.userRepo.updatePassword(id,{passwordHash: this.hashing.hash(body.newPassword,salt), salt: salt});
            return new ResponseModel(true,'The password has been succesfully updated',response)
        } catch(err){
            return new ResponseModel(false,'The password could not be updated: '+err.message,null);
        }
    }

    @Put("/:id/setGA")
    async setGoogleAuth(@Param("id") id:number, @Body() body: any){

        try{
            let user = await this.userRepo.getOne(id);
            //Set google auth
            user.googleAuth = body.code;
            let response = await this.userRepo.updateUser(id,user);
            return new ResponseModel(true,'The google auth was succesfully updated',response);

        }catch(err){
            return new ResponseModel(false,'The google auth could not be updated: '+err.message,null);
        }
    }

    @Put("/:id/setPP")
    async setPPPhoto(@Param("id") id:number, @Body() body: any){

        try{
            let user = await this.userRepo.getOne(id);
            //Set file system storage directory hash
            user.passport = body.image;
            let response = await this.userRepo.updateUser(id,user);
            return new ResponseModel(true,'The ppp status was succesfully updated',response);
        }catch(err){
            return new ResponseModel(false,'The ppp status could not be updated: '+err.message,null);
        }
    }

    @Put("/:id/setWPP")
    async setWPPPhoto(@Param("id") id:number, @Body() body: any){

        try{
            let user = await this.userRepo.getOne(id);
            //Set file system storage directory hash
            user.photoWPassport = body.image;
            let response = await this.userRepo.updateUser(id,user);
            return new ResponseModel(true,'The wpp status was succesfully updated',response);
        }catch(err){
            return new ResponseModel(false,'The wpp status could not be updated: '+err.message,null);
        }
    }

    @Put("/:id/setDLP")
    async setDLPhoto(@Param("id") id:number, @Body() body: any){
        try{
            let user = await this.userRepo.getOne(id);
            //Set file system storage directory hash
            user.driversLicense = body.image;
            let response = await this.userRepo.updateUser(id,user);
            return new ResponseModel(true,'The dlp status was succesfully updated',response);
        }catch(err){
            return new ResponseModel(false,'The dlp status could not be updated: '+err.message,null);
        }
    }

    @Delete("/:id")
    async deleteUser(@Param("id") id:number) {
        try{
            let response = await this.userRepo.deleteUser(id);
            return new ResponseModel(true,'The user was succesfully deleted',response);
        }catch(err){
            return new ResponseModel(false,'The user could not be deleted: '+err.message,null);
        }
    }
}