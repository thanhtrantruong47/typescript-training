import { UserModel } from "@/models/user"

class Userservice {
  user: UserModel

  constructor(user : UserModel) {
    this.user = user
  }

  static addUser = () => {
    console.log()
  }
}

export default Userservice