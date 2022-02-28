export interface I_LoginProps {
  setLoggedStatus: (data: boolean) => void;
}
export interface I_LoginState {
  isSendDisabled: boolean;
  buttonWaitTime: number;
  valueEmail: string;
  valueCode: string;
}
