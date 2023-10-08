"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const Logger_1 = __importDefault(require("../Logger/Logger"));
const Modal_1 = __importDefault(require("../Modal/Modal"));
const api_1 = require("../Modal/api/api");
class Solve3 extends events_1.EventEmitter {
    constructor() {
        super();
        this.logger = new Logger_1.default(true);
        this.modal = new Modal_1.default();
    }
    open(HandshakeResult) {
        if (!this._handshakeIn) {
            throw new Error("Solve3 not initialized");
        }
        if (!HandshakeResult) {
            throw new Error("HandshakeResult not found");
        }
        this.logger.debug("open");
        const signedCaptcha = (0, api_1.requestCaptcha)(HandshakeResult);
        this.modal.create(signedCaptcha);
    }
    // return value needs to be signed
    init(handshakeIn) {
        this._handshakeIn = handshakeIn;
        // check if account and destination are valid addresses
        const handshakeResult = {
            account: handshakeIn.account,
            network: handshakeIn.network,
            destination: handshakeIn.destination,
            timestamp: Date.now(),
            signature: "SIGNATURE",
        };
        return handshakeResult;
    }
}
exports.default = Solve3;
// const openPopup = async () => {
//   solve3
//     .on("success", async (message) => {
//       sendTx(message);
//     })
//     .on("error", async (err) => {
//       console.log("error: ", err);
//     });
//   const handshake = await solve3.init({
//     account: account,
//     contract: "0xa70783A4EA4fEE1C121864146049736D11105755",
//     network: "mumbai",
//   });
//   console.log("address: ", props.address);
//   console.log("handshake: ", handshake);
//   web3.eth.sign(handshake, account).then((msg) => {
//     solve3.open(msg);
//   });
// };
