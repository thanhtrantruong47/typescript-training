import { HTTP_Method } from 'scripts/constants/constants';
import { USERS, BASE_URL } from 'scripts/constants/constants';
import { UserModel } from 'scripts/models/user';

// The UserService class provides methods to interact with the user-related API endpoints.
class UserService {
  resourceUrl: string;

  constructor() {
    // Construct the base URL for the user-related API endpoints.
    this.resourceUrl = `${BASE_URL}/${USERS}`;
  }

  // Fetch all users from the server.
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

  // Fetch a single user by their ID.
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

  // Create a new user.
  async create(data: UserModel): Promise<UserModel> {
    try {
      const response = await fetch(this.resourceUrl, {
        method: HTTP_Method.POST,
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

  // Update an existing user by their ID.
  async update(id: string, data: UserModel): Promise<void> {
    try {
      const response = await fetch(`${this.resourceUrl}/${id}`, {
        method: HTTP_Method.PUT,
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

  // Delete a user by their ID.
  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.resourceUrl}/${id}`, {
        method: HTTP_Method.DELETE,
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

  // Search for users by their first name.
  async searchUserByName(name: string): Promise<UserModel[]> {
    const url = new URL(this.resourceUrl);
    url.searchParams.append('first_name', name);

    try {
      const response = await fetch(url.toString(), {
        method: HTTP_Method.GET,
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
