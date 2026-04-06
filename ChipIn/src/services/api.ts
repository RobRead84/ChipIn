import axios, { AxiosInstance } from 'axios';
import { LinkedInPost } from '../types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.chipin.app';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchService = {
  async searchPosts(keyword: string, token: string): Promise<LinkedInPost[]> {
    try {
      const response = await apiClient.get('/search/posts', {
        params: { keyword },
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.posts;
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  },
};

export default apiClient;
