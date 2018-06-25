import {
    Controller, Param, Body, Get, Post, Put, Delete, JsonController, HeaderParams,
    HeaderParam, UseBefore, UnauthorizedError
} from "routing-controllers";
import {error} from "util";
import * as appConfig from "../common/app-config";
import {verify} from "../middlewares/token-guard";
import {PersonRepo} from "../repositories/PersonRepository";
import {ResponseModel, SelectWhereModel} from "../models/HelperModels";
import {people} from "../entities/people";

@JsonController("/people")
@UseBefore(verify)
export class UserController {

    personRepo: PersonRepo = new PersonRepo();

    @Post("/getPeople")
    async getPeople(@Body() body:SelectWhereModel){
        try{
            return await this.personRepo.getAll(body.select,body.where)
        }catch(err){
            return {success: false, message: err.name + ": " + err.message};
        }
    }

    @Post("/")
    async savePerson(@Body() person: people){
        try{
            return await this.personRepo.savePerson(person)
        }catch(err){
            return {success: false, message: err.name + ": " + err.message};
        }
    }

    @Put("/:id")
    async updatePerson(@Param("userId") userId: number, @Body() person: people){
        try{
            return await this.personRepo.updatePerson(userId,person);
        }catch(err){
            return {success: false, message: err.name + ": " + err.message};
        }
    }
}