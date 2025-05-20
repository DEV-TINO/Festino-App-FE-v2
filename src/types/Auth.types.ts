export interface AuthStore {
  userName: string;
  userPhoneNum: string;
  userStudentNum: string;
  verifyCode: string;
  mainUserId: string;
  accessToken: string;
  refreshToken: string;
  setUserName: (id: string) => void;
  setUserPhoneNum: (pw: string) => void;
  setUserStudentNum: (stnum: string) => void;
  setMainUserId: (uuid: string) => void;
  setVerifyCode: (code: string) => void;
  isLogin: () => boolean;
  login: () => Promise<boolean>;
  logout: () => void;
  saveUserInfo: () => Promise<{ success: boolean; message: string }>;
  sendAuthorizationCode: () => Promise<{ success: boolean; message: string }>;
}
