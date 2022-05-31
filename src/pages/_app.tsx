import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
import { useRouter } from 'next/router';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/bundle';
import '../components/ImagesSlider/style.css';

import { AuthProvider } from '../hooks/useAuth';
import theme from '../../styles/theme';
import { Layout } from '../components/Layout';
import { SidebarDrawerProvider } from '../context/SidebarDrawerContext';

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const pagesWithoutLayout = ['/login', '/sign-up', '/reset-password'];

  const themeExtented = extendTheme({
    ...theme,
    components: {
      Steps,
    },
  });

  return (
    <AuthProvider>
      <ChakraProvider theme={themeExtented}>
        {pagesWithoutLayout.includes(pathname) ? (
          <Component {...pageProps} />
        ) : (
          <SidebarDrawerProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SidebarDrawerProvider>
        )}
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
