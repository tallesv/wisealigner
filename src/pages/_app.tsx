import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import theme from '../../styles/theme';
import { Layout } from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const pagesWithoutLayout = ['/login'];

  return (
    <ChakraProvider theme={theme}>
      {pagesWithoutLayout.includes(pathname) ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </ChakraProvider>
  );
}

export default MyApp;
