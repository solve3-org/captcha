"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const Logger_1 = __importDefault(require("../Logger/Logger"));
const Modal_1 = __importDefault(require("../Modal/Modal"));
class Solve3 extends events_1.EventEmitter {
    constructor() {
        super();
        this.logger = new Logger_1.default(true);
        this.modal = new Modal_1.default();
    }
    open(HandshakeResult) {
        this.modal.create();
    }
    init(handshakeIn) {
        return;
    }
}
exports.default = Solve3;
