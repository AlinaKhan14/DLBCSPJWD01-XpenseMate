import axios from 'axios';

class ApiService {
  constructor() {
    this.api = axios.create({
      headers: {
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
      },
      baseURL: process.env.REACT_APP_BACKEND_URL,
      withCredentials: true,
    });

    // Optionally, set up interceptors for auth, logging, etc.
    this.api.interceptors.response.use(
      response => response,
      error => {
        // Global error handling (optional)
        return Promise.reject(error);
      }
    );
  }

  setAuthToken(token) {
    if (token) {
      this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.api.defaults.headers.common['Authorization'];
    }
  }

  async get(url, config = {}) {
    const res = await this.api.get(url, config);
      return res;
  }

  async post(url, data = {}, config = {}) {
    const res = await this.api.post(url, data, config);
      return res;
  }

  async put(url, data = {}, config = {}) {
    const res = await this.api.put(url, data, config);
      return res;
  }

  async patch(url, data = {}, config = {}) {
    const res = await this.api.patch(url, data, config);
      return res;
  }

  async delete(url, config = {}) {
    const res = await this.api.delete(url, config);
      return res;
  }
}

const apiService = new ApiService();
export default apiService; 