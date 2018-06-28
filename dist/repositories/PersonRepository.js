"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const people_1 = require("../entities/people");
const typeorm_1 = require("typeorm");
class PersonRepo {
    getAll(select, where) {
        return typeorm_1.getRepository(people_1.people).find({
            select: select,
            where: where
        });
    }
    getOne(userId) {
        return typeorm_1.getRepository(people_1.people).find({ where: { userId: userId } });
    }
    savePerson(person) {
        return typeorm_1.getRepository(people_1.people).save(person);
    }
    updatePerson(userId, person) {
        return typeorm_1.getConnection().createQueryBuilder().update(people_1.people).set(person).where("userId = :userId", { userId: userId }).execute();
    }
}
exports.PersonRepo = PersonRepo;
//# sourceMappingURL=PersonRepository.js.map