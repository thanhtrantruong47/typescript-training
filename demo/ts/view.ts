class View {
  public myForm: HTMLFormElement;
  public btn: HTMLButtonElement;

  constructor() {
    this.myForm = document.querySelector('.login-form') as HTMLFormElement;
    this.btn = document.querySelector('.btn') as HTMLButtonElement;
  }

  blindAdd() {
    if (this.btn) {
      this.btn.addEventListener('click', (event) => {
        event.preventDefault();
          console.log("Button clicked");
      });
    }
  }
}

const a = new View();
a.blindAdd()
