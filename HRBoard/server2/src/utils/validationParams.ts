/**
 *
 * @name Validation
 * @description 유효성 검증
 * @class Validation
 */
class Validation {
  constructor() {}

  public validParams(params: any): any {
    return new Promise((resolve, reject) => {
      if (!(Object.keys(params).length > 0)) {
        reject(new Error("Param is Null"));
      }

      resolve(params);
    });
  }

  public validEmail(params: { email: string; [key: string]: any }): any {
    var reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    return new Promise((resolve, reject) => {
      if (!reg.test(params.email)) {
        reject(new Error("Invalid Email"));
      }
      resolve(params);
    });
  }
}

export default new Validation();
