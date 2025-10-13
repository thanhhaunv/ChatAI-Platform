import axios from 'axios';
import { getToken, removeToken } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  signup: (name: string, email: string, password: string) =>
    api.post('/auth/signup', { name, email, password }),
  me: () => api.get('/auth/me'),
};

// Projects
export const projectsApi = {
  getAll: () => api.get('/projects'),
  getById: (id: number) => api.get(`/projects/${id}`),
  create: (name: string) => api.post('/projects', { name }),
  inviteMember: (projectId: number, email: string, role: string) =>
    api.post(`/projects/${projectId}/members`, { email, role }),
};

// Conversations
export const conversationsApi = {
  getAll: (projectId: number) => api.get(`/projects/${projectId}/conversations`),
  getByThreadId: (projectId: number, threadId: string) =>
    api.get(`/projects/${projectId}/conversations/thread/${threadId}`),
  create: (projectId: number, title: string) =>
    api.post(`/projects/${projectId}/conversations`, { title }),
};

// Chat
export const chatApi = {
  sendMessage: (projectId: number, data: any) =>
    api.post(`/projects/${projectId}/chat/message`, data),
  getHistory: (projectId: number, threadId: string) =>
    api.get(`/projects/${projectId}/chat/thread/${threadId}/history`),
  getUsage: (projectId: number, threadId: string) =>
    api.get(`/projects/${projectId}/chat/thread/${threadId}/usage`),
};

export default api;
