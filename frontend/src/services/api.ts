const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface SignupData {
  email: string;
}

export interface ContactData {
  name: string;
  email: string;
  message: string;
}

export const api = {
  async signup(data: SignupData) {
    const response = await fetch(`${API_BASE_URL}/api/v1/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Signup failed');
    }
    
    return response.json();
  },
  
  async contact(data: ContactData) {
    const response = await fetch(`${API_BASE_URL}/api/v1/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Contact request failed');
    }
    
    return response.json();
  },

  async healthCheck() {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error('API health check failed');
    }
    return response.json();
  }
};
