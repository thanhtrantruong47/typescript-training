const isUserExist = (email: string): boolean => {
  const keys = Object.keys(localStorage);
  const users: string[] = [];

  keys.forEach((key) => {
    const value = localStorage.getItem(key);
    users.push(value);
  });

  for (let i = 0; i < users.length; i++) {
    if (email === users[i]) {
      return false;
    }
  }
  return true;
};

export {isUserExist}