import UserView from "@/views/user";

class UserController {
  view : UserView
  constructor (view: UserView) {
    this.view = view
  }

  handleAdd = () => {
    this.view.bindToggleAddNew()
  }
}

export default UserController