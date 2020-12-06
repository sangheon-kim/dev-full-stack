// {
//   const res: number[] = [];
//   const asyncIterator = (f: number, t: number) => {
//     const asyncCreateIterator = () => {
//       let from = f,
//         to = t;

//       return {
//         [Symbol.asyncIterator]() {
//           return this;
//         },
//         async next() {
//           console.log(`1번 프로미스 실행 resolve 데이터 ${to}, ${to + 1 - from}초 딜레이`);
//           await new Promise((resolve) => setTimeout(resolve, (to + 1 - from) * 1000));

//           if (from <= to) {
//             return { done: false, value: from++ };
//           } else {
//             return { done: true };
//           }
//         },
//       };
//     };

//     const asyncExecute = async () => {
//       for await (let value of asyncCreateIterator()) {
//         res.push(value as number);
//       }

//       console.log(res);
//     };

//     asyncExecute();
//   };

//   asyncIterator(1, 4);
// }

{
  const res: any = [];

  const asyncGenerator = (f: number, t: number) => {
    const asyncCreateGenerator = () => {
      let from = f,
        to = t;
      return {
        async *[Symbol.iterator]() {
          while (from < to) {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            yield from;
            from++;
          }
        },
      };
    };

    const asyncExecute = async () => {
      for await (let value of asyncCreateGenerator() as any) {
        res.push(value);
      }
      console.log(res);
    };

    asyncExecute();
  };
  asyncGenerator(1, 5);
}
