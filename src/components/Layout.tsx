import { Flex } from '@chakra-ui/react';
import { ReactNode, useEffect, useState } from 'react';
import { Header } from './Header';
import { Menu } from './Menu/Index';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px={[4, 10]}>
        <Menu />
        {children}
      </Flex>
    </>
  );
}
