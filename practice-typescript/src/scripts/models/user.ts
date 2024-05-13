interface User {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: number;
}

class UserModel {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: number;

  constructor({ email, password, first_name, last_name, phone_number }: User) {
    this.email = email;
    this.password = password;
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone_number = phone_number;
  }
}

export { UserModel, User };