import { MESSAGE_ERROR } from 'scripts/constants/message';
import { createElement } from 'scripts/helpers/helper';

const validationFunctions = {
  validateEmail: (email: string): boolean => {
    var emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/i;
    return emailPattern.test(email);
  },
  validatePassword: (password: string): boolean => {
    return password.length >= 7;
  },
  validateRePassword: (rePassword: string, password: string): boolean => {
    return rePassword.length >= 7 && rePassword === password;
  },
  validatePhone: (phoneNumber: string): boolean => {
    var phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phoneNumber);
  },
  emailError: (email: string) => {
    return !validationFunctions.validateEmail(email)
      ? MESSAGE_ERROR.EMAIL
      : MESSAGE_ERROR.EMPTY;
  },
  passwordError: (password: string) => {
    return !validationFunctions.validatePassword(password)
      ? MESSAGE_ERROR.PASSWORD
      : MESSAGE_ERROR.EMPTY;
  },
  rePasswordError: (rePassword: string, password: string) => {
    return !validationFunctions.validateRePassword(rePassword, password)
      ? MESSAGE_ERROR.RE_PASSWORD
      : MESSAGE_ERROR.EMPTY;
  },
  nameError: (name: string) => {
    return !name ? MESSAGE_ERROR.FIRST_NAME : MESSAGE_ERROR.EMPTY;
  },
  lastNameError: (name: string) => {
    return !name ? MESSAGE_ERROR.LAST_NAME : MESSAGE_ERROR.EMPTY;
  },
  phoneError: (phone: string) => {
    return !validationFunctions.validatePhone(phone)
      ? MESSAGE_ERROR.PHONE_NUMBER
      : MESSAGE_ERROR.EMPTY;
  },
};

const getErrorMessage = (key: string, value: string) => {
  switch (key) {
    case 'email':
      return validationFunctions.emailError(value);
    case 'password':
      return validationFunctions.passwordError(value);
    case 're-password':
      return validationFunctions.rePasswordError(value, password.value);
    case 'first_name':
      return validationFunctions.nameError(value);
    case 'last_name':
      return validationFunctions.lastNameError(value);
    case 'phone':
      return validationFunctions.phoneError(value);
    default:
      return '';
  }
};

const validateForm = (
  dataForm: HTMLFormElement,
  errorMessage: HTMLElement[]
): boolean => {
  const getValueInput = new FormData(dataForm);
  const valueFields = Object.fromEntries(getValueInput);
  let spanId: string;
  const arrError: string[] = [];

  errorMessage.forEach((spanElement) => {
    spanId = spanElement.id;
    arrError.push(spanId);
  });
  let isValid = true;

  for (const [key, value] of getValueInput.entries()) {
    valueFields[key] = value;
    let prevValue;
    const spanId = arrError.shift();
    if (key === 'password') {
      prevValue = value;
    }

    if (key !== 're-password') {
      createElement(spanId).textContent = getErrorMessage(
        key,
        value.toString()
      );
      if (getErrorMessage(key, value.toString())) {
        isValid = false;
      }
    } else {
      createElement(spanId).textContent = getErrorMessage(
        key,
        value.toString()
      );
      if (getErrorMessage(key, value.toString())) {
        isValid = false;
      }
    }
  }
  return isValid;
};

export { validationFunctions, getErrorMessage, validateForm };
