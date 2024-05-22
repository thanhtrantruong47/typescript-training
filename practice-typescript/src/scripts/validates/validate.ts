import { MAX_LENGTH } from 'scripts/constants/constant';
import { MESSAGE_ERROR } from 'scripts/constants/message';
import { createElement } from 'scripts/helpers/createElement';

const validationFunctions = {
  validateEmail: (email: string): boolean => {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/i;
    return emailPattern.test(email);
  },
  validatePhone: (phoneNumber: string): boolean => {
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phoneNumber);
  },
  emailError: (email: string) =>
    !validationFunctions.validateEmail(email)
      ? MESSAGE_ERROR.EMAIL
      : MESSAGE_ERROR.EMPTY,
  nameError: (name: string) =>
    !name || name.length > MAX_LENGTH
      ? MESSAGE_ERROR.FIRST_NAME
      : MESSAGE_ERROR.EMPTY,
  lastNameError: (name: string) =>
    !name || name.length > MAX_LENGTH
      ? MESSAGE_ERROR.LAST_NAME
      : MESSAGE_ERROR.EMPTY,
  phoneError: (phone: string) =>
    !validationFunctions.validatePhone(phone)
      ? MESSAGE_ERROR.PHONE_NUMBER
      : MESSAGE_ERROR.EMPTY,
};

const errorFunctions: Record<string, (value: string) => string> = {
  email: validationFunctions.emailError,
  first_name: validationFunctions.nameError,
  last_name: validationFunctions.lastNameError,
  phone: validationFunctions.phoneError,
};

const getErrorMessage = (key: string, value: string): string => {
  const errorFunction = errorFunctions[key];
  return errorFunction(value);
};

const validateForm = (
  dataForm: HTMLFormElement,
  errorMessages: HTMLElement[]
): boolean => {
  const getValueInput = new FormData(dataForm);
  const arrError = errorMessages.map((spanElement) => spanElement.id);
  let isValid = true;

  for (const [key, value] of getValueInput.entries()) {
    const errorMessage = getErrorMessage(key, value.toString());
    const spanElement = createElement(arrError.shift());
    spanElement.textContent = errorMessage;
    errorMessage
      ? (spanElement.parentElement
          .querySelector('input')
          .classList.add('field-error'),
        (isValid = false))
      : spanElement.parentElement
          .querySelector('input')
          .classList.remove('field-error');
  }
  return isValid;
};

export { validateForm };
