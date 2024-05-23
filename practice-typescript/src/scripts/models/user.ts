import User from 'scripts/types/user';

/**
 * The UserModel class represents a user entity with properties for email, first name, last name, and phone number.
 */
class UserModel {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;

  /**
   * Creates an instance of UserModel.
   */
  constructor({ email, first_name, last_name, phone_number }: User) {
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone_number = phone_number;
  }
}

export { UserModel };
