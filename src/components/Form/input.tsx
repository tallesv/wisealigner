/* eslint-disable react/no-children-prop */
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputGroup,
  InputLeftElement,
  FormLabel,
  FormControl,
  FormErrorMessage,
  InputRightAddon,
} from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  inputIcon?: ReactNode | string;
  rightAddon?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, inputIcon, rightAddon, error = null, ...rest },
  ref,
) => {
  return (
    <FormControl isInvalid={!!error}>
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
          focusBorderColor="teal.600"
          ref={ref}
          {...rest}
        />
        {!!rightAddon && (
          <InputRightAddon {...rest} height="auto" children={rightAddon} />
        )}
      </InputGroup>

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
