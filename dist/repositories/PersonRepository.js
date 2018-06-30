"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const people_1 = require("../entities/people");
const typeorm_1 = require("typeorm");
class PersonRepo {
    getAll(selectWhere) {
        return typeorm_1.getRepository(people_1.people).find(selectWhere);
    }
    getOne(userId) {
        return typeorm_1.getRepository(people_1.people).createQueryBuilder("person").innerJoin("person.user", "user").where("user.id = :userId", { userId: userId }).getOne();
    }
    savePerson(person) {
        return typeorm_1.getRepository(people_1.people).save(person);
    }
    updatePerson(userId, person) {
        return typeorm_1.getRepository(people_1.people).createQueryBuilder("person").innerJoin("person.user", "user").where("user.id = :userId", { userId: userId }).update().set(person);
    }
}
exports.PersonRepo = PersonRepo;
//# sourceMappingURL=PersonRepository.js.map