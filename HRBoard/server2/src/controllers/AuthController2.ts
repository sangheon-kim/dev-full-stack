import { Request, Response } from "express";
import Model from "../models";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../app";
import AuthService from "../services/AuthService2";
import Validation from "../utils/validation";
import ValidationParams from "../utils/validationParams";
import { makeSucessedResponse, makeErrorResponse } from "../utils";
import async from "../utils/asyncLib";

class AuthController {
  constructor() {
    this.join = this.join.bind(this);
  }

  /**
   *
   * @description 로그인 관련 컨트롤러
   * @date 2020-12-11
   * @param {Request} req
   * @param {Response} res
   * @memberof AuthController
   */
  async login(req: Request, res: Response) {
    const makeResponse = (err: null | Error, data: null | any) => {
      if (err) {
        makeErrorResponse({ res, err });
        return;
      }
      const token = jwt.sign({ sub: data.id }, jwtSecret);
      const params = {
        ...data["result"],
        accessToken: token,
      };
      makeSucessedResponse({
        res,
        data: params,
        cookie: { accessToken: token, option: { maxAge: 90000, httpOnly: true } },
      });
    };

    async.shWaterFall(
      req.body,
      [
        ValidationParams.validParams,
        ValidationParams.validEmail,
        AuthService.hashPassword,
        AuthService.matchUser,
      ],
      makeResponse
    );
  }

  /**
   *
   * @description 회원가입 관련 컨트롤러
   * @date 2020-12-09
   * @author Sangheon Kim
   * @param {Request} req
   * @param {Response} res
   * @memberof AuthController
   */
  async join(req: Request, res: Response) {
    const makeResponse = (err: null | Error, __: any) => {
      if (err) {
        makeErrorResponse({ res, err });
        return;
      }

      makeSucessedResponse({ res });
    };

    async.shWaterFall(
      req.body,
      [
        ValidationParams.validParams,
        ValidationParams.validEmail,
        AuthService.emailDuplicateCheck,
        AuthService.hashPassword,
        AuthService.createUser,
      ],
      makeResponse
    );
  }
}

export default new AuthController();
