import User from "scripts/types/user";

const isUserExist = (user : User) => {

  const keys = Object.keys(localStorage);
  keys.forEach(function (key) {
    var value = localStorage.getItem(key);
    if(user.email === value) {
      // return
    } else {
      // console.log('next')
    }
  });
}

export { isUserExist}