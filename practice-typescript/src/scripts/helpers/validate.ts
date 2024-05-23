import { MAX_LENGTH_FIELD } from 'scripts/constants/user';
import { MESSAGE_ERROR } from 'scripts/constants/user';
import { createElement } from 'scripts/helpers/createElement';

/**
 * Contains validation functions for various form fields.
 */
const validationFunctions = {
  /**
   * Validates an email address.
   * @param {string} email - The email address to validate.
   * @returns {boolean} Whether the email is valid.
   */
  validateEmail: (email: string): boolean => {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/i;
    return emailPattern.test(email);
  },

  /**
   * Validates a phone number.
   * @param {string} phoneNumber - The phone number to validate.
   * @returns {boolean} Whether the phone number is valid.
   */
  validatePhone: (phoneNumber: string): boolean => {
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phoneNumber);
  },

  /**
   * Validates if a string contains any special characters.
   * @param {string} name - The string to validate.
   * @returns {boolean} Whether the string contains special characters.
   */
  validateSpecialCharacter: (name: string): boolean => {
    const pattern = /[^a-zA-Z0-9]/;
    return pattern.test(name);
  },

  /**
   * Returns an error message for an invalid email.
   * @param {string} email - The email to validate.
   * @returns {string} The error message.
   */
  emailError: (email: string): string => {
    if (!email) {
      return MESSAGE_ERROR.EMAIL_EMPTY;
    }
    if (!validationFunctions.validateEmail(email)) {
      return 'Your email name ' + MESSAGE_ERROR.EMAIL_NOT_FORMAT;
    }
    return MESSAGE_ERROR.EMPTY;
  },

  /**
   * Returns an error message for an invalid first name.
   * @param {string} name - The first name to validate.
   * @returns {string} The error message.
   */
  nameError(name: string): string {
    if (!name) {
      return MESSAGE_ERROR.EMAIL_EMPTY;
    }
    if (name.length > MAX_LENGTH_FIELD) {
      return 'Your first name ' + MESSAGE_ERROR.GREATER_THAN_LENGTH;
    }
    if (validationFunctions.validateSpecialCharacter(name)) {
      return 'Your first name ' + MESSAGE_ERROR.SPECIAL_CHARACTER;
    }
    return MESSAGE_ERROR.EMPTY;
  },

  /**
   * Returns an error message for an invalid last name.
   * @param {string} name - The last name to validate.
   * @returns {string} The error message.
   */
  lastNameError(name: string): string {
    if (!name) {
      return MESSAGE_ERROR.LAST_NAME_EMPTY;
    }
    if (name.length > MAX_LENGTH_FIELD) {
      return 'Your last name ' + MESSAGE_ERROR.GREATER_THAN_LENGTH;
    }
    if (validationFunctions.validateSpecialCharacter(name)) {
      return 'Your last name ' + MESSAGE_ERROR.SPECIAL_CHARACTER;
    }
    return MESSAGE_ERROR.EMPTY;
  },

  /**
   * Returns an error message for an invalid phone number.
   * @param {string} phone - The phone number to validate.
   * @returns {string} The error message.
   */
  phoneError: (phone: string): string =>
    !validationFunctions.validatePhone(phone)
      ? MESSAGE_ERROR.PHONE_NUMBER
      : MESSAGE_ERROR.EMPTY,
};

/**
 * Contains functions to retrieve error messages based on form field values.
 */
const errorFunctions: Record<string, (value: string) => string> = {
  email: validationFunctions.emailError,
  first_name: validationFunctions.nameError,
  last_name: validationFunctions.lastNameError,
  phone: validationFunctions.phoneError,
};

/**
 * Retrieves an error message for a specific form field.
 * @param {string} key - The key of the form field.
 * @param {string} value - The value of the form field.
 * @returns {string} The error message.
 */
const getErrorMessage = (key: string, value: string): string => {
  const errorFunction = errorFunctions[key];
  return errorFunction(value);
};

/**
 * Validates a form and displays error messages.
 * @param {HTMLFormElement} dataForm - The form element to validate.
 * @param {HTMLElement[]} errorMessages - An array of error message elements.
 * @returns {boolean} Whether the form is valid.
 */
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
