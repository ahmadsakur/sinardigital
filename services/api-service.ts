import axios from "axios";
import {
  TLoginCredentials,
} from "@/types/auth";

const apiClient = axios.create({
  baseURL: "https://api-test.sinardigital.co.id/",
});

export const AuthService = {
  login: (credentials: TLoginCredentials) => {
    return apiClient.post("/auth/login", credentials);
  },
};


