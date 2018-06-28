"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseModel {
    // I initialize the Error subclass hack / intermediary class.
    constructor(success, message, response) {
        this.success = success;
        if (!success)
            message = (new Error(message)).stack;
        this.message = message;
        this.response = response;
    }
}
exports.ResponseModel = ResponseModel;
//# sourceMappingURL=HelperModels.js.map