import { AxiosError, AxiosResponse } from "axios";
import Api from "./api";
import { SERVER_URL } from "./constants/apiUrl";

export interface IrequestParam {
  /**
   *  API 요청 메소드
   * (default: 'get')
   * */
  method: "get" | "post" | "put" | "patch" | "delete";
  /**
   * 호스트 고정 URL
   * (default : (constants/url.ts)에 첫번째로 지정한 프로퍼티)
   * */
  host: string;
  /**
   * 나머지 URL
   * default: '',  호스트 URL의 루트 도메인으로 직접 요청하지 않는 이상 넣어주세요
   * */
  url: string;
  /**
   * Data 보낼 형식  (request body에 들어갈 것)
   * (default: Empty Object Literal)
   * GET이나 DELETE 요청시에는 자동으로 queryString으로 변환
   */
  data: { [key: string]: any };
  /**
   * request Header에 넣을 값 예시 {token: '1234'}
   *  (default: Empty Object Literal) - {})
   */
  headers: { [key: string]: any };
  /**
   * 요청 content-type 변경시에 사용을 권장 (기본 request payload 변경)
   * (default: Empty Object Literal) - {})
   */
  options: { [key: string]: any };
  /**
   * response Header에서 빼올 값들 문자열 배열로 지정
   * (default: Empty Array Literal) - [])
   */
  searchHeaders: Array<string> | [];
}

class HTTPService extends Api {
  constructor() {
    super();

    this.request = this.request.bind(this);
    this.makeObject = this.makeObject.bind(this);
    this.makeDeepFreeze = this.makeDeepFreeze.bind(this);
  }

  /**
   *
   *
   * @private
   * @description 불변 객체 생성(서버 결과값 수정 불가능하게) - 재귀적으로 돈다
   * @param {{ [key: string]: any }} target
   * @returns {{ [key: string]: any }}
   * @memberof HTTPService
   */
  private makeDeepFreeze(target: { [key: string]: any }): { [key: string]: any } {
    if (target && typeof target === "object" && !Object.isFrozen(target)) {
      Object.freeze(target);

      Object.keys(target).forEach((key) => this.makeDeepFreeze(target[key]));
    }

    return target;
  }

  /**
   *
   *
   *  @private
   * 2@description res.data와 더불어서 만약 헤더에서 가져와야할 값들을 추출하여, 같이 object에 담은 배열 리턴
   * - object 타입이 아닌 경우에는 singleRes라는 심볼 프로퍼티에 담아준다.
   * 불변성을 확보 하기 위해서 만약 서버 응답에 대한 처리를 수정할 수 있게 해주면 나중에 서버쪽 응답의 문제로 생각할 수 있기에
   * @template T
   * @param {Readonly<AxiosResponse<T>>} res
   * @param {Array<string>} searchHeader
   * @returns
   * @memberof HTTPService
   */
  private makeObject<T>(res: Readonly<AxiosResponse<T>>, searchHeader: Array<string>) {
    let headerRes: { [key: string]: any } = {};

    searchHeader.forEach((item: string) => {
      headerRes[`${item}`] = res.headers[`${item}`];
    });

    let obj = Object.keys(headerRes).length > 0 ? { data: res.data, headers: headerRes } : { data: res.data };
    // return obj;
    return this.makeDeepFreeze(obj);
  }

  /**
   *
   * @public
   * @template T
   * @param {Partial<IrequestParam>} {
   *     method = "get",
   *     host = SERVER_URL[`${Object.keys(SERVER_URL)[0]}`],
   *     url = "",
   *     data = {},
   *     options = {},
   *     headers = {},
   *     searchHeaders = [],
   *   }
   * @returns {Readonly<{ [key: string]: any }>}
   * @memberof HTTPService
   */
  request<T>({
    method = "get",
    host = SERVER_URL[`${Object.keys(SERVER_URL)[0]}`],
    url = "",
    data = {},
    options = {},
    headers = {},
    searchHeaders = [],
  }: Partial<IrequestParam>): Readonly<{ [key: string]: any }> {
    try {
      return this.ajax(method, host, url, data, headers, options)
        .then((res: Readonly<AxiosResponse<T>>) => this.makeObject<T>(res, searchHeaders))
        .catch((e: Readonly<AxiosError<T>>) => {
          throw new Error(typeof e === "object" ? JSON.stringify(e) : "" + e);
        });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

export default new HTTPService();
