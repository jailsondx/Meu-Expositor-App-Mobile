import { createContext, useContext, useEffect, useState } from 'react';
import { saveUser, getUser, removeUser } from '../services/storage';

interface AuthContextData {
  user: any;
  loading: boolean;
  signIn: (userData: any) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const storedUser = await getUser();
      setUser(storedUser);
      setLoading(false);
    }

    loadUser();
  }, []);

  async function signIn(userData: any) {
    setUser(userData);
    await saveUser(userData);
  }

  async function signOut() {
    setUser(null);
    await removeUser();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
