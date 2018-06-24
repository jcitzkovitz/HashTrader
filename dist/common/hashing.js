"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class Hashing {
    saltGenerator(length) {
        return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
    }
    hash(password, salt) {
        let hash = crypto.createHmac('sha512', salt);
        hash.update(password);
        return hash.digest('hex');
    }
}
exports.Hashing = Hashing;
//# sourceMappingURL=hashing.js.map