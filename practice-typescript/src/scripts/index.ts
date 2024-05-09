import UserController from "./controllers/user"
import UserView from "./views/user"

document.addEventListener('DOMContentLoaded', () => {
  const userController = new UserController(new UserView)
  userController.handleAdd()
})