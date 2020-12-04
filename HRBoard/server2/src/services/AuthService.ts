import crypto from "crypto";

/**
 *
 * @author Sangheon Kim
 * @description 인증 서비스
 * @class AuthService
 *
 */
class AuthService {
  constructor() {
    // this 바인딩 처리
    this.hashPassword = this.hashPassword.bind(this);
  }

  /**
   *
   * @public
   * @description 패스워드 암호화하여 리턴
   * @memberof AuthService
   */
  public hashPassword(password: string): string {
    return "";
  }
}

export default new AuthService();
