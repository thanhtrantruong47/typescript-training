class UserView {
  btn: HTMLButtonElement;
  form: HTMLFormElement;

  constructor() {
    this.btn = document.querySelector('.btn-add') as HTMLButtonElement;
    this.form = document.querySelector('.form-primary') as HTMLFormElement;
  }

  bindToggleAddNew = () => {
    this.btn.addEventListener('click', (e) => {
      e.preventDefault();
      this.form.classList.toggle('hidden');
      localStorage.clear()
    });
  };

  bindAdd = () => {
    this.form.addEventListener('click' , (e) => {
      e.preventDefault()
        if(e.target instanceof HTMLButtonElement) {
          const getValueInput = new FormData(this.form);
          const valueFields = Object.fromEntries(getValueInput);
          localStorage.setItem('email' , JSON.stringify(valueFields["email"]))
        }
    })
  }
}

export default UserView;

const a = new UserView() ;
a.bindAdd()
