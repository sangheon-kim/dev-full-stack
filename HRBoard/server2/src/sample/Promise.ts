/**
 *
 * @description 해당 시간만큼 딜레이 해주는 Promise를 리턴해주는 함수
 * @param {number} num (넘겨줄 값)
 * @param {number} delayTime (지연 시간)
 * @returns
 */
function delayFunc(num: number, delayTime: number): any {
  // new 연산자를 통해서 Promise 인스턴스 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num);
    }, delayTime);
  });
}

// requestData1,2는 PromiseInstance다. 결국 함수 타입이 아니라서 호출이 불가능하다. 변수에 할당된 값이 Promise 인스턴스라서 호출을 할 수 없다. requestData1.then, requestData2.then이런식으로 사용하자.
const requestData1: Promise<number> = delayFunc(1, 3000);

const requestData2: Promise<number> = new Promise((resolve) => setTimeout(() => resolve(2), 2000));

// 위와 다른점은 requestData3,4는 프로미스 인스턴스를 반환해주는 함수다. 따라서 Promise 인스턴스를 반환받아서 then, catch등을 써주려면 requestData3().then(), requestData4().then() 이런식으로 사용하자.
const requestData3: () => Promise<number> = () => delayFunc(3, 1000);
const requestData4: () => Promise<number> = () => new Promise((resolve) => setTimeout(() => resolve(4), 500));

function promiseOnly() {
  const res: number[] = [];

  // requestData1은 Promise 타입 인스턴스기에 호출할 필요없이 requestData1안에 있는 Prototype 생성자함수의 프로토타입 메서드인 then을 사용하면 된다. 인스턴스는 결국 생성자함수의 프로토타입 프로퍼티에 정의되어있는것들을 사용할 수 있기 때문에~
  requestData1
    .then((data: any) => {
      console.log("1번 프로미스 실행 resolve 데이터", data); // 1번 프로미스 실행 resolve 데이터 1
      res.push(data); // 1을 넣어준다.
      return requestData2; // 그리고 requestData2(Promise인스턴스)를 넘겨준다.
    }) // then을 호출하면 return 타입으로 Promise인스턴스를 반환해준다. 그래서 무한정 꼬리물기가 가능하다.
    .then((data: number) => {
      console.log("2번 프로미스 실행 resolve 데이터", data); // 2번 프로미스 실행 resolve 데이터 2
      res.push(data); // 2를 넣어준다.
      // requestData3은 프로미스 인스턴스를 반환해주는 함수이기에 호출을 해줘서 반환해줘야한다.
      return requestData3();
    })
    .then((data: number) => {
      console.log("3번 프로미스 실행 resolve 데이터", data); // 3번 프로미스 실행 resolve 데이터 3
      res.push(data); // 배열에 3넣어준다.
      return requestData4();
    })
    .then((data: number) => {
      console.log("4번 프로미스 실행 resolve 데이터", data); // 에러 안나면 4번 프로미스 실행 resolve 데이터 4
      res.push(data); // 배열에 4를 넣어준다.
    })
    .then(() => {
      // 리턴해주고 있는것이 없어서 매개변수를 별도로 지정하지 않는다.
      return 1; // 1을 리턴해줘본다.
    }) // then을 통해서 1을 리턴해주는 promise인스턴스를 반환해준다.
    .then((data: number) => {
      console.log("위에서 뭐가 내려왔나", data); // 1
      console.log("배열", res); // 배열, [ 1, 2, 3, 4 ]
      console.log("끝");
    }) // then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    // 위에 then의 타입을 써놓았는데 이걸로보아, then에 리턴을 안해줘도 결국은 Promise인스턴스를 리턴해줘서 끊임없이 then을 쓸 수 있는 것 같다.
    .catch((err: Error) => console.error(err))
    .finally(() => console.log("에러가 나든말든 finally는 탄다"));
}

promiseOnly();

export {};
