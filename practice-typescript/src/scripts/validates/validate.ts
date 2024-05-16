import { MESSAGE_ERROR } from 'scripts/constants/message';
import { createElement } from 'scripts/helpers/createElement';

const validationFunctions = {
  validateEmail: (email: string): boolean => {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/i;
    return emailPattern.test(email);
  },
  validatePassword: (password: string): boolean => password.length >= 7,
  validateRePassword: (rePassword: string, password: string): boolean =>
    rePassword.length >= 7 && rePassword === password,
  validatePhone: (phoneNumber: string): boolean => {
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phoneNumber);
  },
  emailError: (email: string) =>
    !validationFunctions.validateEmail(email)
      ? MESSAGE_ERROR.EMAIL
      : MESSAGE_ERROR.EMPTY,
  passwordError: (password: string) =>
    !validationFunctions.validatePassword(password)
      ? MESSAGE_ERROR.PASSWORD
      : MESSAGE_ERROR.EMPTY,
  rePasswordError: (rePassword: string, password: string) =>
    !validationFunctions.validateRePassword(rePassword, password)
      ? MESSAGE_ERROR.RE_PASSWORD
      : MESSAGE_ERROR.EMPTY,
  nameError: (name: string) =>
    !name ? MESSAGE_ERROR.FIRST_NAME : MESSAGE_ERROR.EMPTY,
  lastNameError: (name: string) =>
    !name ? MESSAGE_ERROR.LAST_NAME : MESSAGE_ERROR.EMPTY,
  phoneError: (phone: string) =>
    !validationFunctions.validatePhone(phone)
      ? MESSAGE_ERROR.PHONE_NUMBER
      : MESSAGE_ERROR.EMPTY,
};

const errorFunctions: {
  [key: string]: (value: string, password?: string) => string;
} = {
  email: validationFunctions.emailError,
  password: validationFunctions.passwordError,
  repassword: (value: string, password?: string) =>
    validationFunctions.rePasswordError(value, password || ''),
  first_name: validationFunctions.nameError,
  last_name: validationFunctions.lastNameError,
  phone: validationFunctions.phoneError,
};

const getErrorMessage = (
  key: string,
  value: string,
  password?: string
): string => {
  const errorFunction = errorFunctions[key];
  return errorFunction ? errorFunction(value, password) : '';
};

const validateForm = (
  dataForm: HTMLFormElement,
  errorMessages: HTMLElement[]
): boolean => {
  const getValueInput = new FormData(dataForm);
  const arrError = errorMessages.map((spanElement) => spanElement.id);
  let isValid = true;
  let passwordValue = '';

  for (const [key, value] of getValueInput.entries()) {
    const spanId = arrError.shift() || '';
    const valueStr = value.toString();

    if (key === 'password') {
      passwordValue = valueStr;
    }

    const errorMsg = getErrorMessage(key, valueStr, passwordValue);
    createElement(spanId).textContent = errorMsg;
    if (errorMsg) {
      isValid = false;
    }
  }

  return isValid;
};

export { validationFunctions, getErrorMessage, validateForm };
