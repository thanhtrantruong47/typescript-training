import { BASE_URL, USERS } from "scripts/constains/url";

class UserService {
  static getAllUser = async () => {
    try {
      const res = await fetch(`${BASE_URL}/${USERS}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'Application-json',
        },
      });
      return res.json();
    } catch (error) {
      throw new Error('Failed to get all user.');
    }
  };
}

export default UserService

UserService.getAllUser();