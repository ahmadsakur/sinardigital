export type TUserFilter = {
  name?: string;
  roleId?: string;
  page?: number;
  limit?: number;
};

export type TUserPayload = {
  name: string;
  email: string;
  password : string;
  bio: string;
  avatar: string;
  roleId: string;
};

export type TPatchPassword = {
  id: string;
  password: string;
  confirmPassword: string;
}
