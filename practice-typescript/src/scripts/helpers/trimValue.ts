const trimInputValues = (formElement: HTMLFormElement): void => {
  const inputFields = formElement.querySelectorAll('input');

  inputFields.forEach((input) => {
    input.value = input.value.trim();
  });
};

export { trimInputValues };
