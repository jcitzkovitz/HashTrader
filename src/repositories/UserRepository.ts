import {users} from "../entities/users";
import {getConnection, getRepository} from "typeorm";

export class UserRepo{

    getAll(selectWhere?:any){
        return getRepository(users).find(selectWhere);
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
        return getRepository(users).createQueryBuilder().update().set(user).where("id = :id", {id: id}).execute();
    }

    updatePassword(id:number, data: any){
        return getRepository(users).createQueryBuilder().update().set({passwordHash: data.passwordHash, salt: data.salt}).where("id = :id", {id: id}).execute();
    }

    deleteUser(id: number){
        return getRepository(users).createQueryBuilder().delete().where("id = :id", {id: id}).execute();
    }

    getId(username: string,passwordHash: string){
        return getRepository(users).find({select:["id"],where:{username:username,passwordHash:passwordHash}});
    }

}