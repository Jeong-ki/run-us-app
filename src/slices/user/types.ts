export interface IUser {
  name: string;
  email: string;
  accessToken: string;
}

export interface IUserState {
  user: IUser | null;
}
