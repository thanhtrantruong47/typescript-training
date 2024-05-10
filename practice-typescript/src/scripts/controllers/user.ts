import UserView from "@/views/user";

class UserController {
  view : UserView;
  constructor (view: UserView) {
    this.view = view

    this.view.bindToggleAddNew();
    this.view.bindCloseForm();
  }

  handleAdd = () => {
    this.view.bindAdd()
  }
}

export default UserController