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

@JsonController("/users")
@UseBefore(verify)
export class UserController {

    userRepo: UserRepo = new UserRepo();
    crypto = require('crypto');
    auth = require('authenticator');
    jwt = require('jsonwebtoken');
    hashing: Hashing = new Hashing();

    @Post("/")
    async getAll(@Body() where: any){
        try{
            return await this.userRepo.getAll(where);
        } catch (err){
            return {success: false, message: err.name + ": " + err.message};
        }
    }

    @Get("/checkUsername/:username")
    async checkUsernameAvail(@Param("username") username:string){
        try{
            let chosenUsername: any = await this.userRepo.checkUsername(username);
            if(chosenUsername)  return {success: false, message: 'That username has already been selected!'};
            return {success: true, message: "Username is good!"};
        } catch(err){
            return {success: false, message: err.name + ": " + err.message};
        }
    }


    @Put("/:id")
    async updateUser(@Param("id") id:number, @Body() user: users) {
        try{
            return await this.userRepo.updateUser(id,user);
        } catch(err){
            return {success: false, message: err.name + ": " + err.message};
        }
    }

    @Put("/:id/updatePW")
    async updatePassword(@Param("id") id:number, @Body() body:any) {
        let salt = this.hashing.saltGenerator(16);
        try{
            let user = await this.userRepo.getOneWithId(id);
            if(user.passwordHash !== this.hashing.hash(body.oldPassword,user.salt))
                throw new UnauthorizedError('The original password you have entered is invalid');

            return await this.userRepo.updatePassword(id,{passwordHash: this.hashing.hash(body.newPassword,salt), salt: salt});
        } catch(err){
            return {success: false, message: err.name + ": " + err.message};
        }
    }

    @Put("/:id/setGA")
    async setGoogleAuth(@Param("id") id:number, @Body() body: any){

        try{
            let user = await this.userRepo.getOneWithId(id);
            //Set google auth
            user.googleAuth = body.code;
            return await this.userRepo.updateUser(id,user);

        }catch(err){
            return {success: false, message: err.name + ": " + err.message};
        }
    }

    @Put("/:id/setPP")
    async setPPPhoto(@Param("id") id:number, @Body() body: any){

        try{
            let user = await this.userRepo.getOneWithId(id);
            //Set file system storage directory hash
            user.passport = body.image;
            return await this.userRepo.updateUser(id,user);
        }catch(err){
            return {success: false, message: err.name + ": " + err.message};
        }
    }

    @Put("/:id/setWPP")
    async setWPPPhoto(@Param("id") id:number, @Body() body: any){

        try{
            let user = await this.userRepo.getOneWithId(id);
            //Set file system storage directory hash
            user.photoWPassport = body.image;
            return await this.userRepo.updateUser(id,user);
        }catch(err){
            return {success: false, message: err.name + ": " + err.message};
        }
    }

    @Put("/:id/setDLP")
    async setDLPhoto(@Param("id") id:number, @Body() body: any){
        try{
            let user = await this.userRepo.getOneWithId(id);
            //Set file system storage directory hash
            user.driversLicense = body.image;
            return await this.userRepo.updateUser(id,user);
        }catch(err){
            return {success: false, message: err.name + ": " + err.message};
        }
    }

    @Delete("/:id")
    async deleteUser(@Param("id") id:number) {
        try{
            return await this.userRepo.deleteUser(id);
        }catch(err){
            return {success: false, message: err.name + ": " + err.message};
        }
    }
}