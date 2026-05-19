export type User = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
};
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean; // Uygulama cookie kontrolünü bitirdi mi?
}
