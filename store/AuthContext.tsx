import { User } from "@/types/user";
import React, { createContext, useContext } from "react";

type AuthContextType = {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const authContextDefaultValues: AuthContextType = {
  token: "",
  user: null,
  isLoggedIn: false,
  setToken: () => {},
  setUser: () => {},
  setIsLoggedIn: () => {},
};
const AuthContext = createContext<AuthContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthDataProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  const data = {
    token,
    user,
    isLoggedIn,
    setToken,
    setUser,
    setIsLoggedIn,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
