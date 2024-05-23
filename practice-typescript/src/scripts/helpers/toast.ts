import { TIME_MESSAGE, SHOW_TOAST } from 'scripts/constants/constants';

const toastMessage = (toast: HTMLElement, message: string, status: string) => {
  toast.classList.add(SHOW_TOAST);
  toast.classList.add(status);
  toast.textContent = message;
  setTimeout(() => {
    toast.classList.remove(SHOW_TOAST);
  }, TIME_MESSAGE);
  setTimeout(() => {
    toast.classList.remove(status);
  }, TIME_MESSAGE);
};

export { toastMessage };
