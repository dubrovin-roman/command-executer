"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
class ConsoleLogger {
    constructor() { }
    static getInstance() {
        if (!this.consoleLogger)
            this.consoleLogger = new ConsoleLogger();
        return this.consoleLogger;
    }
    log(...args) {
        console.log(...args);
    }
    error(...args) {
        console.log(...args);
    }
    end() {
        console.log("Задача выполнена");
    }
}
exports.ConsoleLogger = ConsoleLogger;
