import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction } from 'react';

interface InputProps extends ChakraInputProps {
  name: string;
}

// eslint-disable-next-line react/function-component-definition
const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, ...rest },
  ref,
) => {
  return (
    <ChakraInput
      id={name}
      name={name}
      fontSize={15}
      borderWidth={1}
      bgColor="gray.550"
      variant="filled"
      _hover={{
        bgColor: 'gray.550',
      }}
      _focus={{
        bgColor: 'gray.550',
        borderColor: 'gray.400',
      }}
      size="lg"
      ref={ref}
      {...rest}
    />
  );
};

export const Input = forwardRef(InputBase);
