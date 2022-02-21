export interface I_AppState {}
export interface I_AppProps {
  theme: boolean;
  updateTheme: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
