import { Request, Response } from "express";
import { makeSucessedResponse, makeErrorResponse } from "../utils";
import Service from "../services/ServiceService";
import async from "../utils/asyncLib";
import validationParams from "../utils/validationParams";
import AuthService from "../services/AuthService";

class ServiceController {
  constructor() {}

  async createService(req: Request, res: Response) {
    const makeResponse = (err: null | Error, data: null | any) => {
      if (err) {
        makeErrorResponse({ res, err });
        return;
      }

      makeSucessedResponse({ res });
    };

    async.shWaterFall(
      req.body,
      [AuthService.decodedToken, validationParams.validParams, Service.createService],
      makeResponse
    );
  }
}

export default new ServiceController();
