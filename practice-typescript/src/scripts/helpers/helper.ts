const isUserExist = (email: string) => {
  const keys = Object.keys(localStorage);
  const users: string[] = [];

  keys.forEach((key) => {
    const value = localStorage.getItem(key);
    users.push(value);
  });

  for (let i = 0; i < users.length; i++) {
    if (email === users[i]) {
      return false;
    }
  }
  return true;
};

const trimInputValues = (formElement: HTMLFormElement) => {
  var inputFields = formElement.querySelectorAll('input');

  inputFields.forEach((input) => {
    input.value = input.value.trim();
  });
};

const createElement = (el: string) => {
  const element = document.getElementById(`${el}`);
  return element;
};

export { isUserExist, trimInputValues, createElement };
