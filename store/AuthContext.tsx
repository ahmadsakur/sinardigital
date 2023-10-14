import { User, UserRole } from "@/types/user";
import React, { createContext, useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";

type AuthContextType = {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
  changeToken: (token: string) => void;
  changeUser: (user: User) => void;
  changeIsLoggedIn: (isLoggedIn: boolean) => void;
};

const authContextDefaultValues: AuthContextType = {
  token: "x",
  user: null,
  isLoggedIn: false,
  changeToken: () => {},
  changeUser: () => {},
  changeIsLoggedIn: () => {},
};
const AuthContext = createContext<AuthContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

type TToken = {
  sub: string;
  name: string;
  role: UserRole;
  avatar: string;
  exp: number;
  iat: number;
};
export function AuthDataProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = React.useState<string | null>("");
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  const decodedToken: TToken | null = token ? jwt_decode(token) : null;
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (decodedToken) {
      decodedToken.exp * 1000 > Date.now()
        ? setIsLoggedIn(true)
        : setIsLoggedIn(false);
      console.log(decodedToken.exp * 1000, Date.now());
    }
  }, [decodedToken]);

  const changeToken = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const changeUser = (user: User) => {
    setUser(user);
  };

  const changeIsLoggedIn = (isLoggedIn: boolean) => {
    setIsLoggedIn(isLoggedIn);
  };

  const data = {
    token,
    user,
    isLoggedIn,
    changeToken,
    changeUser,
    changeIsLoggedIn,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
