import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { triggerLogout } from '../contexts/AuthEvents';

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('@token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('@token');
      triggerLogout(); // 👈 FORÇA LOGOUT
    }

    return Promise.reject(error);
  }
);
