"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    constructor(isDebug) {
        this.debugEnabled = false;
        this.debugEnabled = isDebug;
    }
    debug(message, message2) {
        if (this.debugEnabled) {
            const out = message2 ? `${message} ${message2}` : message;
            console.log("\x1b[90m[DEBUG]\x1b[0m", out); // Gray color for debug
        }
    }
    info(message, message2) {
        const out = message2 ? `${message} ${message2}` : message;
        console.log("\x1b[33m[INFO]\x1b[0m", out); // Yellow color for info
    }
    error(message, message2) {
        const out = message2 ? `${message} ${message2}` : message;
        console.log("\x1b[31m[ERROR]\x1b[0m", out); // Red color for error
    }
}
exports.default = Logger;
