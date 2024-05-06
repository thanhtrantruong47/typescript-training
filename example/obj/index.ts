const printValue = (pt: { str: string; num: number }) => {
  console.log(pt.str.toLowerCase());
  console.log(pt.num);
};

printValue({ str: "thanh", num: 123 });

// optional property

const printInformationUser = (user: {
  email?: string;
  age?: number;
  address?: string;
}) => {
  console.log(user.email?.toUpperCase());
  console.log(user.age);
  console.log(user.address?.toUpperCase());
};

printInformationUser({ email: "thanh123", age: 24 });
