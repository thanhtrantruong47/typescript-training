
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

  bindCloseForm = () =>  {
    this.form.addEventListener('click' , (e) => {
      e.preventDefault()
        if((e.target as HTMLButtonElement).classList.contains('btn-close')) {
          e.preventDefault();
          this.form.classList.toggle('hidden');
        }
    })
  }


  bindAdd = () => {
    this.form.addEventListener('click' , (e) => {

      e.preventDefault()
        if((e.target as HTMLButtonElement).classList.contains('btn')) {
          const getValueInput = new FormData(this.form);
          const valueFields = Object.fromEntries(getValueInput);
          localStorage.setItem('user' , JSON.stringify(valueFields))
        }
    })
  }
}

export default UserView;

