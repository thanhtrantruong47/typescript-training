enum MESSAGE_ERROR {
  EMAIL = 'Please enter a valid email address',
  FIRST_NAME = 'Please enter your first name',
  LAST_NAME = 'Please enter your last name',
  PHONE_NUMBER = 'Please enter your phone format 0-xxx-xxx-xxx',
  EMPTY = '',
  ACCOUNT_EXIST = 'Username already exits',
}

enum MESSAGE_SUCCESS {
  CREATE_SUCCESS = 'Create success a new user',
  UPDATE_SUCCESS = 'Update success a user',
  DELETE_SUCCESS = 'Delete success user',
}

const TIME_MESSAGE = 3 * 1000;

export { MESSAGE_ERROR, MESSAGE_SUCCESS, TIME_MESSAGE };
