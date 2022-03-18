import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import Router from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import api from '../client/api';

type User = {
  email: string;
  id: string;
  name: string;
  type: string;
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
      const { 'wisealigners.user': userFromCookie } = parseCookies(null);
      setUser(JSON.parse(userFromCookie));
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, []);

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    try {
      const response = await api.post('sessions', {
        email,
        password,
      });

      const { token, user: userFromResponse } = response.data;

      setCookie(undefined, 'wisealigners.token', token, {
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });

      setCookie(
        undefined,
        'wisealigners.user',
        JSON.stringify(userFromResponse),
        {
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        },
      );

      setUser(userFromResponse);

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      Router.push('/');
    } catch (err) {
      throw Error();
    }
  }, []);

  const signOut = useCallback(() => {
    destroyCookie(undefined, 'wisealigners.token');
    destroyCookie(undefined, 'wisealigners.user');

    Router.push('/');
  }, []);

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({ signIn, signOut, isAuthenticated, user }),
        [isAuthenticated, signIn, signOut, user],
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
