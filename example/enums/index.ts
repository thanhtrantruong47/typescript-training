enum Message {
  EMAIL = "Email not format",
  PASSWORD = "Password not format",
}

const login = (user: { email: string; password: string }) => {
  let ms = Message;
  return user.email.length < 8 ? ms.EMAIL : "";
};

console.log(login({ email: "", password: "123123123123213" }));

enum X {
  A = 1,
  B,
  C,
  D = 5,
  F,
  E,
  G,
  H,
}

console.log(typeof(X))