import {
  Box,
  Heading,
  Divider,
  Flex,
  Avatar,
  VStack,
  Stack,
  useBreakpointValue,
  Select,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import { Button } from '../components/Button';
import { Input } from '../components/Form/input';
import states from '../utils/states';

function EditUser() {
  const inputSize = 'md';

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box bgColor="white" w="100%" p={[6, 8]} borderRadius={8}>
      <Heading size="lg">Editar dados</Heading>

      <Divider my="6" borderColor="gray.800" />

      <Flex direction="column">
        <VStack spacing={[8]} px={10}>
          <Stack
            w="100%"
            direction={['column', 'column', 'row']}
            justifyContent="space-between"
          >
            <Heading as="h3" size="md">
              Foto de perfil
            </Heading>
            <Flex align="center" justify="space-evenly">
              <Avatar
                size={isWideVersion ? 'xl' : 'lg'}
                name="Talles"
                src="https://github.com/tallesv.png"
              />

              <Button size={isWideVersion ? 'md' : 'sm'} ml={5}>
                Alterar avatar
              </Button>
            </Flex>
          </Stack>

          <Divider borderColor="gray.300" />

          <Stack
            w="100%"
            direction={['column', 'column', 'row']}
            justifyContent="space-between"
          >
            <Heading as="h3" size="md">
              Dados pessoais
            </Heading>
            <VStack maxW={400} w="100%" spacing={3}>
              <Input name="name" label="Nome" size={inputSize} />
              <Input name="surname" label="Sobrenome" size={inputSize} />
              <Input name="email" label="Email" type="email" size={inputSize} />
              <Input name="cpf" label="CPF" size={inputSize} />
              <Input name="phone-fixed" label="Fone Fixo" size={inputSize} />
              <Input name="phone" label="Celular" size={inputSize} />
            </VStack>
          </Stack>

          <Divider borderColor="gray.300" />

          <Stack
            w="100%"
            direction={['column', 'column', 'row']}
            justifyContent="space-between"
          >
            <Heading as="h3" size="md">
              Dados da clínica
            </Heading>
            <VStack maxW={400} w="100%" spacing={3}>
              <Input name="clinic" label="Clínica" size={inputSize} />
              <Input name="cro" label="CRO" size={inputSize} />
              <FormControl>
                <FormLabel fontWeight={700}>Estado do CRO</FormLabel>
                <Select name="stcro-stateate" size={inputSize}>
                  <option key="--" value={undefined}>
                    {' '}
                  </option>
                  {states.map(state => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </VStack>
          </Stack>

          <Divider borderColor="gray.300" />

          <Stack
            w="100%"
            direction={['column', 'column', 'row']}
            justifyContent="space-between"
          >
            <Heading as="h3" size="md">
              Endereço
            </Heading>
            <VStack maxW={400} w="100%" spacing={3}>
              <Input name="address" label="Endereço" size={inputSize} />
              <Input name="adress-number" label="Número" size={inputSize} />
              <Input
                name="adress-number"
                label="Complemento"
                size={inputSize}
              />
              <Input name="neighborhood" label="Bairro" size={inputSize} />
              <Input name="city" label="Cidade" size={inputSize} />
              <FormControl>
                <FormLabel fontWeight={700}>Estado</FormLabel>
                <Select name="state" size={inputSize}>
                  <option key="--" value={undefined}>
                    {' '}
                  </option>
                  {states.map(state => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <Input name="cep" label="CEP" size={inputSize} />
            </VStack>
          </Stack>
        </VStack>
      </Flex>
    </Box>
  );
}

export default EditUser;
