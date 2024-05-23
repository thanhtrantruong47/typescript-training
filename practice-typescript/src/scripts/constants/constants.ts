// Constant defining the maximum allowed length for certain input fields
const MAX_LENGTH = 12;

const BASE_URL = 'https://6645cb84b8925626f89336b4.mockapi.io';
const USERS = 'users';

// Constants for placeholder or label text used in user forms
const FIRST_NAME = 'Your first name ';
const LAST_NAME = 'Your last name ';

// Enum to define possible actions related to user management
enum ACTION {
  CREATE = 'Create User',
  UPDATE = 'Update User',
}

// Enum to define standard HTTP methods for making requests
enum HTTP_Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

// constant for class name to add or remove
const SHOW_TOAST = 'toast__show';

// Enum to define various error messages that can be displayed to the user
enum MESSAGE_ERROR {
  EMAIL_EMPTY = 'Please enter a valid email address',
  FIRST_NAME_EMPTY = 'Please enter your first name',
  LAST_NAME_EMPTY = 'Please enter your last name',
  SPECIAL_CHARACTER = 'should not include a special character',
  GREATER_THAN_LENGTH = 'cannot exceed 12 characters',
  PHONE_NUMBER = 'Please enter your phone format 0-123-456-789',
  EMPTY = '',
  ACCOUNT_EXIST = 'Username already exits',
}

// Enum to define various success messages that can be displayed to the user
enum MESSAGE_SUCCESS {
  CREATE_SUCCESS = 'Create success a new user',
  UPDATE_SUCCESS = 'Update success a user',
  DELETE_SUCCESS = 'Delete success user',
}

// Constant defining the duration (in milliseconds) for displaying messages
const TIME_MESSAGE = 3 * 1000; // 3000 milliseconds or 3 seconds

// Constant message indicating that there are no users to display
const NO_USERS = 'There is no data to display';

// Constant message indicating that a user was not found based on search criteria
const USER_NOT_FOUND = 'User was not found according to search data';

// Exporting all constants and enums so they can be used in other modules
export {
  MAX_LENGTH,
  FIRST_NAME,
  LAST_NAME,
  ACTION,
  HTTP_Method,
  MESSAGE_ERROR,
  MESSAGE_SUCCESS,
  NO_USERS,
  TIME_MESSAGE,
  USER_NOT_FOUND,
  SHOW_TOAST,
  BASE_URL,
  USERS,
};
