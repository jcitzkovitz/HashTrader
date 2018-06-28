"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../entities/users");
const typeorm_1 = require("typeorm");
class UserRepo {
    getAll(selectWhere) {
        return typeorm_1.getRepository(users_1.users).find(selectWhere);
    }
    getOne(id) {
        return typeorm_1.getRepository(users_1.users).findOne({ where: { id: id } });
    }
    checkUsername(username) {
        return typeorm_1.getRepository(users_1.users).findOne({
            select: ["username"],
            where: { username: username }
        });
    }
    registerUser(user) {
        return typeorm_1.getRepository(users_1.users).save(user);
    }
    updateUser(id, user) {
        return typeorm_1.getConnection().createQueryBuilder().update(users_1.users).set(user).where("id = :id", { id: id }).execute();
    }
    updatePassword(id, data) {
        return typeorm_1.getConnection().createQueryBuilder().update(users_1.users).set({ passwordHash: data.passwordHash, salt: data.salt }).where("id = :id", { id: id }).execute();
    }
    deleteUser(id) {
        return typeorm_1.getConnection().createQueryBuilder().delete().from(users_1.users).where("id = :id", { id: id }).execute();
    }
    getId(username, passwordHash) {
        return typeorm_1.getRepository(users_1.users).find({ select: ["id"], where: { username: username, passwordHash: passwordHash } });
    }
}
exports.UserRepo = UserRepo;
//# sourceMappingURL=UserRepository.js.map