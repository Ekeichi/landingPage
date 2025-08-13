// api.ts

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

console.log("API_URL =", API_URL); // Debug en prod/local

export interface SignupData {
  email: string;
}

export interface ContactData {
  name: string;
  email: string;
  message: string;
}

async function handleResponse(response: Response, defaultError: string) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || defaultError);
  }
  return response.json();
}

export const api = {
  async signup(data: SignupData) {
    const response = await fetch(`${API_URL}/api/v1/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(response, 'Signup failed');
  },

  async contact(data: ContactData) {
    const response = await fetch(`${API_URL}/api/v1/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(response, 'Contact request failed');
  },

  async healthCheck() {
    const response = await fetch(`${API_URL}/health`);
    return handleResponse(response, 'API health check failed');
  }
};