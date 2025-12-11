import React, { createContext, useState, useEffect, useContext } from "react";
import { loginReqres, signupReqres } from "../services/auth";
import { saveToken, getToken, removeToken } from "../utils/storage";

type AuthCtx = {
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export const AuthProvider: React.FC<{children:any}> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const t = await getToken();
      if (t) setToken(t);
    })();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await loginReqres(email, password);
      if (res?.token) {
        await saveToken(res.token);
        setToken(res.token);
        return true;
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      setLoading(true);
      const res = await signupReqres(email, password);
      if (res?.token) {
        await saveToken(res.token);
        setToken(res.token);
        return true;
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await removeToken();
    setToken(null);
  };

  return <AuthContext.Provider value={{ token, login, signup, logout, loading }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
  return ctx;
};
