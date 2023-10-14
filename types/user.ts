export type TUserFilter = {
  name?: string;
  roleId?: string;
  page?: number;
  limit?: number;
};

export type TUserPayload = {
  name: string;
  email: string;
  password: string;
  bio: string;
  avatar: string;
  roleId: string;
};

export type TPatchPassword = {
  id: string;
  password: string;
  confirmPassword: string;
};

export interface User {
  _id: string;
  name: string;
  email: string;
  emailVerifiedAt: string | null;
  role: UserRole | null;
  __v: number;
  avatar: string;
  bio: string;
}

interface UserRole {
  _id: string;
  name: string;
  permissions: string[];
  __v: number;
}

export interface IDataResponse {
  docs: User[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
