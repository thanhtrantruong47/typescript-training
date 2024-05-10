import UserService from 'scripts/services/user';
import UserView from 'scripts/views/user';
import User from 'scripts/types/user';

class UserController {
  view: UserView;
  service: UserService<User>;
  constructor(view: UserView, service: UserService<User>) {
    this.view = view;
    this.service = service;

    this.handleDisplayUser()
  }

  init = async () => {
    this.view.bindToggleAddNew();
    this.view.bindCloseForm();
    this.view.bindAdd(this.handleCreate)
    await this.view.bindDisplay();
    this.view.bindDelete(this.handleDelete)
    this.view.bindEdit(this.handleEdit)
    this.view.bindToggleEdit()

  }

  handleDisplayUser = async () => {
    const data = await this.service.getAll();
    localStorage.setItem('userData', JSON.stringify(data));
    return localStorage.getItem('userData')
  };

  handleCreate = async (data: User) => {
    await this.service.create(data);
  }

  handleDelete = async (id: string) => {
    await this.service.delete(id)
  }

  handleEdit = async (id: string, data: User) =>  {
    await this.service.update(id,data)
  }
}

export default UserController;
