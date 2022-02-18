import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Header } from './Header';
import { Menu } from './Menu/Index';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
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
