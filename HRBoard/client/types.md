# Utility Class in Typescript

## Partial

- 타입의 모든 키값들을 생략 가능한 타입으로 변경해준다.
- 가장 안전하게 처리 하려면, Partial로 전체를 감싸주게 되면 생략 가능타입이기에 기본값은 지정해주는 것이 제일 안전하다.

```ts
// src/services/HTTPService.ts
interface IrequestParam {
  method: "get" | "post" | "put" | "patch" | "delete";
  host: string;
  url: string;
  data: { [key: string]: any };
  headers: { [key: string]: any };
  options: { [key: string]: any };
  searchHeaders: Array<string> | [];
}
// request의 객체 매개변수는 전부 생략 가능하다. default 값들을 모두 지정해줘야 안전하게 동작한다.
class Sample {
  request({
    method = "get",
    host = SERVER_URL[`${Object.keys(SERVER_URL)[0]}`],
    url = "",
    data = {},
    options = {},
    headers = {},
    searchHeaders = [],
  }: Partial<IrequestParam>): { [key: string]: any } {
    try {
      return this.ajax(method, host, url, data, headers, options)
        .then((res: AxiosResponse<unknown>) => {
          return this.makeObject(res, searchHeaders);
        })
        .catch((e: AxiosError) => {
          throw new Error(typeof e === "object" ? JSON.stringify(e) : "" + e);
        });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
```

## Readonly

- Partial과 사용방법이 비슷하지만, 모든 프로퍼티 키들을 읽기전용으로 만드는 것이다 수정이 불가능하다.
- 위코드에서 추가로 AxiosResponse인 서버 요청 값에 대한 수정을 할 수 없게 만들자. 물론 유저들은 대부분 서버에서 받은 값을 가지고 수정을 하려고하지 않으려고하나 혹시라도 그럴 유저가 있을 수 있으니...

```ts
/**
   *
   * @public
   * @param {IrequestParam} {
   *     method = 'get',
   *     host = SERVER_URL[`${Object.keys(SERVER_URL)[0]}`],
   *     url = '',
   *     data = {},
   *     options = {},
   *     headers = {},
   *     searchHeaders = [],
   *   }
   * @returns {{[key: string]: any}}
   * @memberof HTTPService
   */
  request({
    method = "get",
    host = SERVER_URL[`${Object.keys(SERVER_URL)[0]}`],
    url = "",
    data = {},
    options = {},
    headers = {},
    searchHeaders = [],
  }: Partial<IrequestParam>): { [key: string]: any } {
    try {
      return this.ajax(method, host, url, data, headers, options)
        .then((res: Readonly<AxiosResponse<unknown>>) => {
          return this.makeObject(res, searchHeaders);
        })
        .catch((e: Readonly<AxiosError<unknown>>) => {
          throw new Error(typeof e === "object" ? JSON.stringify(e) : "" + e);
        });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
```

> resolve된 결과와 reject되어 나온 에러에 대해서 Readonly 유틸리티 클래스를 적용함으로써 조금더 안전해졌다
