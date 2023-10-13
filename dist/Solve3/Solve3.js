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
    // return value needs to be signed
    init(handshakeIn) {
        return __awaiter(this, void 0, void 0, function* () {
            this._handshakeIn = handshakeIn;
            // check if account and destination are valid addresses
            const handshakeResult = yield (0, api_1.handshake)(handshakeIn);
            this._handshakeResult = handshakeResult;
            return handshakeResult.message;
        });
    }
    open(signature) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._handshakeIn) {
                throw new Error("Solve3 not initialized");
            }
            const handshakeResult = Object.assign(Object.assign({}, this._handshakeIn), { timestamp: (_a = this._handshakeResult) === null || _a === void 0 ? void 0 : _a.timestamp, signature: signature });
            // if (!HandshakeResult) {
            //   throw new Error("HandshakeResult not found");
            // }
            this.logger.debug("open");
            const signedCaptcha = yield (0, api_1.requestCaptcha)(handshakeResult);
            this.modal.create(signedCaptcha);
        });
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
