const res2: number[] = [];

function fn1(cb: any) {
  setTimeout(function () {
    res2.push(1);
    return cb(fn3);
  }, 3000);
}

function fn2(cb: any) {
  setTimeout(function () {
    res2.push(2);
    return cb();
  }, 2000);
}

function fn3() {
  setTimeout(function () {
    res2.push(3);
    console.log(res2);
  }, 1000);
}

function fn4() {
  setTimeout(function () {
    res2.push(4);
    console.log(res2);
  }, 1000);
}

fn1(fn2);

export {};
