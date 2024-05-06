// function identity(arg: number): number {
//   return arg;
// }

// function identity(arg: any): any {
//   return arg;
// }

function identity<Type>(arg: Type[]): Type[] {
  console.log(arg.length);
  return arg;
}

let output = identity(["thanh", 123, true, "123123"]);

console.log(output);

