import UserService from 'scripts/services/user';
import UserView from 'scripts/views/user';

class UserController {
  view: UserView;
  service: UserService;
  constructor(view: UserView, service: UserService) {
    this.view = view;
    this.service = service;
  }

  init = async () => {
    this.view.bindToggleAddNew();
    this.view.bindCloseForm();
    this.view.bindAdd()
    await this.view.bindDisplay(this.handleDisplayUser);
  }

  handleAdd = () => {
    this.view.bindAdd();
  };

  handleDisplayUser = async () => {
    return await UserService.getAllUser();
  };
}

export default UserController;
