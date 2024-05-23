import { USERS, BASE_URL, HTTP_METHOD } from 'scripts/constants/user';
import { UserModel } from 'scripts/models/user';

/**
 * The UserService class provides methods to interact with the user-related API endpoints.
 */
class UserService {
  resourceUrl: string;

  constructor() {
    /**
     * Constructs the base URL for the user-related API endpoints.
     */
    this.resourceUrl = `${BASE_URL}/${USERS}`;
  }

  /**
   * Fetches all users from the server.
   * @returns {Promise<UserModel[]>} A promise that resolves to an array of UserModel objects.
   */
  async getAll(): Promise<UserModel[]> {
    try {
      const response = await fetch(this.resourceUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data: UserModel[] = await response.json();
      return data;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to fetch data: ${errorMessage}`);
    }
  }

  /**
   * Fetches a single user by their ID.
   * @param {string} id - The ID of the user to fetch.
   * @returns {Promise<UserModel>} A promise that resolves to a UserModel object.
   */
  async getById(id: string): Promise<UserModel> {
    try {
      const response = await fetch(`${this.resourceUrl}/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to fetch data: ${errorMessage}`);
    }
  }

  /**
   * Creates a new user.
   * @param {UserModel} data - The user data to create.
   * @returns {Promise<UserModel>} A promise that resolves to the created UserModel object.
   */
  async create(data: UserModel): Promise<UserModel> {
    try {
      const response = await fetch(this.resourceUrl, {
        method: HTTP_METHOD.POST,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to create data');
      }
      return response.json();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to create data: ${errorMessage}`);
    }
  }

  /**
   * Updates an existing user by their ID.
   * @param {string} id - The ID of the user to update.
   * @param {UserModel} data - The user data to update.
   * @returns {Promise<void>} A promise that resolves when the update is complete.
   */
  async update(id: string, data: UserModel): Promise<void> {
    try {
      const response = await fetch(`${this.resourceUrl}/${id}`, {
        method: HTTP_METHOD.PUT,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update data');
      }
      return response.json();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to update data: ${errorMessage}`);
    }
  }

  /**
   * Deletes a user by their ID.
   * @param {string} id - The ID of the user to delete.
   * @returns {Promise<void>} A promise that resolves when the deletion is complete.
   */
  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.resourceUrl}/${id}`, {
        method: HTTP_METHOD.DELETE,
      });
      if (!response.ok) {
        throw new Error('Failed to delete data');
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to delete data: ${errorMessage}`);
    }
  }

  /**
   * Searches for users by their first name.
   * @param {string} name - The first name to search for.
   * @returns {Promise<UserModel[]>} A promise that resolves to an array of UserModel objects that match the search criteria.
   */
  async searchUserByName(name: string): Promise<UserModel[]> {
    const url = new URL(this.resourceUrl);
    url.searchParams.append('first_name', name);

    try {
      const response = await fetch(url.toString(), {
        method: HTTP_METHOD.GET,
        headers: { 'Content-Type': 'application/json' },
      });
      const data: UserModel[] = await response.json();
      return response.status === 404 ? [] : data;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Error occurred during user search: ${errorMessage}`);
    }
  }
}

export default UserService;
