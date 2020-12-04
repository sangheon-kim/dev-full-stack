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

async function asyncOnly() {
  try {
    const res: number[] = [];
    const result1 = await requestData1;
    console.log("1번 프로미스 실행 resolve 데이터", result1); // 1번 프로미스 실행 resolve 데이터 1
    res.push(result1); // 1을 넣어준다.
    const result2 = await requestData2;
    console.log("2번 프로미스 실행 resolve 데이터", result2); // 1번 프로미스 실행 resolve 데이터 1
    res.push(result2); // 1을 넣어준다.
    const result3 = await requestData3();
    console.log("3번 프로미스 실행 resolve 데이터", result3); // 1번 프로미스 실행 resolve 데이터 1
    res.push(result3); // 1을 넣어준다.
    const result4 = await requestData4();
    console.log("4번 프로미스 실행 resolve 데이터", result4); // 1번 프로미스 실행 resolve 데이터 1
    res.push(result4); // 1을 넣어준다.
  } catch (err) {
    console.error(err);
  } finally {
    console.log("에러가 나든말든 finally는 탄다");
  }
}

asyncOnly();

// export {};
