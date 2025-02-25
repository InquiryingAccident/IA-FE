interface User {
  id: string;
  password: string;
  nickname: string;
}

type AuthToken = {
  accessToken: string;
  refreshToken: string;
};

export type {User, AuthToken};
