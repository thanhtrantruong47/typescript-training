import User from 'scripts/types/user';
import {
  displayHeadTable,
  displayTableEmpty,
  displayUser,
} from 'scripts/templates/user';
import { isUserExist } from 'scripts/helpers/checkUser';
import { trimInputValues } from 'scripts/helpers/trimValue';
import { validateForm } from 'scripts/validates/validate';
import { MESSAGE_ERROR, MESSAGE_SUCCESS } from 'scripts/constants/message';
import { toastMessage } from 'scripts/helpers/toast';
import { NO_USERS, USER_NOT_FOUND } from 'scripts/constants/notification';

class UserView {
  btn: HTMLButtonElement;
  form: HTMLFormElement;
  tableUser: HTMLTableElement;
  errorMessage: HTMLElement[];
  row: HTMLTableRowElement | null;
  toast: HTMLElement;
  fields: HTMLInputElement[];
  search: HTMLFormElement;

  constructor() {
    // Initialize DOM elements
    this.btn = document.querySelector('.btn-add') as HTMLButtonElement;
    this.form = document.querySelector('.form-primary') as HTMLFormElement;
    this.tableUser = document.querySelector('.table-user') as HTMLTableElement;
    this.errorMessage = Array.from(document.querySelectorAll('span'));
    this.row = null;
    this.toast = document.querySelector('.toast');
    this.fields = Array.from(document.querySelectorAll('input'));
    this.search = document.querySelector('.form-secondary') as HTMLFormElement;
  }

  // Toggle form visibility and reset form fields
  toggleForm = (action: 'add' | 'edit') => {
    this.form.classList.toggle('hidden');
    this.form.reset();

    const button = this.form.querySelector('button');
    const title = this.form.querySelector('.title');
    this.errorMessage.forEach((span) => {
      span.textContent = '';
    });

    this.fields.forEach((input) => {
      input.classList.remove('field-error');
    });

    if (button && title) {
      if (action === 'add') {
        button.textContent = 'Create User';
        title.textContent = 'Add User';
      } else {
        button.textContent = 'Update User';
        title.textContent = 'Update User';
      }
    }
  };

  // Handle form submission for adding or updating users
  handleFormSubmit = async (
    e: Event,
    action: 'Create User' | 'Update User',
    handle: Function
  ) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const buttonAdd = this.form.querySelector('.btn-update')?.textContent;

    if (target.classList.contains('btn')) {
      trimInputValues(this.form);

      const isValid = validateForm(this.form, this.errorMessage);

      if (!isValid) return;

      const formData = new FormData(this.form);
      const valueFields = Object.fromEntries(formData);

      const user: User = {
        email: valueFields.email as string,
        password: valueFields.password as string,
        first_name: valueFields.first_name as string,
        last_name: valueFields.last_name as string,
        phone_number: valueFields.phone as string,
      };

      if (buttonAdd === 'Create User' && action === 'Create User') {
        if (!isUserExist(user.email)) {
          toastMessage(this.toast, MESSAGE_ERROR.ACCOUNT_EXIST, 'toast__error');
          return;
        }

        this.tableUser.querySelector('.empty-table')?.classList.add('hidden');
        const data = await handle(user);
        toastMessage(
          this.toast,
          MESSAGE_SUCCESS.CREATE_SUCCESS,
          'toast__success'
        );
        this.form.classList.toggle('hidden');
        this.tableUser.innerHTML += displayUser(
          data,
          Number(localStorage.getItem('maxId'))
        );
      } else {
        await handle(localStorage.getItem('id'), user);
        toastMessage(
          this.toast,
          MESSAGE_SUCCESS.UPDATE_SUCCESS,
          'toast__success'
        );
        this.form.classList.toggle('hidden');
        if (this.row) {
          this.updateUserRow(user);
        }
      }
    }
  };

  // Update user details in the table row
  updateUserRow = (user: User): void => {
    if (this.row) {
      this.row.querySelector('.firstName-content')!.textContent =
        user.first_name;
      this.row.querySelector('.lastName-content')!.textContent = user.last_name;
      this.row.querySelector('.phone-content')!.textContent = user.phone_number;
    }
  };

  // Bind event to toggle add new user form
  bindToggleAddNew = (): void => {
    this.btn.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleForm('add');
    });
  };

  // Bind event to toggle edit user form
  bindToggleEdit = (): void => {
    this.tableUser.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      if (target.classList.contains('action-edit')) {
        this.row = target.closest('tr');
        localStorage.setItem('id', target.getAttribute('data-id'));
        this.toggleForm('edit');
      }
    });
  };

  // Bind event to close the form
  bindCloseForm = (): void => {
    this.form.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target as HTMLButtonElement;
      if (target.classList.contains('btn-close')) {
        this.form.classList.toggle('hidden');
        this.form.reset();
      }
    });
  };

  // Bind event to add a new user
  bindAdd = async (handle: Function): Promise<void> => {
    this.form.addEventListener('click', async (e) => {
      this.handleFormSubmit(e, 'Create User', handle);
    });
  };

  // Bind event to edit an existing user
  bindEdit = (handle: Function): void => {
    this.form.addEventListener('click', (e) =>
      this.handleFormSubmit(e, 'Update User', handle)
    );
  };

  // Bind event to delete a user
  bindDelete = (handle: Function): void => {
    this.tableUser.addEventListener('click', async (e) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      if (target.classList.contains('action-delete')) {
        localStorage.setItem(
          'maxId',
          (parseInt(localStorage.getItem('maxId') || '0') - 1).toString()
        );
        if (localStorage.getItem('maxId') === '0') {
          this.tableUser
            .querySelector('.empty-table')
            .classList.remove('hidden');
          this.tableUser.querySelector('.empty-table').textContent = NO_USERS;
        }
        const userId = target.getAttribute('data-id');
        const row = target.closest('tr');
        localStorage.removeItem(`email ${userId}`);
        handle(userId);
        row?.remove();
        toastMessage(
          this.toast,
          MESSAGE_SUCCESS.DELETE_SUCCESS,
          'toast__success'
        );
      }
    });
  };

  // Bind event to get user details for editing
  bindGetDetail = (handle: Function): void => {
    this.tableUser.addEventListener('click', async (e) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      if (target.classList.contains('action-edit')) {
        const userId = target.getAttribute('data-id');
        const data = await handle(userId);
        this.form.email.value = data.email;
        this.form.password.value = data.password;
        this.form.fname.value = data.first_name;
        this.form.lname.value = data.last_name;
        this.form.phone.value = data.phone_number;
      }
    });
  };

  // Bind event to display all users
  bindDisplay = async (users: Function): Promise<void> => {
    localStorage.clear();
    const data: User[] = await users();
    let tableHTML = displayHeadTable;
    tableHTML += displayTableEmpty('');
    if (data.length > 0) {
      data.forEach((user: User, index: number) => {
        tableHTML += displayUser(user, index);
      });
    } else {
      tableHTML += displayTableEmpty(NO_USERS);
    }
    this.tableUser.innerHTML = tableHTML;
  };

  bindSearch = (handle: Function) => {
    this.search.addEventListener('keypress', async (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const valueSearch = this.search.querySelector('input').value;
        const data: User[] = await handle(valueSearch);
        let tableHTML = displayHeadTable;
        if (data.length > 0) {
          data.forEach((user: User, index: number) => {
            tableHTML += displayUser(user, index);
          });
          this.tableUser.innerHTML = tableHTML;
        } else {
          tableHTML += displayTableEmpty(USER_NOT_FOUND);
        }
        this.tableUser.innerHTML = tableHTML;
      }
    });
  };
}

export default UserView;
