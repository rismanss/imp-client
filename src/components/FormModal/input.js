import { forwardRef } from 'react';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput
} from '@chakra-ui/react'

const InputBase = ({ name, label, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error} mt={6}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <ChakraInput
        name={name}
        id={name}
        focusBorderColor={error ? "red" : "green.500"}
        ref={ref}
        {...rest} />

      {!!error && (
        <FormErrorMessage>
          {error.message}
        </FormErrorMessage>
      )}

    </FormControl>
  );
}

export const Input = forwardRef(InputBase);