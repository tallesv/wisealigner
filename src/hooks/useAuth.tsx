import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Router from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import api from '../client/api';

type User = {
  email: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  isAuthenticated: boolean;
  user: User;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'wisealigners.token': token } = parseCookies();

    if (token) {
      const { 'wisealigners.user': userFromCookie } = parseCookies();
      setUser(JSON.parse(userFromCookie));
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('sessions', {
        email,
        password,
      });

      const { token } = response.data;

      setCookie(undefined, 'wisealigners.token', 'testetee', {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });

      setCookie(undefined, 'wisealigners.user', email, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });

      setUser({
        email,
      });

      api.defaults.headers.common.Authorization = `Bearer ${'testee'}`;

      Router.push('/');
    } catch (err) {
      console.log(err);
    }
  }

  function signOut() {
    destroyCookie(undefined, 'wisealigners.token');
    destroyCookie(undefined, 'wisealigners.user');

    Router.push('/');
  }

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({ signIn, signOut, isAuthenticated, user }),
        [isAuthenticated, user],
      )}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider!');
  }

  return context;
}

export { AuthProvider, useAuth };
