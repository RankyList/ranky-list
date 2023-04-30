export type UsersPassword = {
  password: string;
  passwordConfirm: string;
};

export type UsersWebsites = {
  [key: string | number]: {
    name: string;
    url: string;
  };
};
