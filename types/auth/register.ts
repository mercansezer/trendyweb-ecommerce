export interface RegisterCredentials {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
}

export interface RegisterResponse {
  success: boolean;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
  };
}
