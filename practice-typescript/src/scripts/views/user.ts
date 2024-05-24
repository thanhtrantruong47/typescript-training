import User from 'scripts/types/user';
import { isUserExist } from 'scripts/helpers/checkUser';
import { trimInputValues } from 'scripts/helpers/trimValue';
import { validateForm } from 'scripts/helpers/validate';
import {
  ACTION,
  MESSAGE_ERROR,
  MESSAGE_SUCCESS,
  NO_USERS,
  USER_NOT_FOUND,
  DISPLAY_USER,
  DISPLAY_HEAD_TABLE,
  DISPLAY_TABLE_EMPTY,
} from 'scripts/constants/user';
import { toastMessage } from 'scripts/helpers/toast';

/**
 * The UserView class manages the user interface interactions for user-related operations.
 */
class UserView {
  btn: HTMLButtonElement;
  form: HTMLFormElement;
  tableUser: HTMLTableElement;
  errorMessage: HTMLElement[];
  row: HTMLTableRowElement | null;
  toast: HTMLElement;
  fields: HTMLInputElement[];
  search: HTMLFormElement;
  overlay: HTMLDivElement;
  confirmation: HTMLElement;

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
    this.overlay = document.querySelector('.overlay') as HTMLDivElement;
    this.confirmation = document.querySelector('.confirmation') as HTMLElement;
  }

  /**
   * Toggles the visibility of the form and resets form fields.
   * @param {ACTION.CREATE | ACTION.UPDATE} action - The action type: create or update.
   */
  toggleForm = (action: ACTION.CREATE | ACTION.UPDATE) => {
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
      if (action === ACTION.CREATE) {
        button.textContent = ACTION.CREATE;
        title.textContent = ACTION.CREATE;
      } else {
        button.textContent = ACTION.UPDATE;
        title.textContent = ACTION.UPDATE;
      }
      this.overlay.classList.toggle('hidden');
    }
  };

  /**
   * Handles form submission for adding or updating users.
   * @param {Event} e - The form submission event.
   * @param {ACTION.CREATE | ACTION.UPDATE} action - The action type: create or update.
   * @param {((user: User) => Promise<User>) | ((id: string, user: User) => Promise<void>)} handle - The handler function for the action.
   */
  async handleFormSubmit(
    e: Event,
    action: ACTION.CREATE | ACTION.UPDATE,
    handle:
      | ((user: User) => Promise<User>)
      | ((id: string, user: User) => Promise<void>)
  ) {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const buttonText = this.form.querySelector('.btn-update')?.textContent;

    if (!target.classList.contains('btn')) return;
    trimInputValues(this.form);
    if (!validateForm(this.form, this.errorMessage)) return;

    const formData = new FormData(this.form);
    const valueFields = Object.fromEntries(formData);

    const user: User = {
      email: valueFields.email as string,
      first_name: valueFields.first_name as string,
      last_name: valueFields.last_name as string,
      phone_number: valueFields.phone as string,
    };

    if (buttonText === ACTION.CREATE && action === ACTION.CREATE) {
      if (!isUserExist(user.email)) {
        toastMessage(this.toast, MESSAGE_ERROR.ACCOUNT_EXIST, 'toast__error');
        return;
      }

      !this.tableUser
        .querySelector('.empty-table')
        .classList.contains('hidden') &&
        this.tableUser.querySelector('.empty-table').classList.add('hidden');
      const data = await (handle as (user: User) => Promise<User>)(user);
      toastMessage(
        this.toast,
        MESSAGE_SUCCESS.CREATE_SUCCESS,
        'toast__success'
      );
      this.form.classList.toggle('hidden');
      this.overlay.classList.toggle('hidden');
      this.tableUser.innerHTML += DISPLAY_USER(
        data,
        Number(localStorage.getItem('maxId'))
      );
    } else if (buttonText === ACTION.UPDATE && action === ACTION.UPDATE) {
      const id = localStorage.getItem('id') as string;
      await (handle as (id: string, user: User) => Promise<void>)(id, user);
      toastMessage(
        this.toast,
        MESSAGE_SUCCESS.UPDATE_SUCCESS,
        'toast__success'
      );
      this.form.classList.toggle('hidden');
      this.overlay.classList.toggle('hidden');
      if (this.row) {
        this.updateUserRow(user);
      }
    }
  }

  /**
   * Updates user details in the table row.
   * @param {User} user - The updated user data.
   */
  updateUserRow = (user: User): void => {
    if (this.row) {
      this.row.querySelector('.firstName-content')!.textContent =
        user.first_name;
      this.row.querySelector('.lastName-content')!.textContent = user.last_name;
      this.row.querySelector('.phone-content')!.textContent = user.phone_number;
    }
  };

  /**
   * Binds an event to toggle the add new user form.
   */
  bindToggleAddNew = (): void => {
    this.btn.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleForm(ACTION.CREATE);
    });
  };

  /**
   * Binds an event to toggle the edit user form.
   */
  bindToggleEdit = (): void => {
    this.tableUser.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      if (target.classList.contains('action-edit')) {
        this.row = target.closest('tr');
        localStorage.setItem('id', target.getAttribute('data-id'));
        this.toggleForm(ACTION.UPDATE);
      }
    });
  };

  /**
   * Binds an event to close the form.
   */
  bindCloseForm = (): void => {
    this.form.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target as HTMLButtonElement;
      if (target.classList.contains('btn-close')) {
        this.form.classList.toggle('hidden');
        this.form.reset();
        this.overlay.classList.toggle('hidden');
      }
    });
  };

  /**
   * Binds an event to add a new user.
   * @param {(user: User) => Promise<User>} handle - The handler function for adding a new user.
   */
  bindAdd = async (handle: (user: User) => Promise<User>): Promise<void> => {
    this.form.addEventListener('click', async (e) => {
      this.handleFormSubmit(e, ACTION.CREATE, handle);
    });
  };

  /**
   * Binds an event to edit an existing user.
   * @param {(id: string, user: User) => Promise<void>} handle - The handler function for editing an existing user.
   */
  bindEdit = (handle: (id: string, user: User) => Promise<void>): void => {
    this.form.addEventListener('click', (e) =>
      this.handleFormSubmit(e, ACTION.UPDATE, handle)
    );
  };

  /**
   * Binds an event to delete a user.
   * @param {(id: string) => Promise<void>} handle - The handler function for deleting a user.
   */
  bindDelete = (handle: (id: string) => Promise<void>): void => {
    this.tableUser.addEventListener('click', async (e) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      if (target.classList.contains('action-delete')) {
        this.confirmation.classList.remove('confirmation--hidden');
        this.overlay.classList.remove('hidden');
        const userId = target.getAttribute('data-id');

        this.bindConfirmation().then((confirmation) => {
          if (confirmation) {
            const row = target.closest('tr');
            localStorage.removeItem(`email ${userId}`);
            handle(userId);
            row?.remove();
            toastMessage(
              this.toast,
              MESSAGE_SUCCESS.DELETE_SUCCESS,
              'toast__success'
            );
            localStorage.setItem(
              'maxId',
              (parseInt(localStorage.getItem('maxId') || '0') - 1).toString()
            );
            const maxId = localStorage.getItem('maxId');
            if (maxId === '0') {
              this.tableUser
                .querySelector('.empty-table')
                .classList.remove('hidden');
            }
          }
        });
      }
    });
  };

  /**
   * Binds an event to get user details for editing.
   * @param {(id: string) => Promise<User>} handle - The handler function for getting user details.
   */
  bindGetDetail = (handle: (id: string) => Promise<User>): void => {
    this.tableUser.addEventListener('click', async (e) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      if (target.classList.contains('action-edit')) {
        const userId = target.getAttribute('data-id');
        const data = await handle(userId);
        this.form.email.value = data.email;
        this.form.fname.value = data.first_name;
        this.form.lname.value = data.last_name;
        this.form.phone.value = data.phone_number;
      }
    });
  };

  /**
   * Updates the table with user data.
   * @param {User[]} data - The array of user data.
   * @param {string} emptyMessage - The message to display when the table is empty.
   */
  bindUpdateTable = (data: User[], emptyMessage: string): void => {
    let tableHTML = DISPLAY_HEAD_TABLE;
    tableHTML += DISPLAY_TABLE_EMPTY(emptyMessage);

    if (data.length > 0) {
      data.forEach((user: User, index: number) => {
        tableHTML += DISPLAY_USER(user, index);
      });
      this.tableUser.innerHTML = tableHTML;
    } else {
      this.tableUser.innerHTML = tableHTML;
      const emptyTableElement = this.tableUser.querySelector('.empty-table');
      if (emptyTableElement && data.length === 0) {
        emptyTableElement.classList.remove('hidden');
      }
    }
  };

  /**
   * Binds confirmation functionality to the confirmation dialog.
   * Resolves a promise with a boolean value indicating whether the action is confirmed or canceled.
   * @returns A promise that resolves to a boolean value.
   */
  bindConfirmation = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      this.confirmation.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        if (target.classList.contains('btn-confirmation--remove')) {
          this.hideConfirmation();
          resolve(true);
        } else if (target.classList.contains('btn-confirmation--neutral')) {
          this.hideConfirmation();
          resolve(false);
        }
      });
    });
  };

  /**
   * Hides the confirmation dialog and overlay.
   */
  hideConfirmation(): void {
    if (!this.confirmation.classList.contains('confirmation--hidden')) {
      this.confirmation.classList.add('confirmation--hidden');
    }
    if (!this.overlay.classList.contains('hidden')) {
      this.overlay.classList.add('hidden');
    }
  }

  /**
   * Binds an event to display all users.
   * @param {() => Promise<User[]>} users - The function to retrieve all users.
   */
  bindDisplay = async (users: () => Promise<User[]>): Promise<void> => {
    localStorage.clear();
    const data: User[] = await users();
    this.bindUpdateTable(data, NO_USERS);
  };

  /**
   * Binds an event to search for users.
   * @param {(searchTerm: string) => Promise<User[]>} handle - The handler function for searching users.
   */
  bindSearch = (handle: (searchTerm: string) => Promise<User[]>): void => {
    const inputField = this.search.querySelector('input') as HTMLInputElement;
    inputField.addEventListener('input', async () => {
      const valueSearch = inputField.value;
      const data: User[] = await handle(valueSearch);
      this.bindUpdateTable(data, USER_NOT_FOUND);
    });
  };
}

export default UserView;
