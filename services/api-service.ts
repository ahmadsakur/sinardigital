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
  getUsers: (filter : TUserFilter) => {
    return apiClient.get("/user");
  },
  getUserById: (id: string) => {
    return apiClient.get(`/user/${id}`);
  },
  createUser: (payload: TUserPayload) => {
    return apiClient.post("/user", payload);
  },
  updateUser: (id: string, payload: TUserPayload) => {
    return apiClient.patch(`/user/${id}`, payload);
  },
  deleteUser: (id: string) => {
    return apiClient.delete(`/user/${id}`);
  },
  updateUserPassword: (payload : TPatchPassword) => {
    return apiClient.patch('/user/password', payload)
  }

};