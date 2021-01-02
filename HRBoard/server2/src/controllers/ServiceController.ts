import { Request, Response } from "express";
import { makeSucessedResponse, makeErrorResponse, makeResponse } from "../utils/utils";
import Service from "../services/ServiceService";
import async from "../utils/asyncLib";
import validationParams from "../utils/validationParams";
import AuthService from "../services/AuthService";
import cookieControl from "../utils/cookieControl";

class ServiceController {
  constructor() {
    // this.parseCookies = this.parseCookies.bind(this);
    this.createService = this.createService.bind(this);
  }

  createService(req: Request, res: Response) {
    const makeResponse = (err: null | Error, data: null | any) => {
      if (err) {
        makeErrorResponse({ res, err });
        return;
      }

      makeSucessedResponse({ res });
    };

    const token = cookieControl.getCookieValue(req.headers.cookie, "accessToken");

    req.body = {
      ...req.body,
      token,
    };

    async.shWaterFall(
      req.body,
      [AuthService.decodedToken, validationParams.validParams, Service.createService],
      makeResponse
    );
  }

  getServices(req: Request, res: Response) {
    const makeResponse = (err: null | Error, data: null | any) => {
      if (err) {
        makeErrorResponse({ res, err });
        return;
      }

      const params = { services: data["services"] };

      makeSucessedResponse({ res, data: params });
    };

    async.shWaterFall(req.body, [Service.getServices], makeResponse);
  }

  getService(req: Request, res: Response) {
    const makeResponse = (err: null | Error, data: null | any) => {
      if (err) {
        makeErrorResponse({ res, err });
        return;
      }

      const params = { services: data["service"] };

      makeSucessedResponse({ res, data: params });
    };

    req.body["id"] = req.params.id;

    async.shWaterFall(req.body, [Service.getService], makeResponse);
  }

  deleteService(req: Request, res: Response) {
    const makeResponse = (err: null | Error, data: null | any) => {
      if (err) {
        makeErrorResponse({ res, err });
        return;
      }

      makeSucessedResponse({ res });
    };

    const token = cookieControl.getCookieValue(req.headers.cookie, "accessToken");

    req.body = {
      ...req.body,
      token,
    };

    async.shWaterFall(
      req.body,
      [AuthService.decodedToken, validationParams.validParams, Service.createService],
      makeResponse
    );
  }
}

export default new ServiceController();
