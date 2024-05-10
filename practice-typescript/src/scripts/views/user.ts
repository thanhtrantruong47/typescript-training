import User from 'scripts/types/user';
import { displayUser } from 'scripts/templates/user';
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
      // localStorage.clear();
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

  bindAdd = () => {
    this.form.addEventListener('click', (e) => {
      e.preventDefault();
      if ((e.target as HTMLButtonElement).classList.contains('btn')) {
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
      }
    });
  };

  bindDisplay = async (users: Function) => {
    const data = await users();
    localStorage.setItem('username', data.email);
    data.map((user: User, index = 1) => {
      this.tableUser.innerHTML += displayUser(user, index);
    });
  };
}

export default UserView;
