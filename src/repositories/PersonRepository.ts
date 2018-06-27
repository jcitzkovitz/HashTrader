import {people} from "../entities/people";
import {getConnection, getRepository} from "typeorm";

export class PersonRepo{
    getAll(select?:any, where?:any){
        return getRepository(people).find({
            select: select,
            where: where});
    }

    getOne(userId:number){
        return getRepository(people).find({where:{userId:userId}});
    }

    savePerson(person: people){
        return getRepository(people).save(person);
    }

    updatePerson(userId:number, person: people){
        return getConnection().createQueryBuilder().update(people).set(person).where("userId = :userId", {userId: userId}).execute();
    }
}