import { jwtSecret } from "./../app";
import crypto from "crypto";
import path from "path";
import dotenv from "dotenv";
import model from "../models";
import jwt from "jsonwebtoken";

dotenv.config({ path: path.join(__dirname, "../../.env") });

interface ICreateUserInput {
  name: string;
  email: string;
  password: string;
}

interface ILoginInput {
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
  constructor() {
    this.hashPassword = this.hashPassword.bind(this);
    this.createUser = this.createUser.bind(this);
    this.emailDuplicateCheck = this.emailDuplicateCheck.bind(this);
  }

  /**
   *
   * @description 유저 생성
   * @param {*} param
   * @memberof AuthService
   */
  public createUser(params: { [key: string]: any }): Promise<{ [key: string]: any }> {
    return new Promise(async (resolve, reject) => {
      model.User.create(params)
        .then(() => {
          resolve(params);
        })
        .catch(function (err) {
          reject(err);
        });
    });
  }

  /**
   *
   * @description 이메일 중복 체크
   * @param {ICreateUserInput} params
   * @returns
   * @memberof AuthService
   */
  public async emailDuplicateCheck(params: {
    [key: string]: any;
  }): Promise<{ [key: string]: any } | Error> {
    const { email } = params;
    return new Promise((resolve, reject) => {
      model.User.findOne({ where: { email } })
        .then((result) => {
          if (!!result) {
            reject(new Error("Email is exists"));
          } else {
            resolve(params);
          }
        })
        .catch((err: Error) => {
          console.error(err);
          reject(err);
        });
    });
  }

  public async matchUser(params: { [key: string]: any }): Promise<{ [key: string]: any } | Error> {
    const { email, password } = params;

    return new Promise((resolve, reject) => {
      model.User.findOne({ where: { email, password } })
        .then((result) => {
          if (!!result) {
            const { id, name, email, created_at, updated_at } = result.get();
            params["result"] = {
              id,
              name,
              email,
              created_at,
              updated_at,
            };
            resolve(params);
          } else {
            reject(new Error("No Match User"));
          }
        })
        .catch((err: Error) => {
          console.error(err);
          reject(err);
        });
    });
  }

  /**
   *
   * @public
   * @description 패스워드 암호화하여 params["password"]에 오버라이딩
   * @memberof AuthService
   */
  public hashPassword(params: { [key: string]: any }): Promise<{ [key: string]: any } | Error> {
    return new Promise(async (resolve, reject) => {
      crypto.pbkdf2(
        params.password,
        process.env.PASSWORD_SECRET as string,
        100000,
        64,
        "sha512",
        (err, key) => {
          if (err) reject(err);

          params["password"] = key.toString("base64");
          resolve(params);
        }
      );
    });
  }

  public decodedToken(params: { [key: string]: any }): Promise<{ [key: string]: any }> {
    return new Promise((resolve, reject) => {
      const decodedToken: any = jwt.verify(params["token"], jwtSecret);
      params["userId"] = decodedToken.sub;

      resolve(params);
    });
  }
}

export default new AuthService();
