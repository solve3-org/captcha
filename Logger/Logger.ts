class Logger {
  debugEnabled = false;

  constructor(isDebug: boolean) {
    this.debugEnabled = isDebug;
  }

  debug(message: string): void;
  debug(message: string, message2?: string): void {
    if (this.debugEnabled) {
      const out = message2 ? `${message} ${message2}` : message;
      console.log("\x1b[90m[DEBUG]\x1b[0m", out); // Gray color for debug
    }
  }

  info(message: string): void;
  info(message: string, message2?: string): void {
    const out = message2 ? `${message} ${message2}` : message;
    console.log("\x1b[33m[INFO]\x1b[0m", out); // Yellow color for info
  }

  error(message: string): void;
  error(message: string, message2?: string): void {
    const out = message2 ? `${message} ${message2}` : message;
    console.log("\x1b[31m[ERROR]\x1b[0m", out); // Red color for error
  }
}

export default Logger;
