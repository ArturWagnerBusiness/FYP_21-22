export interface I_AppProps {
  theme: boolean;
  updateTheme: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface I_AppState {
  isLoggedIn: boolean;
  shownEmail: string;
}
