import { createContext, useContext, useEffect, useState } from 'react';
import { getToken, saveToken, removeToken } from '../services/storage';

type AuthContextData = {
  signed: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: any) {
  const [signed, setSigned] = useState(false);

  async function signIn(token: string) {
    await saveToken(token);
    setSigned(true);
  }

  async function signOut() {
    await removeToken();
    setSigned(false);
  }

  async function loadStorage() {
    const token = await getToken();
    if (token) setSigned(true);
  }

  useEffect(() => {
    loadStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ signed, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
