import UserService from 'scripts/services/user';
import UserView from 'scripts/views/user';
import { UserModel } from 'scripts/models/user';

/**
 * The UserController class handles user-related operations by coordinating between the view and the service.
 */
class UserController {
  view: UserView;
  service: UserService;

  constructor(view: UserView, service: UserService) {
    this.view = view;
    this.service = service;
  }

  /**
   * Initializes the user controller by binding various events to their respective handlers.
   */
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

  /**
   * Handles getting all users.
   * @returns {Promise<UserModel[]>} A promise that resolves to an array of UserModel objects.
   */
  handleGetUsers = async (): Promise<UserModel[]> => {
    return await this.service.getAll();
  };

  /**
   * Handles creating a new user.
   * @param {UserModel} data - The user data to create.
   * @returns {Promise<UserModel>} A promise that resolves to the created UserModel object.
   */
  handleCreate = async (data: UserModel): Promise<UserModel> => {
    return await this.service.create(data);
  };

  /**
   * Handles deleting a user by ID.
   * @param {string} id - The ID of the user to delete.
   * @returns {Promise<void>} A promise that resolves once the deletion is complete.
   */
  handleDelete = async (id: string): Promise<void> => {
    await this.service.delete(id);
  };

  /**
   * Handles updating a user by ID.
   * @param {string} id - The ID of the user to update.
   * @param {UserModel} data - The updated user data.
   * @returns {Promise<void>} A promise that resolves once the update is complete.
   */
  handleEdit = async (id: string, data: UserModel): Promise<void> => {
    await this.service.update(id, data);
  };

  /**
   * Handles getting a user by ID.
   * @param {string} id - The ID of the user to retrieve.
   * @returns {Promise<UserModel>} A promise that resolves to the retrieved UserModel object.
   */
  handleGetById = async (id: string): Promise<UserModel> => {
    return await this.service.getById(id);
  };

  /**
   * Handles searching users by name.
   * @param {string} name - The name to search for.
   * @returns {Promise<UserModel[]>} A promise that resolves to an array of UserModel objects matching the search criteria.
   */
  handleSearchByName = async (name: string): Promise<UserModel[]> => {
    return await this.service.searchUserByName(name);
  };
}

export default UserController;
