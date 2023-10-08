"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestProof = exports.requestCaptcha = exports.handshake = void 0;
// @ts-ignore
const signedCaptcha_json_1 = __importDefault(require("./signedCaptcha.json"));
const handshake = (handshakeIn) => {
    console.log("handshake");
    return;
};
exports.handshake = handshake;
const requestCaptcha = (HandshakeResult) => {
    console.log("requestCaptcha");
    const signedCaptcha = JSON.parse(JSON.stringify(signedCaptcha_json_1.default));
    console.log(signedCaptcha.signature);
    return signedCaptcha;
};
exports.requestCaptcha = requestCaptcha;
const requestProof = (solvedCaptcha) => {
    console.log("requestProof");
    return "";
};
exports.requestProof = requestProof;
