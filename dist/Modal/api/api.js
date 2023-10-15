"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestProof = exports.requestCaptcha = exports.handshake = void 0;
const types_1 = require("../../types");
// @ts-ignore
const config_1 = require("./config");
const fetchApi = (method, body) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${config_1.API_URL}/${method}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body), // Convert the object to JSON
    });
    // Parse and return the response as JSON
    return response.json();
});
const handshake = (handshakeIn) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield fetchApi("handshake", handshakeIn);
    if (result.error) {
        throw new Error(result.errors[0].msg);
    }
    return result;
});
exports.handshake = handshake;
const requestCaptcha = (handshakeResult) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield fetchApi("requestCaptcha", handshakeResult);
    if (result.error) {
        if (result.error.code === types_1.ErrorCode.SESSION_EXPIRED) {
            return result.error.code;
        }
        throw new Error(result.error.message);
    }
    return result;
});
exports.requestCaptcha = requestCaptcha;
const requestProof = (solvedCaptcha) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield fetchApi("requestProof", solvedCaptcha);
    if (result.error) {
        if (result.error.code === types_1.ErrorCode.SESSION_EXPIRED) {
            return result.error.code;
        }
        return types_1.ErrorCode.INVALID_SOLUTION;
    }
    return result;
});
exports.requestProof = requestProof;
