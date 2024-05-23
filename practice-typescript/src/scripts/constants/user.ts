import User from 'scripts/types/user';

// Constant specifying the maximum length allowed for input fields given email, first and last name
const MAX_LENGTH_FIELD = 50;

const BASE_URL = 'https://6645cb84b8925626f89336b4.mockapi.io';
const USERS = 'users';

// Enum to define possible actions related to user management
enum ACTION {
  CREATE = 'Create User',
  UPDATE = 'Update User',
}

// Enum to define standard HTTP methods for making requests
enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

// constant for class name to add or remove
const SHOW_TOAST = 'toast__show';

// Enum to define various error messages that can be displayed to the user
enum MESSAGE_ERROR {
  EMAIL_EMPTY = 'Please enter your email address',
  EMAIL_NOT_FORMAT = 'Please enter email in correct format ex: example@gmail.com ',
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

// HTML string for the header row of the user table.
const DISPLAY_HEAD_TABLE = `
  <tr>
    <td class="table-user__head table-user__head--id">#</td>
    <td class="table-user__head">Username</td>
    <td class="table-user__head">First Name</td>
    <td class="table-user__head">Last Name</td>
    <td class="table-user__head">Phone Number</td>
    <td class="table-user__head table-user__head-action">Actions</td>
  </tr>
`;

/**
 * Generates an HTML row indicating an empty table.
 * @param value The value to display in the empty table row.
 * @returns HTML string representing the empty table row.
 */
const DISPLAY_TABLE_EMPTY = (value: string) => `
  <tr>
    <td class="empty-table hidden">${value}</td>
  </tr>
`;

/**
 * Generates an HTML row for displaying user data in the table.
 * @param user The user data to display.
 * @param index The index of the user in the table.
 * @returns HTML string representing the user row.
 */
const DISPLAY_USER = (user: User, index: number): string => {
  const rowId = index + 1;
  localStorage.setItem('maxId', rowId.toString());
  localStorage.setItem(`email ${user.id}`, user.email.toString());

  // Generate and return the HTML string for the user row.
  return `<tr class="tbl-item">
            <td class="table-user__item id-content">${rowId}</td>
            <td class="table-user__item username-content">${user.email}</td>
            <td class="table-user__item firstName-content">${user.first_name}</td>
            <td class="table-user__item lastName-content">${user.last_name}</td>
            <td class="table-user__item phone-content">${user.phone_number}</td>
            <td class="table-user__item table-user__item-action">
              <a href="javascript:void(0)" class="action-edit" data-id="${user.id}">Edit</a>
              <a href="javascript:void(0)" class="action-delete" data-id="${user.id}">Delete</a>
            </td>
          </tr>`;
};

// Exporting all constants and enums so they can be used in other modules
export {
  MAX_LENGTH_FIELD,
  ACTION,
  HTTP_METHOD,
  MESSAGE_ERROR,
  MESSAGE_SUCCESS,
  NO_USERS,
  TIME_MESSAGE,
  USER_NOT_FOUND,
  SHOW_TOAST,
  BASE_URL,
  USERS,
  DISPLAY_USER,
  DISPLAY_HEAD_TABLE,
  DISPLAY_TABLE_EMPTY,
};
