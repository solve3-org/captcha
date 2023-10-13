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
const config_1 = require("./config");
const fetchApi = (method, body) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${config_1.API_URL}/${method}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body), // Convert the object to JSON
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Parse and return the response as JSON
    return response.json();
});
const handshake = (handshakeIn) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetchApi("handshake", handshakeIn);
});
exports.handshake = handshake;
const requestCaptcha = (handshakeResult) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetchApi("requestCaptcha", handshakeResult);
});
exports.requestCaptcha = requestCaptcha;
const requestProof = (solvedCaptcha) => {
    console.log("requestProof");
    return "";
};
exports.requestProof = requestProof;
