const arrNum: number[] = [1, 5, 4, 3, 2, 4, 5];

const arrStr: string[] = ["thanh", "tran"];

// define array with arr[0] is string and arr[1] is number
function doSomething(pair: [string, number]) {
  const a = pair[0];

  const b = pair[1];

  console.log(a);
  console.log(b);
}

doSomething(["hello", 42]);

for (let i = 0; i < arrNum.length; i++) {
  console.log(arrNum[i]);
}

for (let i = 0; i < arrStr.length; i++) {
  console.log(arrStr[i]);
}
