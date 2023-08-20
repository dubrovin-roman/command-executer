import { IStreamLogger } from "../../core/handlers/stream-logger.interface";

export class ConsoleLogger implements IStreamLogger {
  private static consoleLogger: ConsoleLogger;

  private constructor() {}

  public static getInstance(): ConsoleLogger {
    if (!this.consoleLogger) this.consoleLogger = new ConsoleLogger();
    return this.consoleLogger;
  }

  log(...args: any[]): void {
    console.log(...args);
  }
  error(...args: any[]): void {
    console.log(...args);
  }
  end(): void {
    console.log("Задача выполнена");
  }
}
