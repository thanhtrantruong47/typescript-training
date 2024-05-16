import { TIME_MESSAGE } from 'scripts/constants/message';

const toastMessage = (toast: HTMLElement, message: string, status: string) => {
  toast.classList.add('toast__show');
  toast.classList.add(status);
  toast.textContent = message;
  setTimeout(() => {
    toast.classList.remove('toast__show');
  }, TIME_MESSAGE);
  setTimeout(() => {
    toast.classList.remove(status);
  }, TIME_MESSAGE);
};

export { toastMessage };
