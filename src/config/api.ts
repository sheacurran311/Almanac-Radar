import axios from 'axios';

const API_BASE_URL = 'http://localhost:3005/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const AUTH_ENDPOINTS = {
  register: '/clients/register',
  login: '/clients/login',
  profile: '/clients/profile',
};