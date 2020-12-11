class AsyncLib {
  state: Object | { [key: string]: any };
  constructor() {
    this.state = {};
    this.constant = this.constant.bind(this);
  }

  /**
   *
   * @description 들어오는 값으로 상태 변경
   * @param {{ [key: string]: any }} params
   * @returns
   * @memberof AsyncLib
   */
  constant(params: { [key: string]: any }) {
    return new Promise((resolve, reject) => {
      if (Object.keys.length > 0) {
        this.state = params;
        resolve("Success");
      } else {
        reject("No params");
      }
    });
  }

  /**
   *
   * @description 순차적으로 들어온 콜백 리스트들을 실행해준다.
   * @param {{ [key: string]: any }} initial
   * @param {Array<(params?: any) => any>} callbackArray
   * @param {*} [cb]
   * @memberof AsyncLib
   */
  shWaterFall(initial: { [key: string]: any }, callbackArray: Array<(params?: any) => any>, cb?: any) {
    const g: Generator = function* (this: AsyncLib) {
      this.constant(initial);
      for (let callback of callbackArray) {
        yield (async (genObj: Generator, promise: (params?: { [key: string]: any }) => Promise<any>) => {
          try {
            const result = await promise(this.state);
            this.state = result;
            genObj.next(result);
          } catch (err) {
            console.log("errorZZz", err);
            cb(err, null);
          }
        })(g, callback);
      }

      cb(null, this.state);
    }.call(new AsyncLib());

    g.next();
  }
}

export default new AsyncLib();
