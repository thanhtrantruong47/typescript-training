const printUser = (email: string, age: number) => {
  console.log("my name is " + email.toUpperCase());
  console.log("my age is " + age);
};

printUser("thanh", 23);

const callback = async (): Promise<void> => {
  console.log(123);
  await setTimeout(() => printUser("asdasd", 123), 2000);
  console.log(3);
};

callback();

const arrNumber = [1, 2, 3, 4, 5, 6];

arrNumber.forEach((a) => {
  console.log(a + 5);
});
