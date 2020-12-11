import crypto from "crypto";
import path from "path";
import dotenv from "dotenv";
import model from "../models";
dotenv.config({ path: path.join(__dirname, "../../.env") });

interface ICreateUserInput {
  id: number;
  name: string;
  email: string;
  password: string;
}

/**
 *
 * @author Sangheon Kim
 * @description 인증 서비스
 * @class AuthService
 *
 */
class AuthService {
  key: any;
  constructor() {
    // this 바인딩 처리
    this.key;
    this.hashPassword = this.hashPassword.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  /**
   *
   * @description 유저 생성
   * @param {*} param
   * @memberof AuthService
   */
  public async createUser(param: ICreateUserInput) {
    const { password } = param;
    const hashPassword = await this.hashPassword(password);

    try {
      const result = await model.User.create({ ...param, password: hashPassword });
      if (result) {
        return result;
      } else {
        throw new Error("User Create Failed");
      }
    } catch (e) {
      console.error(e);
    }
  }

  public async matchUser() {}

  /**
   *
   * @public
   * @description 패스워드 암호화하여 리턴
   * @memberof AuthService
   */
  private hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(
        password,
        process.env.PASSWORD_SECRET as string,
        100000,
        64,
        "sha512",
        (err, key) => {
          if (err) reject(err);

          resolve(key.toString("base64"));
        }
      );
    });
  }
}

export default new AuthService();
