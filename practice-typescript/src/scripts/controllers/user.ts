import UserService from 'scripts/services/user';
import UserView from 'scripts/views/user';
import User from 'scripts/types/user';

class UserController {
  view: UserView;
  service: UserService<User>;
  constructor(view: UserView, service: UserService<User>) {
    this.view = view;
    this.service = service;
  }

  init = async () => {
    this.view.bindToggleAddNew();
    this.view.bindCloseForm();
    this.view.bindAdd(this.handleCreate);
    await this.view.bindDisplay(this.handleDisplayUser);
    this.view.bindDelete(this.handleDelete);
    this.view.bindEdit(this.handleEdit);
    this.view.bindToggleEdit();
    this.view.bindGetDetail(this.handleGetById);
  };

  handleDisplayUser = async () => {
    return await this.service.getAll();
  };

  handleCreate = async (data: User) => {
    await this.service.create(data);
  };

  handleDelete = async (id: string) => {
    await this.service.delete(id);
  };

  handleEdit = async (id: string, data: User) => {
    await this.service.update(id, data);
  };

  handleGetById = async (id: string) => {
    return await this.service.getById(id);
  };
}

export default UserController;
