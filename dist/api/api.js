"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestProof = exports.requestCaptcha = exports.handshake = void 0;
const handshake = (handshakeIn) => {
    console.log("handshake");
    return;
};
exports.handshake = handshake;
const requestCaptcha = (HandshakeResult) => {
    console.log("requestCaptcha");
    const signedCaptcha = {
        image: "",
        segment: "",
        position: 0,
        magicToken: "",
        signature: ""
    };
    return signedCaptcha;
};
exports.requestCaptcha = requestCaptcha;
const requestProof = (solvedCaptcha) => {
    console.log("requestProof");
    return "";
};
exports.requestProof = requestProof;
