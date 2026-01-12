import { jwtDecode}  from 'jwt-decode';
import { registerLogout } from './AuthEvents';
import { createContext, useContext, useEffect, useState } from 'react';
import { getToken, saveToken, removeToken, setUser, removeUser, getUser} from '../services/storage';

type AuthContextData = {
  signed: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
};

type JwtPayload = {
  name: string;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: any) {
  const [signed, setSigned] = useState(false);

  async function signIn(token: string) {
    const decoded = jwtDecode<JwtPayload>(token);

    await saveToken(token);
    await setUser(decoded.name);

    setSigned(true);
  }

  async function signOut() {
    await removeToken();
    setSigned(false);
  }

  async function loadStorage() {
    const token = await getToken();

    if (token) {
      //const decoded = getUserFromToken(token);
      //setUserName(decoded?.name);
      setSigned(true);
    }
  }

  useEffect(() => {
    loadStorage();
    registerLogout(signOut); // 👈 AQUI
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