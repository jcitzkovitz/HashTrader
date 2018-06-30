import {people} from "../entities/people";
import {getConnection, getRepository} from "typeorm";

export class PersonRepo{
    getAll(selectWhere:any){
        return getRepository(people).find(selectWhere);
    }

    getOne(userId:number){
        return getRepository(people).createQueryBuilder("person").innerJoin("person.user","user").where("user.id = :userId",{userId:userId}).getOne();
    }

    savePerson(person: people){
        return getRepository(people).save(person);
    }

    updatePerson(userId:number, person: people){
        return getRepository(people).createQueryBuilder("person").innerJoin("person.user","user").where("user.id = :userId",{userId:userId}).update().set(person);
    }
}