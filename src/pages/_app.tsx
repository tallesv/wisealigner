import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import theme from '../../styles/theme';
import { Layout } from '../components/Layout';
import { SidebarDrawerProvider } from '../context/SidebarDrawerContext';

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const pagesWithoutLayout = ['/login', '/sign-up'];

  return (
    <ChakraProvider theme={theme}>
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
  );
}

export default MyApp;
