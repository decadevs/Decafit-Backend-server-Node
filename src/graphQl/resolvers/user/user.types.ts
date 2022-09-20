export interface CreateUserRegisterInput {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}
export interface ArgsForCreateRegisterUser {
  user: CreateUserRegisterInput;
}

export interface CreateUserLoginInput {
  email: string;
  password: string;
}
export interface ArgsForLoginUser {
  user: CreateUserLoginInput;
}

export interface ProfileInput {
  id: string;
  avatar: string;
}

export interface ArgsToUpdateProfile {
  user: ProfileInput;
}
