/**
 * Retrieves an HTML element from the document based on its ID.
 * @param {string} el - The ID of the element to retrieve.
 * @returns {HTMLElement | null} The HTML element with the specified ID, or null if not found.
 */
const createElement = (el: string): HTMLElement | null => {
  // Find the element in the document with the specified ID
  const element = document.getElementById(`${el}`);
  return element;
};

export { createElement };
