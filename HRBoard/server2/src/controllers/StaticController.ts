import { Request, Response } from "express";
import { makeSucessedResponse, makeErrorResponse, makeResponse } from "../utils/utils";
import Static from "../services/StaticService";
import async from "../utils/asyncLib";
import validationParams from "../utils/validationParams";
import Service from "../services/ServiceService";

class StaticController {
  constructor() {}

  async stackService(req: Request, res: Response) {
    const makeResponse = (err: null | Error, data: null | any) => {
      if (err) {
        makeErrorResponse({ res, err });
        return;
      }

      makeSucessedResponse({ res });
    };
    const { entries, location } = req.body;

    try {
      const serviceId = await Service.matchServiceUrl(location.host);
      const params = {
        ...entries[0],
        serviceId,
        detailUrl: location.pathname,
      };

      let callbackArray: any = [];
      switch (req.body.name) {
        case "FCP":
          callbackArray = [validationParams.validParams, Static.stackFCP];
          break;
        case "LCP":
          callbackArray = [validationParams.validParams, Static.stackLCP];
          break;
        case "TTFB":
          callbackArray = [validationParams.validParams, Static.stackTTFB];
          break;
        default:
          break;
      }

      async.shWaterFall(params, callbackArray, makeResponse);
    } catch (e) {
      makeResponse(e, null);
    }
  }
}

export default new StaticController();
