class CustomError extends Error {
  customStatus: number;
  constructor(customStatus: number = 400, ...params: any) {
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.customStatus = customStatus;
  }
}
