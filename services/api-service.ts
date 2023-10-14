import { TLoginCredentials } from "@/types/auth";
import { TUserPayload, TUserFilter, TPatchPassword } from "@/types/user";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api-test.sinardigital.co.id/",
});

export const AuthService = {
  login: (credentials: TLoginCredentials) => {
    return apiClient.post("/auth/login", credentials);
  },
};

export const UserService = {
  getUsers: (filter: TUserFilter, token: string) => {
    return apiClient.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: filter,
    });
  },
  getUserById: (id: string) => {
    return apiClient.get(`/user/${id}`);
  },
  createUser: (payload: TUserPayload, token: string) => {
    return apiClient.post("/users", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateUser: (id: string, payload: TUserPayload) => {
    return apiClient.patch(`/user/${id}`, payload);
  },
  deleteUser: (id: string) => {
    return apiClient.delete(`/user/${id}`);
  },
  updateUserPassword: (payload: TPatchPassword) => {
    return apiClient.patch("/user/password", payload);
  },
};

export const RoleService = {
  getRoles: (token: string) => {
    return apiClient.get("/roles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
