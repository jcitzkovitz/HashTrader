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

    @Post("/:id/getPerson")
    async getPerson(@Param("id") id:number){
        try{
            let response = await this.personRepo.getOne(id);
            return new ResponseModel(true,'The person was found succesfully',response)
        }catch(err){
            return new ResponseModel(false,'The person could not be found: '+err.message,null);
        }
    }

    @Post("/")
    async savePerson(@Body() person: people){
        try{
            let response = await this.personRepo.savePerson(person);
            return new ResponseModel(true,'The person was saved succesfully',response);
        }catch(err){
            return new ResponseModel(false,'The person could not be saved: '+err.message,null);
        }
    }

    @Put("/:id")
    async updatePerson(@Param("id") id: number, @Body() person: people){
        try{
            let response = await this.personRepo.updatePerson(id,person);
            return new ResponseModel(true,'The person has been updated succesfully',response);
        }catch(err){
            return new ResponseModel(false,'The person could not be updated: '+err.message,null);
        }
    }
}