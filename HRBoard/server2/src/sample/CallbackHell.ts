const res: number[] = [];

function fn1() {
  setTimeout(function () {
    let data = 1;
    console.log("1번 데이터", data); // 1번
    res.push(data++);
    return (function (result: number) {
      setTimeout(function () {
        let data = result;
        console.log("2번 데이터", data); // 2번
        res.push(data++);
        return (function (result: number) {
          setTimeout(function () {
            let data = result;
            console.log("3번 데이터", data); // 3번
            res.push(data++);
            return (function (result: number) {
              setTimeout(function () {
                let data = result;
                console.log("4번 데이터", data); // 4번
                res.push(data);
                console.log(res);
              }, 500);
            })(data);
          }, 1000);
        })(data);
      }, 2000);
    })(data);
  }, 3000);
}

fn1();

export {};
