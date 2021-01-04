import path from "path";
import dotenv from "dotenv";
import model from "../models";
import CustomError from "../utils/customError";

dotenv.config({ path: path.join(__dirname, "../../.env") });

class ServiceService {
  constructor() {}

  /**
   *
   * @description 서비스 생성
   * @param {{ [key: string]: any }} params
   * @returns {Promise<{ [key: string]: any }>}
   * @memberof ServiceService
   */
  public createService(params: { [key: string]: any }): Promise<{ [key: string]: any }> {
    const { name, url } = params;
    return new Promise((resolve, reject) => {
      model.Services.create({ name, url })
        .then(() => resolve(params))
        .catch((err) => reject(err));
    });
  }

  /**
   *
   * @description 서비스 한개 얻어오기
   * @param {{ [key: string]: any }} params
   * @returns {Promise<{ [key: string]: any }>}
   * @memberof ServiceService
   */
  public getService(params: { [key: string]: any }): Promise<{ [key: string]: any }> {
    return new Promise((resolve, reject) => {
      model.Services.findOne({ where: { id: params.id } }).then((result) => {
        if (!!result) {
          const { id, name, url } = result.get();
          params["service"] = {
            id,
            name,
            url,
          };

          resolve(params);
        } else {
          reject(new CustomError(400, "don't exist Service"));
        }
      });
    });
  }

  /**
   *
   * @description 서비스 전체 가져오기 + count
   * @param {{ [key: string]: any }} params
   * @returns {Promise<{ [key: string]: any }>}
   * @memberof ServiceService
   */
  public getServices(params: { [key: string]: any }): Promise<{ [key: string]: any }> {
    return new Promise((resolve, reject) => {
      model.Services.findAndCountAll()
        .then((result) => {
          params["services"] = result;

          resolve(params);
        })
        .catch((err) => reject(err));
    });
  }

  /**
   *
   * @descriptiokn 서비스 수정
   * @param {{ [key: string]: any }} params
   * @returns {Promise<{ [key: string]: any }>}
   * @memberof ServiceService
   */
  public updateService(params: { [key: string]: any }): Promise<{ [key: string]: any }> {
    const { id, name, url } = params;

    return new Promise((resolve, reject) => {
      model.Services.update(
        {
          name,
          url,
        },
        {
          where: {
            id,
          },
        }
      )
        .then(() => resolve(params))
        .catch((err) => reject(err));
    });
  }

  /**
   *
   * @description 서비스 삭제
   * @param {{ [key: string]: any }} params
   * @returns {Promise<{}>}
   * @memberof ServiceService
   */
  public deleteService(params: { [key: string]: any }): Promise<{}> {
    const { id } = params;
    return new Promise((resolve, reject) => {
      model.Services.destroy({ where: { id } })
        .then((result) => {
          if (result > 0) {
            resolve(params);
          }
          reject(new CustomError(400, "don't exist Service"));
        })
        .catch((err) => reject(err));
    });
  }

  public matchServiceUrl(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      model.Services.findOne({ where: { url } })
        .then((result) => {
          const url = result?.get()["id"];

          if (!!url) {
            resolve(url);
          } else {
            reject(new CustomError(400, "don't know your Service"));
          }
        })
        .catch((err) => reject(err));
    });
  }
}

export default new ServiceService();
