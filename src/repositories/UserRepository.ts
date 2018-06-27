import {users} from "../entities/users";
import {getConnection, getRepository} from "typeorm";
import {SelectWhereModel} from "../models/HelperModels";

export class UserRepo{

    getAll(selectWhere?:SelectWhereModel){
        return getRepository(users).find({
            select: selectWhere.select,
            where: selectWhere.where});
    }

    getOne(id:number){
        return getRepository(users).findOne({where:{id: id}});
    }

    checkUsername(username:string){
        return getRepository(users).findOne(
            {
                select:["username"],
                where: {username: username}
            });
    }

    registerUser(user: users){
        return getRepository(users).save(user);
    }

    updateUser(id:number, user: users){
        return getConnection().createQueryBuilder().update(users).set(user).where("id = :id", {id: id}).execute();
    }

    updatePassword(id:number, data: any){
        return getConnection().createQueryBuilder().update(users).set({passwordHash: data.passwordHash, salt: data.salt}).where("id = :id", {id: id}).execute();
    }

    deleteUser(id: number){
        return getConnection().createQueryBuilder().delete().from(users).where("id = :id", {id: id}).execute();
    }

    getId(username: string){
        return getRepository(users).find({select:["id"],where:{username:username}});
    }

}