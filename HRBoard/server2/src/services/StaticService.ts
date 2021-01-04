import path from "path";
import dotenv from "dotenv";
import model from "../models";

dotenv.config({ path: path.join(__dirname, "../../.env") });

class StaticService {
  constructor() {}

  public stackTTFB(params: { [key: string]: any }): Promise<{ [key: string]: any }> {
    const { serviceId, detailUrl, domComplete, domContentLoadedEventEnd } = params;
    return new Promise((resolve, reject) => {
      model.TTFB.create({ serviceId, detailUrl, domComplete, domContentLoadedEventEnd })
        .then(() => resolve(params))
        .catch((err) => reject(err));
    });
  }

  public stackLCP(params: { [key: string]: any }): Promise<{ [key: string]: any }> {
    const { serviceId, detailUrl, duration, loadTime, renderTime, size, startTime } = params;

    return new Promise((resolve, reject) => {
      model.LCP.create({ serviceId, detailUrl, duration, loadTime, renderTime, size, startTime })
        .then(() => resolve(params))
        .catch((err) => reject(err));
    });
  }

  public stackFCP(params: { [key: string]: any }): Promise<{ [key: string]: any }> {
    const { serviceId, detailUrl, duration, startTime } = params;

    return new Promise((resolve, reject) => {
      model.FCP.create({ serviceId, detailUrl, duration, startTime })
        .then(() => resolve(params))
        .catch((err) => reject(err));
    });
  }
}

export default new StaticService();
