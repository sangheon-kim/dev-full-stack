{
  // 제너레이터는 이터레이션 프로토콜을 준수해 이터러블을 생성하는 방식보다 훨씬 간단하게 구현 가능하다.
  const createInfinityByIteration = function () {
    let i = 0;

    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        return { value: ++i };
      },
    };
  };

  for (const n of createInfinityByIteration()) {
    if (n > 5) break;
    console.log(n); // 1,2,3,4,5
  }

  // 훨씬 간결해졌다.
  function* createInfinityByGenerator() {
    let i = 0;
    while (true) {
      yield ++i;
    }
  }

  for (const n of createInfinityByGenerator()) {
    if (n > 5) break;
    console.log(n); // 1,2,3,4,5
  }
}

{
  // 1, 2까지만 반환해보자.
  const counterByIteration = () => {
    let i = 0;

    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        console.log(`${i + 1}번째 호출`);
        return i < 2 ? { value: ++i, done: false } : { value: undefined, done: true };
      },
    };
  };

  const iter1 = counterByIteration();
  console.log(iter1.next()); // 1번째 호출 { value: 1, done: false }
  console.log(iter1.next()); // 2번째 호출 { value: 2, done: false }
  console.log(iter1.next()); // 3번째 호출 { value: undefined, done: true }

  function* counter() {
    console.log("첫번째 호출");
    yield 1;
    console.log("두번째 호출");
    yield 2;
    console.log("세번째 호출");
  }

  const generatorObj = counter();
  console.log(generatorObj.next()); // 첫번째 호출 { value: 1, done: false }
  console.log(generatorObj.next()); // 두번째 호출 { value: 2, done: false }
  console.log(generatorObj.next()); // 세번째 호출 { value: undefined, done: true }
}

/**
 *
 * 제너레이터는 이터러블(Symbol.iterator를 갖고있다.)이면서
 * 동시에 이터레이터인(next메서드를 가지고
 * next메서드 사용시 이터레이터 리절트 객체를 반환) 객체이다.
 *
 */

{
  // 제너레이터 함수 정의
  function* counter() {
    for (const v of [1, 2, 3]) {
      console.log(`${v}번째 호출`);
      yield v;
    }
  }

  // 제너레이터 함수를 호출하면 제너레이터를 반환한다.
  let generateObj = counter();

  // 제너레이터는 이터러블이다. (Symbol.iterator를 갖고 있다.)
  console.log(Symbol.iterator in generateObj); // true

  // 이터러블이기 때문에 for...of 문 순회 가능.
  for (const i of generateObj) {
    console.log(i);
  }

  generateObj = counter(); // 제너레이터 함수를 실행하여, 다시 이터레이터를 할당한다.

  // 제너레이터는 이터레이터다.(Next 메서드를 가지고 있다.)
  console.log("next" in generateObj); // true

  console.log(generateObj.next()); // 1번째 호출 { value: 1, done: false }
  console.log(generateObj.next()); // 2번째 호출 { value: 2, done: false }
  console.log(generateObj.next()); // 3번째 호출 { value: 3, done: false }
  console.log(generateObj.next()); // { value: undefined, done: true }
}

{
  // 제너레이터 함수 선언문
  function* genDecFunc() {
    yield 1;
  }

  let generatorObj = genDecFunc();

  // 제너레이터 함수 표현식
  const getExpFunc = function* () {
    yield 1;
  };

  generatorObj = getExpFunc();

  // 제너레이터 메소드
  const obj = {
    *generatorObjMethod() {
      yield 1;
    },
  };

  generatorObj = obj.generatorObjMethod();

  // 제너레이터 클래스 메소드
  class MyClass {
    *generatorClsMethod() {
      yield 1;
    }
  }

  const myClass = new MyClass();
  generatorObj = myClass.generatorClsMethod();
}

// 제너레이터 함수의 호출과 제너레이터 객체
/**
 *
 * 제너레이터 함수 호출시 제너레이터 함수 코드 블록이 실행되는 것이 아닌 제너레이터 객체를 반환한다.
 * next 메서드를 호출하기 위해
 * Symbol.iterator 메서드로 이터레이터를 별도 생성할 필요가 없다
 */

