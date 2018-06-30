"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const transactions_1 = require("../entities/transactions");
class TransactionRepo {
    getAllTransactions(selectWhere) {
        return typeorm_1.getRepository(transactions_1.transactions).find(selectWhere);
    }
    saveTransation(transaction) {
        typeorm_1.getRepository(transactions_1.transactions).save(transaction);
    }
}
exports.TransactionRepo = TransactionRepo;
//# sourceMappingURL=TransactionRepository.js.map