/* eslint-disable react/function-component-definition */
import {
  RadioGroup as ChakraRadioGroup,
  RadioGroupProps as ChakraRadioGroupProps,
  InputGroup,
  InputLeftElement,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

interface RadioGroupProps extends ChakraRadioGroupProps {
  name: string;
  onChangeOption: (values: string) => void;
  children: ReactNode;
  label?: string;
  error?: FieldError;
}

const RadioGroupBase: ForwardRefRenderFunction<
  HTMLInputElement,
  RadioGroupProps
> = ({ name, onChangeOption, children, label, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel fontWeight={700} htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <ChakraRadioGroup
        id={name}
        name={name}
        onChange={value => onChangeOption(value)}
        ref={ref}
        {...rest}
      >
        {children}
      </ChakraRadioGroup>

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const RadioGroup = forwardRef(RadioGroupBase);
