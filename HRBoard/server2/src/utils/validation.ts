/**
 *
 * @name Validation
 * @description 유효성 검증
 * @class Validation
 */
class Validation {
  constructor() {}

  public validParams(params: { [key: string]: any }): void {
    if (!(Object.keys(params).length > 0)) {
      throw new Error("Param is Null");
    }
  }

  public validEmail(email: string): void {
    var reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (!reg.test(email)) {
      throw new Error("Invalid Email");
    }
  }
}

export default new Validation();
