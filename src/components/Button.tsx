import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ButtonProps extends ChakraButtonProps {
  children: ReactNode;
}

export function Button({ children, ...rest }: ButtonProps) {
  return (
    <ChakraButton
      size="lg"
      fontSize="lg"
      color="white"
      bgColor="purple.550"
      _hover={{ bgColor: 'purple.550' }}
      {...rest}
    >
      {children}
    </ChakraButton>
  );
}
