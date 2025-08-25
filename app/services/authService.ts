import { User, LoginApiResponse } from '../types';
import { API_ENDPOINTS } from '../constants/api';
import { apiRequest, retryRequest } from '../utils/api';

export interface LoginRequest {
  phoneNumber: string;
}

export interface LoginResponse {
  user: User;
}

export class AuthService {
  static async login(phoneNumber: string): Promise<User> {
    const response = await retryRequest(() =>
      apiRequest<LoginApiResponse>(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        body: JSON.stringify({ phoneNumber }),
      })
    );

    if (!response.data?.success || !response.data?.user) {
      throw new Error(response.data?.error || 'Login failed');
    }

    return response.data.user;
  }

  static async validateToken(token: string): Promise<boolean> {
    // This would typically validate a JWT token with your backend
    // For now, we'll just check if the token exists
    return !!token;
  }

  static async refreshToken(): Promise<string> {
    // This would typically refresh an expired token
    // For now, we'll return a mock token
    return 'mock-refreshed-token';
  }
}
