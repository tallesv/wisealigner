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
      bgColor="teal.650"
      _hover={{ bgColor: 'teal.650' }}
      {...rest}
    >
      {children}
    </ChakraButton>
  );
}
