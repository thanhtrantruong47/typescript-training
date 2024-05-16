import UserService from 'scripts/services/user';
import UserView from 'scripts/views/user';
import { UserModel } from 'scripts/models/user';

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
    this.view.bindAdd(this.handleCreate);
    await this.view.bindDisplay(this.handleGetUsers);
    this.view.bindDelete(this.handleDelete);
    this.view.bindEdit(this.handleEdit);
    this.view.bindToggleEdit();
    this.view.bindGetDetail(this.handleGetById);
    this.view.bindSearch(this.handleSearchByName);
  };

  handleGetUsers = async (): Promise<UserModel[]> => {
    return await this.service.getAll();
  };

  handleCreate = async (data: UserModel): Promise<UserModel> => {
    const user = await this.service.create(data);
    return user;
  };

  handleDelete = async (id: string): Promise<void> => {
    await this.service.delete(id);
  };

  handleEdit = async (id: string, data: UserModel): Promise<void> => {
    await this.service.update(id, data);
  };

  handleGetById = async (id: string): Promise<UserModel> => {
    return await this.service.getById(id);
  };

  handleSearchByName = async (email: string): Promise<any> => {
    const data = await this.service.searchUserByName(email);
    console.log(data)
    return data;
  };
}

export default UserController;
