import User from 'scripts/types/user';
import { displayHeadTable, displayUser } from 'scripts/templates/user';
import { isUserExist } from 'scripts/helpers/helper';

class UserView {
  btn: HTMLButtonElement;
  form: HTMLFormElement;
  tableUser: HTMLTableElement;

  constructor() {
    this.btn = document.querySelector('.btn-add') as HTMLButtonElement;
    this.form = document.querySelector('.form-primary') as HTMLFormElement;
    this.tableUser = document.querySelector('.mytable') as HTMLTableElement;
  }

  bindToggleAddNew = () => {
    this.btn.addEventListener('click', (e) => {
      e.preventDefault();
      this.form.classList.toggle('hidden');
      const button = this.form.querySelector('button');
      const title = this.form.querySelector('.title');
      if (button && title) {
        button.textContent = 'Create User';
        title.textContent = 'Add User';
      }
    });
  };

  bindToggleEdit = () => {
    this.tableUser.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      const userId = target.getAttribute('data-id') ?? '';
      localStorage.setItem('id', userId);

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

  bindCloseForm = () => {
    this.form.addEventListener('click', (e) => {
      e.preventDefault();
      if ((e.target as HTMLButtonElement).classList.contains('btn-close')) {
        e.preventDefault();
        this.form.classList.toggle('hidden');
      }
    });
  };

  bindAdd = async (handle: Function) => {
    this.form.addEventListener('click', (e) => {
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
        isUserExist(user);
        handle(user);
        this.tableUser.innerHTML += displayUser(
          user,
          Number(localStorage.getItem('maxId'))
        );
      }
    });
  };

  bindDisplay = async (users: Function) => {
    const data = await users();
    let tableHTML = displayHeadTable;
    data.map((user: User, index = 1) => {
      tableHTML += displayUser(user, index);
    });
    this.tableUser.innerHTML = tableHTML;
  };

  bindDelete = (handle: Function) => {
    this.tableUser.addEventListener('click', (e) => {
      e.preventDefault();
      const target = e.target as HTMLElement;
      const userId = target.getAttribute('data-id');
      const row: HTMLTableRowElement | null = target.closest('tr');
      console.log(row);

      if (target.classList.contains('action-delete')) {
        handle(userId);
        row?.remove();
      }
    });
  };

  bindGetDetail = (handle: Function) => {
    this.tableUser.addEventListener('click', async (e) => {
      e.preventDefault();
      const buttonEdit = this.form.querySelector('.btn-update')?.textContent;
      const data = await handle(localStorage.getItem('id'));

      if (buttonEdit === 'Update User') {
        this.form.email.value = data.email;
        this.form.password.value = data.password;
        this.form.fname.value = data.first_name;
        this.form.lname.value = data.last_name;
        this.form.phone.value = data.phone_number;
      }
    });
  };

  bindEdit = (handle: Function) => {
    this.form.addEventListener('click', (e) => {
      e.preventDefault();
      const buttonEdit = this.form.querySelector('.btn-update')?.textContent;

      if (buttonEdit === 'Update User') {
        const getValueInput = new FormData(this.form);
        const valueFields = Object.fromEntries(getValueInput);
        const user: User = {
          email: valueFields.email as string,
          password: valueFields.password as string,
          first_name: valueFields.first_name as string,
          last_name: valueFields.last_name as string,
          phone_number: valueFields.phone as string,
        };
        console.log(user);
        handle(localStorage.getItem('id'), user);
      }
    });
  };
}

export default UserView;
