import CustomError from "./customError";

/**
 *
 * @name Validation
 * @description 유효성 검증
 * @class Validation
 */
class Validation {
  constructor() {}

  public validParams(params: any): Promise<{ [key: string]: any }> {
    return new Promise((resolve, reject) => {
      if (!(Object.keys(params).length > 0)) {
        reject(new CustomError(400, "Param is Null"));
      }

      resolve(params);
    });
  }

  public validEmail(params: { [key: string]: any }): Promise<{ [key: string]: any }> {
    var reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    return new Promise((resolve, reject) => {
      if (!reg.test(params.email)) {
        reject(new CustomError(400, "Invalid Email"));
      }
      resolve(params);
    });
  }
}

export default new Validation();
