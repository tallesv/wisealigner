import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';
import { useRouter } from 'next/router';
import theme from '../../styles/theme';
import { Layout } from '../components/Layout';
import { SidebarDrawerProvider } from '../context/SidebarDrawerContext';

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const pagesWithoutLayout = ['/login', '/sign-up'];

  const themeExtented = extendTheme({
    ...theme,
    components: {
      Steps,
    },
  });

  return (
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
  );
}

export default MyApp;
