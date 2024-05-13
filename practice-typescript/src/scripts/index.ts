import UserController from 'scripts/controllers/user';
import UserView from 'scripts/views/user';
import UserService from 'scripts/services/user';

document.addEventListener('DOMContentLoaded', () => {
  localStorage.clear()
  const userController = new UserController(new UserView(), new UserService());
  userController.init();
});
