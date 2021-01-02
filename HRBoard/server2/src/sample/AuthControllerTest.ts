import { Request, Response } from "express";
import Model from "../models";
import jwt from "jsonwebtoken";
import AuthService from "../services/AuthService";
import AuthService2 from "../services/AuthService";
import Validation from "../utils/validation";
import ValidationParams from "../utils/validationParams";
import { makeSucessedResponse, makeErrorResponse } from "../utils/utils";
import async from "../utils/asyncLib";

class AuthController {
  constructor() {
    this.join = this.join.bind(this);
    // this.generator = this.generator.bind(this);
  }

  /**
   *
   * @description 1차로 먼저 만들어본 모듈없이 구현해보기 (Only Promise,  async-Await)
   * @date 2020-12-06 (공부해서 제너레이터로 만들어보자)
   * @author Sangheon Kim
   * @param {Request} req
   * @param {Response} res
   * @memberof AuthController
   */
  async join(req: Request, res: Response) {
    const { email } = req.body;
    try {
      Promise.allSettled([
        Validation.validParams(req.body),
        Validation.validEmail(email),
        AuthService.createUser(req.body),
      ]);

      makeSucessedResponse({ res });
    } catch (err) {
      console.error("error", err);
      makeErrorResponse({ res, err });
    }
  }

  /**
   *
   * @description 2차로 어제 제너레이터 이터레이터 강의 엄청듣고 오늘 오전에 만든 모듈...
   * @date 2020-12-09 (뭔가 맘에안들어 개노가다같아 그리고 코드복잡하다...)
   * @author Sangheon Kim
   * @param {Request} req
   * @param {Response} res
   * @memberof AuthController
   */
  async joinGen(req: Request, res: Response) {
    function* iter(callbackArray: Array<(params?: any) => any>, params: { [key: string]: any }) {
      let result;
      for (let i = 0; i < callbackArray.length; i++) {
        result = yield callbackArray[i](result ? result : params);
      }
    }

    const g: Generator = (function* (params) {
      yield* iter(
        [
          ValidationParams.validParams,
          ValidationParams.validEmail,
          AuthService2.hashPassword,
          AuthService2.createUser,
        ],
        params
      );
    })(req.body);

    try {
      let param = await g.next().value;
      param = await g.next(param).value;
      param = await g.next(param).value;
      param = await g.next(param).value;

      makeSucessedResponse({ res });
    } catch (err) {
      makeErrorResponse({ res, err });
    }
  }

  /**
   *
   * @description 최종완성본... 3차만에 성공 개선을 위해 좀더 살펴보긴하자...
   * @date 2020-12-09 (휴,,, )
   * @author Sangheon Kim
   * @param {Request} req
   * @param {Response} res
   * @memberof AuthController
   */
  async joinFinal(req: Request, res: Response) {
    const makeResponse = (err: null | Error, data: null | any) => {
      if (err) {
        makeErrorResponse({ res, err });
        return;
      } else {
        makeSucessedResponse({ res });
      }
    };

    async.shWaterFall(
      req.body,
      [
        ValidationParams.validParams,
        ValidationParams.validEmail,
        AuthService2.hashPassword,
        AuthService2.createUser,
      ],
      makeResponse
    );
  }
}

export default new AuthController();
