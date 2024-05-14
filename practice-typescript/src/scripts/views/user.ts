import User from 'scripts/types/user';
import { displayHeadTable, displayUser } from 'scripts/templates/user';
import { isUserExist, trimInputValues } from 'scripts/helpers/helper';
import { validateForm } from 'scripts/validates/validate';
import { MESSAGE_ERROR, MESSAGE_SUCCESS } from 'scripts/constants/message';

class UserView {
  btn: HTMLButtonElement;
  form: HTMLFormElement;
  tableUser: HTMLTableElement;
  errorMessage: HTMLElement[];
  row: HTMLTableRowElement;

  constructor() {
    this.btn = document.querySelector('.btn-add') as HTMLButtonElement;
    this.form = document.querySelector('.form-primary') as HTMLFormElement;
    this.tableUser = document.querySelector('.table-user') as HTMLTableElement;
    this.errorMessage = Array.from(document.querySelectorAll('span'));
  }

  bindToggleAddNew = (): void => {
    this.btn.addEventListener('click', (e) => {
      e.preventDefault();
      this.form.classList.toggle('hidden');
      const button = this.form.querySelector('button');
      const title = this.form.querySelector('.title');
      this.form.reset();

      if (button && title) {
        button.textContent = 'Create User';
        title.textContent = 'Add User';
      }
    });
  };

  bindToggleEdit = (): void => {
    this.tableUser.addEventListener('click', async (e) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      this.row = target.closest('tr');

      if (target.classList.contains('action-edit')) {
        this.form.classList.toggle('hidden');

        const button = this.form.querySelector('button');
        const title = this.form.querySelector('.title');
        if (button && title) {
          button.textContent = 'Update User';
          title.textContent = 'Update User';
        }
      }
    });
  };

  bindCloseForm = (): void => {
    this.form.addEventListener('click', (e) => {
      e.preventDefault();
      if ((e.target as HTMLButtonElement).classList.contains('btn-close')) {
        e.preventDefault();
        this.form.classList.toggle('hidden');
        this.form.reset();
      }
    });
  };

  bindAdd = async (handle: Function, users :Function): Promise<void> => {
    this.form.addEventListener('click', async (e) => {
      e.preventDefault();
      const buttonAdd = this.form.querySelector('.btn-update')?.textContent;
      const target = e.target as HTMLElement;
      if (buttonAdd === 'Create User' && target.classList.contains('btn')) {
        const getValueInput = new FormData(this.form);
        const valueFields = Object.fromEntries(getValueInput);

        const user: User = {
          email: valueFields.email as string,
          password: valueFields.password as string,
          first_name: valueFields.first_name as string,
          last_name: valueFields.last_name as string,
          phone_number: valueFields.phone as string,
        };
        trimInputValues(this.form);

        const validateFrom = validateForm(this.form, this.errorMessage);
        if (!validateFrom) {
          return;
        } else {
          if (!isUserExist(user.email)) {
            alert(MESSAGE_ERROR.ACCOUNT_EXIST);
          } else {
            handle(user);
            await this.bindDisplay(users)
            this.tableUser.innerHTML += displayUser(
              user,
              Number(localStorage.getItem('maxId'))
            );
            alert(MESSAGE_SUCCESS.CREATE_SUCCESS);
            this.form.classList.toggle('hidden');
          }
        }
      }
    });
  };

  bindDisplay = async (users: Function): Promise<void> => {
    localStorage.clear()
    const data = await users();
    let tableHTML = displayHeadTable;
    data.map((user: User, index = 1) => {
      tableHTML += displayUser(user, index);
    });
    this.tableUser.innerHTML = tableHTML;
  };

  bindDelete = (handle: Function): void => {
    this.tableUser.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      const userId = target.getAttribute('data-id');
      const row: HTMLTableRowElement | null = target.closest('tr');

      if (target.classList.contains('action-delete')) {
        handle(userId);
        row?.remove();
      }
    });
  };

  bindGetDetail = (handle: Function): void => {
    this.tableUser.addEventListener('click', async (e) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      const userId = target.getAttribute('data-id');
      const buttonEdit = this.form.querySelector('.btn-update')?.textContent;
      const data = await handle(userId);

      if (buttonEdit === 'Update User') {
        this.form.email.value = data.email;
        this.form.password.value = data.password;
        this.form.fname.value = data.first_name;
        this.form.lname.value = data.last_name;
        this.form.phone.value = data.phone_number;
      }
    });
  };

  bindShowInfoUpdate = (user: User): void => {
    this.row.querySelector('.firstName-content').textContent = user.first_name;
    this.row.querySelector('.lastName-content').textContent = user.last_name;
    this.row.querySelector('.phone-content').textContent = user.phone_number;
  };

  bindEdit = (handle: Function): void => {
    this.form.addEventListener('click', (e) => {
      e.preventDefault();
      trimInputValues(this.form);
      const buttonEdit = this.form.querySelector('.btn-update')?.textContent;
      const target = e.target as HTMLElement;

      if (buttonEdit === 'Update User' && target.classList.contains('btn')) {
        const getValueInput = new FormData(this.form);
        const valueFields = Object.fromEntries(getValueInput);
        const user: User = {
          email: valueFields.email as string,
          password: valueFields.password as string,
          first_name: valueFields.first_name as string,
          last_name: valueFields.last_name as string,
          phone_number: valueFields.phone as string,
        };

        const check = validateForm(this.form, this.errorMessage);
        if (check) {
          handle(localStorage.getItem('id'), user);
          alert(MESSAGE_SUCCESS.UPDATE_SUCCESS);
          this.form.classList.toggle('hidden');
          this.bindShowInfoUpdate(user);
        }
      }
    });
  };
}

export default UserView;
