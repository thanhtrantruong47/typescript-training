const data: {
  title: string;
  avatar: string[];
} = {
  title: "this is title 1",
  avatar: ["image1", "image2"],
};

const data1: any = {
  title: "this is title 2",
  avatar: ["image3", "image4"],
};

console.log(data);
console.log(data1);

// TypeScript throws an error when you try to access an undefined property like house.
console.log(data.h1);

// log undefine in type any
console.log(data1.title1);
