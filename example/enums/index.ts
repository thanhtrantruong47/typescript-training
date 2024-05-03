enum Message {
  EMAIL = "Email not format",
  PASSWORD = "Password not format",
}

const login = (user: { email: string; password: string }) => {
  let ms = Message;
  return user.email.length < 8  ? ms.EMAIL : ""
};


console.log(login({ email: "", password: "123123123123213" }))