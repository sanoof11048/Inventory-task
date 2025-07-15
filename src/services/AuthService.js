import authApi from "../Api/authApi";

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export const authService = {
  login: async (email, password) => {
    const response = await authApi.post('/Auth/login', { email, password });
    const { token } = response.data.data;
    const user = response.data.data;
    console.log(response.data.data)
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    return response.data;
  },

 register: async (fullName, email, password) => {
  try {
    const response = await authApi.post('/Auth/register', {
      fullName,
      email,
      password
    });

    return { success: true, data: response.data };
  } catch (error) {
    const msg = error.response?.data || 'Registration failed';
    return { success: false, message: msg };
  }
 },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.clear()
  },

  getToken: () => localStorage.getItem(TOKEN_KEY),

  getUser: () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? user : null;
  },

  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),
};
