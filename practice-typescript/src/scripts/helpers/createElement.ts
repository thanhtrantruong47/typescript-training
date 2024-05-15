const createElement = (el: string): HTMLElement => {
  const element = document.getElementById(`${el}`);
  return element;
};

export {createElement}