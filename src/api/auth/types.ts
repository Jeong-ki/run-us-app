export interface ISignUpReq {
  email: string;
  password: string;
}
export interface ISignUpRes {
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}
export interface ISignInReq {
  email: string;
  password: string;
}
export interface ISignInRes extends ISignUpRes {}

export interface IMyInfo {
  name: string;
  email: string;
  created_at: string;
}

export interface IRefreshUser {
  name: string;
  email: string;
  newAccessToken: string;
  newRefreshToken: string;
}
