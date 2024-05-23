/**
 * Defines the structure of a user object.
 */
interface User {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  id?: number;
}

export default User;
