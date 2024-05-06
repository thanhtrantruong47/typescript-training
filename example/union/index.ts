const printMyValue = (x: string | number) => {
  if (typeof x === "string") {
    console.log(x.toUpperCase());
  } else {
    console.log(typeof x);
  }
};

printMyValue(123);
printMyValue("qeqweq");

const data14: number[] = [1, 2, 4, 3, 3, 45, 4, 3, 3, 3, 3, 43, 342];

const printDataArr = (x: number[] | number) => {
  console.log("data array");
  if (Array.isArray(x)) {
    x.forEach((s) => {
      console.log(s);
    });
  } else {
    console.log("this is number" + x);
  }
};

printDataArr(data14);
printDataArr(4);
