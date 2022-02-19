/* eslint-disable react/function-component-definition */
/* eslint-disable react/no-children-prop */
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputGroup,
  InputLeftElement,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  inputIcon?: ReactNode | string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, inputIcon, ...rest },
  ref,
) => {
  return (
    <FormControl>
      {!!label && (
        <FormLabel fontWeight={700} htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <InputGroup>
        {!!inputIcon && (
          <InputLeftElement
            h="100%"
            pointerEvents="none"
            children={inputIcon}
          />
        )}
        <ChakraInput
          id={name}
          name={name}
          fontSize={15}
          size="lg"
          focusBorderColor="purple.400"
          ref={ref}
          {...rest}
        />
      </InputGroup>
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
