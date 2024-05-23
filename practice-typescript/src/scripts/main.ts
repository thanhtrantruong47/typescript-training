import UserController from 'scripts/controllers/user';
import UserView from 'scripts/views/user';
import UserService from 'scripts/services/user';

document.addEventListener('DOMContentLoaded', () => {
  // Clear localStorage to ensure a clean state
  localStorage.clear();

  // Create instances of UserController, UserView, and UserService
  const userController = new UserController(new UserView(), new UserService());

  // Initialize user-related functionality
  userController.init();
});
