class CustomError extends Error {
  customStatus: number;
  constructor(customStatus: number = 400, ...params: any) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.customStatus = customStatus;
  }
}

export default CustomError;
