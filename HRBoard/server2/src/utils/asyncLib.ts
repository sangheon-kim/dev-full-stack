class AsyncLib {
  state: Object | { [key: string]: any };

  constructor() {
    this.state = {};
    this.constant = this.constant.bind(this);
    this.shWaterFall = this.shWaterFall.bind(this);
  }

  /**
   *
   * @description 들어오는 값으로 상태 변경
   * @param {{ [key: string]: any }} params
   * @returns
   * @author Sangheon Kim
   * @memberof AsyncLib
   */
  constant(params: { [key: string]: any }) {
    return new Promise((resolve, reject) => {
      if (Object.keys.length > 0) {
        // params로 사용할 객체가 넘어왔다면 인스턴스의 state를 초기화 해주고,
        // success Resolve 해준다.
        this.state = params;
        resolve("Success");
      } else {
        // 파라미터로 온것이 객체타입이 아니거나, 전달받은게 없는 경우에 reject 해준다.
        reject("No params");
      }
    });
  }

  /**
   *
   * @description 순차적으로 들어온 콜백 리스트들을 실행 후 세번째 매개변수로 넘어온 callback 함수를 실행시켜주어 결과 반환
   * @param {{ [key: string]: any }} initial
   * @param {Array<(params?: any) => any>} callbackArray
   * @param {*} [cb] (err, result) 이렇게 두가지의 매개변수를 전달받을 콜백을 넣어주면된다.
   * @memberof AsyncLib
   */
  shWaterFall(
    initial: { [key: string]: any },
    callbackArray: Array<(params?: any) => any>,
    cb?: any
  ) {
    /**
     * @description 콜백 함수 리스트를 전달받아서 순차적으로 실행
     */
    const g: Generator = function* (this: AsyncLib) {
      this.constant(initial); // shWaterfall의 첫번째 인수로 전달받은 초기값을 기반으로 state초기화
      for (let callback of callbackArray) {
        // callbackArray는 결국 Array 형태이기에 이터레이션 프로토콜을 준수하고 있기에 for...of 사용 가능
        yield (async (
          genObj: Generator,
          promise: (params?: { [key: string]: any }) => Promise<any>
        ) => {
          // 첫번째 매개변수로는 자기자신 제너레이터를 전달받고, 두번째 매개변수로 promise 함수를 전달받는다. callbackArray가 끝나면 결국 이터레이터는 종료
          try {
            // promise 결과값을 result 변수에 할당
            const result = await promise(this.state);
            // 결과값을 인스턴스의 state에 할당해준다.
            this.state = result;
            // 그리고 결과값을 다음 콜백함수의 파라미터로 넘겨준다.
            genObj.next(result);
          } catch (err) {
            console.log("errorZZz", err);
            // 에러시에는 첫번째 인수에 err를 전달하여 에러에 대한 응답 반환을 처리한다.
            return cb(err, null);
          }
        })(g, callback); // IIFE이기에 매개변수를 직접 내가 할당해주었다. 제너레이터함수는 호출하면 제너레이터를 반환
      }
      // 에러없이 정상적으로 실행되었을 경우에 현재 파라미터에는 모든 콜백을 돌고돌아 오버라이딩되고 추가된 파라미터들이 담긴 결과 object가 있을 것이다.
      // 이걸 전달받은 콜백함수의 두번째 인수로 전달해준다.
      return cb(null, this.state);
    }.call(new AsyncLib()); // this에 AsyncLib을 넣어주어 State 참조하게 만든다.

    // 초기에는 한번 정적으로 실행해준 코드를 넣어주었다. 어짜피 처음 제너레이터 오브젝트의 next메소드에는 아무것도 전달할 수 없다.
    g.next();
  }
}

// 생성자 함수를 사용하여 instance를 내보내준다.
export default new AsyncLib();
