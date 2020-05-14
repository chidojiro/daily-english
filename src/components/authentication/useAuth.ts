export interface IAuth {
  accessToken: string;
  userName: string;
}

export const useAuth = () => {
  const auth: IAuth = {
    accessToken: 'dummyAccessToken',
    userName: 'Houseki',
  };
  return auth;
};
