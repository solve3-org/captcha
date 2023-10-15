"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = void 0;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["NONE"] = 0] = "NONE";
    ErrorCode[ErrorCode["INVALID_INPUT"] = 1] = "INVALID_INPUT";
    ErrorCode[ErrorCode["UNSUPPORTED_NETWORK"] = 2] = "UNSUPPORTED_NETWORK";
    ErrorCode[ErrorCode["INVALID_SIGNATURE"] = 3] = "INVALID_SIGNATURE";
    ErrorCode[ErrorCode["INVALID_SIGNATURE_STRING"] = 4] = "INVALID_SIGNATURE_STRING";
    ErrorCode[ErrorCode["SESSION_EXPIRED"] = 5] = "SESSION_EXPIRED";
    ErrorCode[ErrorCode["INVALID_REQUEST"] = 6] = "INVALID_REQUEST";
    ErrorCode[ErrorCode["INVALID_SOLUTION"] = 7] = "INVALID_SOLUTION";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
