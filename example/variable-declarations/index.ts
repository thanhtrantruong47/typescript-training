for (let i = 0 ; i < 10 ; i++) {
  setTimeout(() => {
    console.log(i);
  }, 100 *i)
}

let input = [1, 2, 4, 5, 6, 7, 8, 10];
let first = [0, ...input];
let last = [...input, 111, 3];
console.log(last);

class C {
  p = 12;
}

function f() {
  const x = new C();
  try {
    console.log(x)
    // doSomethingWith(x);
  }
  finally {
    x[Symbol.dispose]();
    console.log(x)
  }
}