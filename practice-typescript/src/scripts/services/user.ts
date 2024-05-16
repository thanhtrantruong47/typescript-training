import HTTPMethod from 'scripts/constants/HTTPMethod';
import { USERS, BASE_URL } from 'scripts/constants/api';
import { UserModel } from 'scripts/models/user';

class ApiService {
  resourceUrl: string;

  constructor() {
    this.resourceUrl = `${BASE_URL}/${USERS}`;
  }

  async getAll(): Promise<UserModel[]> {
    try {
      const response = await fetch(this.resourceUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    } catch (error: any) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }

  async getById(id: string): Promise<UserModel> {
    try {
      const response = await fetch(`${this.resourceUrl}/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return response.json();
    } catch (error: any) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }

  async create(data: UserModel): Promise<UserModel> {
    try {
      const response = await fetch(this.resourceUrl, {
        method: HTTPMethod.POST,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to create data');
      }
      return response.json();
    } catch (error: any) {
      throw new Error(`Failed to create data: ${error.message}`);
    }
  }

  async update(id: string, data: UserModel): Promise<UserModel> {
    try {
      const response = await fetch(`${this.resourceUrl}/${id}`, {
        method: HTTPMethod.PUT,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update data');
      }
      return response.json();
    } catch (error: any) {
      throw new Error(`Failed to update data: ${error.message}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.resourceUrl}/${id}`, {
        method: HTTPMethod.DELETE,
      });
      if (!response.ok) {
        throw new Error('Failed to delete data');
      }
    } catch (error: any) {
      throw new Error(`Failed to delete data: ${error.message}`);
    }
  }

  async searchUserByName(email: string): Promise<void> {
    const url = new URL(this.resourceUrl);
    url.searchParams.append('email', email);

    try {
      const response = await fetch(url.toString(), {
        method: HTTPMethod.GET,
        headers: { 'content-type': 'application/json' },
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Failed to fetch user by email');
      }
    } catch (error: any) {
      throw new Error(`Error occurred during user search ${error.message}`);
    }
  }
}

export default ApiService;
