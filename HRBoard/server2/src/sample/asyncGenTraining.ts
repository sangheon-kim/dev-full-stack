{
  // 일반 이터러블/이터레이션 프로토콜 규약 맺는 이터레이터생성
  let range = {
    from: 1,
    to: 5,

    [Symbol.iterator]() {
      return {
        current: this.from,
        last: this.to,

        next() {
          if (this.current <= this.last) {
            return { done: false, value: this.current++ };
          } else {
            return { done: true };
          }
        },
      };
    },
  };

  for (let value of range) {
    console.log(value);
  }
}

{
  let range = {
    from: 1,
    to: 5,

    [Symbol.asyncIterator]() {
      return {
        current: this.from,
        last: this.to,

        // 일반 next가 아닌 async next() 프로토타입 메서드 정의
        async next() {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          if (this.current <= this.last) {
            return { done: false, value: this.current++ };
          } else {
            return { done: true };
          }
        },
      };
    },
  };

  const rangeExecute = async () => {
    for await (let value of range) {
      console.log(value);
    }
  };

  rangeExecute();
}
