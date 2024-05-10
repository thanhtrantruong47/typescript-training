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
      // localStorage.clear();
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
          button.textContent = 'Update User';
          title.textContent = 'Update User';
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

  bindAdd = (handle: Function) => {
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

        const users = JSON.parse(localStorage.getItem('userData') || '[]');

        users.push({
          email: valueFields.email as string,
          password: valueFields.password as string,
          first_name: valueFields.first_name as string,
          last_name: valueFields.last_name as string,
          phone_number: valueFields.phone as string,
        });

        localStorage.setItem('userData', JSON.stringify(users));

        this.bindDisplay();
      }
    });
  };

  bindDisplay = () => {
    const storedDataString = localStorage.getItem('userData');
    const storedData: User[] = JSON.parse(storedDataString?? "");
    let tableHTML = displayHeadTable
    storedData.forEach((user, index) => {
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

      if (target.classList.contains('action-delete')) {
        handle(userId);
        row?.remove();
      }
    });
  };

  bindGetDetail = () => {};

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
        handle(localStorage.getItem('id'), user);
      }
    });
  };
}

export default UserView;
