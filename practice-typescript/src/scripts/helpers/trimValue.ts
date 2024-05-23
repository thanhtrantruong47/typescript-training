/**
 * Trims whitespace from the values of input fields within a form element.
 * @param {HTMLFormElement} formElement - The form element to trim input values from.
 */
const trimInputValues = (formElement: HTMLFormElement): void => {
  const inputFields = formElement.querySelectorAll('input');

  inputFields.forEach((input) => {
    input.value = input.value.trim();
  });
};

export { trimInputValues };
