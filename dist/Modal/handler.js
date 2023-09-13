"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeInnerDivColor = void 0;
const Logger_1 = __importDefault(require("../Logger/Logger"));
const logger = new Logger_1.default(true);
const changeInnerDivColor = () => {
    logger.debug("changeInnerDivColor()");
    const innerDiv = document.getElementById("s3-solve3-modal-inner");
    logger.debug("changeInnerDivColor()" + " innerDiv");
    if (!innerDiv) {
        throw new Error("Inner div not found");
    }
    if (innerDiv.style.background === "darkgrey") {
        logger.debug("changeInnerDivColor()" + " innerDiv.style.background: red -> blue");
        innerDiv.style.background = "lightgrey";
    }
    else {
        logger.debug("changeInnerDivColor()" + " innerDiv.style.background: blue -> red");
        innerDiv.style.background = "darkgrey";
    }
};
exports.changeInnerDivColor = changeInnerDivColor;
