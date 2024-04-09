export interface UserCreationParams {
  name: string;
  username: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
}

export interface UserAndCredentials {
  user: User;
  token: string;
  refresh: string;
}

export interface LoginParams {
  username: string;
  password: string;
}

export interface RefreshParams {
  username: string;
  refreshToken: string;
}