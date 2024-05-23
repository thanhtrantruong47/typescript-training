/**
 * Checks if a user with the given email already exists in the localStorage.
 * @param {string} email - The email address to check.
 * @returns {boolean} True if the user does not exist, false otherwise.
 */
const isUserExist = (email: string): boolean => {
  // Retrieve all keys from the localStorage.
  const keys = Object.keys(localStorage);
  const users: string[] = [];

  // Iterate through each key in localStorage.
  keys.forEach((key) => {
    // Retrieve the value associated with the key from localStorage.
    const value = localStorage.getItem(key);
    users.push(value);
  });

  // Iterate through the users array to check if the email exists.
  for (let i = 0; i < users.length; i++) {
    if (email === users[i]) {
      return false;
    }
  }
  return true;
};

export { isUserExist };
