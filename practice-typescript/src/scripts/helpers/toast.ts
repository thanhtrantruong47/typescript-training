const toastMessage = (toast: HTMLElement, message: string, event: string) => {
  toast.classList.add('toast__show');
  toast.classList.add(event);
  toast.textContent = message;
  setTimeout(() => {
    toast.classList.remove('toast__show');
  }, 3000);
  setTimeout(() => {
    toast.classList.remove(event);
  }, 3000);
};

export { toastMessage };
