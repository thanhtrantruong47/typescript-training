import { TIME_MESSAGE, SHOW_TOAST } from 'scripts/constants/user';

/**
 * Displays a toast message on the screen.
 * @param {HTMLElement} toast - The toast container element.
 * @param {string} message - The message to display.
 * @param {string} status - The status of the toast message (e.g., success, error).
 */
const toastMessage = (toast: HTMLElement, message: string, status: string) => {
  // Add classes to control visibility and appearance of the toast message
  toast.classList.add(SHOW_TOAST);
  toast.classList.add(status);

  // Set the text content of the toast to the provided message
  toast.textContent = message;

  // Hide the toast message after a certain duration
  setTimeout(() => {
    toast.classList.remove(SHOW_TOAST);
  }, TIME_MESSAGE);

  // Remove the status class after the same duration to revert appearance
  setTimeout(() => {
    toast.classList.remove(status);
  }, TIME_MESSAGE);
};

export { toastMessage };
