function* genFunc() {
  yield 1;
}

const arr = [1, 2, 3];
const iter1 = arr[Symbol.iterator]();

iter1.next();
for (let key of iter1) {
  console.log(key);
}

const set = new Set([1, 2, 3]);
const iter2 = set[Symbol.iterator]();

iter2.next();
for (const a of iter2) console.log(a);

const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);

const iter3 = map[Symbol.iterator]();
iter3.next();
for (const b of iter3) console.log(b);
for (const c of map.keys()) console.log(c);

const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i === 0 ? { done: true } : { value: i--, done: false };
      },
      [Symbol.iterator]() {
        return this;
      },
    };
  },
};

let iterator = iterable[Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

for (const a of iterator) console.log(a);

const arr2 = [1, 2, 3];
for (const a of arr2) console.log(a);
export {};