{
  function* counter() {
    console.log("Point 1");
    yield 1; // 첫번째 next 메서드 호출시 여기까지 실행된다.
    console.log("Point 2");
    yield 2; // 두번째 next 메서드 호출시 여기까지 실행된다.
    console.log("Point 3");
    yield 3; // 세번째 next 메서드 호출시 여기까지 실행된다.
    console.log("Point 4"); // 네번째 next 메서드 호출시 여기까지 실행된다.
  }

  // 제너레이터 함수 호출시 제너레이터 객체 반환
  // 제너레이터 객체는 이터러블이면서 동시에 이터레이터이다.
  //
  const generatorObj = counter();
  console.log(generatorObj.next()); // Point 1 { value: 1, done: false }
  console.log(generatorObj.next()); // Point 2 { value: 2, done: false }
  const iter = generatorObj[Symbol.iterator]();
  console.log(iter.next()); // Point 3 { value: 3, done: false }
  console.log(iter.next()); // Point 4 { value: undefined, done: true }
  console.log(iter.next()); // { value: undefined, done: true }
}

/**
 * 제너레이터 함수가 생성한 제너레이터 객체는 처음 next 메서드 호출 시 처음 만나는 yield 문까지 실행되고 일시 중단.
 * 또 다시 next 메서드 호출 시 중단된 위치에서 시작해서 다음 yield까지 실행되고 일시 중단.
 *
 * start -> generatorObj.next() -> yield 1 => generatorObj.next() -> yield 2 -> ... -> end
 */
// 이터러블 구현
{
  const infiniteFibonacci = (max: number) => {
    let [pre, cur] = [0, 1];

    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        [pre, cur] = [cur, pre + cur];
        if (cur < max) {
          return { value: cur };
        } else {
          return { done: true };
        }
      },
    };
  };

  for (const num of infiniteFibonacci(10000)) {
    console.log(num);
  }

  const infiniteFibonacciGen = function* (max: number) {
    let [pre, cur] = [0, 1];

    while (true) {
      [pre, cur] = [cur, pre + cur];
      if (cur <= max) yield cur;
    }
  };

  for (const num of infiniteFibonacciGen(10000)) {
    console.log(num);
  }
}

const fetch = require("node-fetch");

function getUser(genObj: Generator, username: string) {
  fetch(`https://api.github.com/users/${username}`)
    .then((res: Response) => res.json())
    .then((user: any) => {
      genObj.next(user.name);
    });
}

const g: any = function* () {
  let user;

  user = yield getUser(g, "jeresig");
  console.log(user);

  user = yield getUser(g, "ahejlsberg");
  console.log(user);

  user = yield getUser(g, "sangheon-kim");
  console.log(user);
};

g().next();

{
  const fetch = require("node-fetch");

  function getUser(genObj: any, username: any) {
    fetch(`https://api.github.com/users/${username}`)
      .then((res: any) => res.json())
      // ① 제너레이터 객체에 비동기 처리 결과를 전달한다.
      .then((user: any) => genObj.next(user.name));
  }

  // 제너레이터 객체 생성
  const g: any = (function* () {
    let user;
    // ② 비동기 처리 함수가 결과를 반환한다.
    // 비동기 처리의 순서가 보장된다.
    user = yield getUser(g, "jeresig");
    console.log(user); // John Resig

    user = yield getUser(g, "ahejlsberg");
    console.log(user); // Anders Hejlsberg

    user = yield getUser(g, "sangheon-kim");
    console.log(user); // Ungmo Lee
  })();

  // 제너레이터 함수 시작
  g.next();
}

{
  const fetch = require("node-fetch");

  // Promise를 반환하는 함수 정의
  function getUser(username: string) {
    return fetch(`https://api.github.com/users/${username}`)
      .then((res: Response) => res.json())
      .then((user: any) => user.name);
  }

  async function getUserAll() {
    let user;
    user = await getUser("jeresig");
    console.log(user);

    user = await getUser("ahejlsberg");
    console.log(user);

    user = await getUser("sangheon-kim");
    console.log(user);
  }

  getUserAll();
}

export {};
