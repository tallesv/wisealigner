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
  AvatarBadge,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { RiCloseLine } from 'react-icons/ri';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import cepPromise from 'cep-promise';
import { Button } from '../components/Button';
import { Input } from '../components/Form/input';
import states from '../utils/states';

type EditUserFormData = {
  avatar: string;
  name: string;
  last_name: string;
  email: string;
  cpf: string;
  fixed_phone: string;
  phone: string;
  clinic: string;
  cro: string;
  cro_state: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  complement: string;
  home_number: string;
};

const editUserFormSchema = yup.object().shape({
  avatar: yup.string(),
  name: yup.string().required('Nome obrigatório'),
  last_name: yup.string(),
  email: yup
    .string()
    .required('E-mail obrigatório')
    .email('E-mail obrigatório'),
  cpf: yup.string().required('CPF obrigatório'),
  fixed_phone: yup.string(),
  phone: yup.string(),
  clinic: yup.string(),
  cro: yup.string(),
  cro_state: yup.string(),
  cep: yup.string(),
  state: yup.string(),
  city: yup.string(),
  neighborhood: yup.string(),
  street: yup.string(),
  complement: yup.string(),
  home_number: yup.string(),
});

function EditUser() {
  const inputSize = 'md';

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { register, handleSubmit, formState, setValue } =
    useForm<EditUserFormData>({
      resolver: yupResolver(editUserFormSchema),
    });

  const { errors } = formState;

  const handleEditUser: SubmitHandler<EditUserFormData> = async values => {
    console.log(values);
  };

  async function handleFillAddress(cep: string) {
    try {
      if (cep.length === 8 || cep.length === 9) {
        const formatedCep = cep.replace(/-/g, '');
        const address = await cepPromise(formatedCep);
        setValue('state', address.state);
        setValue('city', address.city);
        setValue('neighborhood', address.neighborhood);
        setValue('street', address.street);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  return (
    <Box
      maxWidth={1000}
      mx="auto"
      p={[6, 8]}
      as="form"
      onSubmit={handleSubmit(handleEditUser)}
    >
      <Flex justifyContent="space-between">
        <Heading size="lg">Editar dados</Heading>

        <Button
          bgColor="white"
          _hover={{ bgColor: 'white' }}
          color="blue.450"
          variant="outline"
          size="md"
        >
          Alterar senha
        </Button>
      </Flex>

      <Divider my="6" borderColor="gray.800" />

      <Flex direction="column">
        <VStack spacing={[8]} px={10}>
          <Stack
            w="100%"
            direction={['column', 'column', 'row']}
            justifyContent="space-between"
          >
            <Heading mb={5} as="h3" size="md">
              Foto de perfil
            </Heading>
            <Flex align="center" justify="space-evenly">
              <Avatar
                size={isWideVersion ? 'xl' : 'lg'}
                name="Talles"
                src="https://github.com/tallesv.png"
              >
                <AvatarBadge boxSize={10} bg="red.500">
                  <Tooltip label="Remover avatar" aria-label="Remove avatar">
                    <IconButton
                      colorScheme="red.500"
                      aria-label="Remove avatar"
                      icon={<RiCloseLine />}
                    />
                  </Tooltip>
                </AvatarBadge>
              </Avatar>

              <Button
                bgColor="white"
                _hover={{ bgColor: 'white' }}
                color="blue.450"
                variant="outline"
                size={isWideVersion ? 'md' : 'sm'}
                ml={5}
              >
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
            <Heading mb={5} as="h3" size="md">
              Dados pessoais
            </Heading>
            <VStack maxW={400} w="100%" spacing={3}>
              <Input
                label="Nome"
                size={inputSize}
                error={errors.name}
                {...register('name')}
              />
              <Input
                label="Sobrenome"
                size={inputSize}
                error={errors.last_name}
                {...register('last_name')}
              />
              <Input
                label="Email"
                type="email"
                size={inputSize}
                error={errors.email}
                {...register('email')}
              />
              <Input
                label="CPF"
                size={inputSize}
                error={errors.cpf}
                {...register('cpf')}
              />
              <Input
                label="Fone Fixo"
                size={inputSize}
                error={errors.fixed_phone}
                {...register('fixed_phone')}
              />
              <Input
                label="Celular"
                size={inputSize}
                error={errors.phone}
                {...register('phone')}
              />
            </VStack>
          </Stack>

          <Divider borderColor="gray.300" />

          <Stack
            w="100%"
            direction={['column', 'column', 'row']}
            justifyContent="space-between"
          >
            <Heading mb={5} as="h3" size="md">
              Dados da clínica
            </Heading>
            <VStack maxW={400} w="100%" spacing={3}>
              <Input label="Clínica" size={inputSize} {...register('clinic')} />
              <Input label="CRO" size={inputSize} {...register('cro')} />
              <FormControl>
                <FormLabel fontWeight={700}>Estado do CRO</FormLabel>
                <Select size={inputSize} {...register('cro_state')}>
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
            <Heading mb={5} as="h3" size="md">
              Endereço
            </Heading>
            <VStack maxW={400} w="100%" spacing={3}>
              <Input
                label="CEP"
                size={inputSize}
                type="number"
                {...register('cep')}
                onChange={e => handleFillAddress(e.target.value)}
              />
              <FormControl>
                <FormLabel fontWeight={700}>Estado</FormLabel>
                <Select size={inputSize} {...register('state')}>
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
              <Input label="Cidade" size={inputSize} {...register('city')} />
              <Input
                label="Bairro"
                size={inputSize}
                {...register('neighborhood')}
              />
              <Input
                label="Endereço"
                size={inputSize}
                {...register('street')}
              />
              <Input
                label="Complemento"
                size={inputSize}
                {...register('complement')}
              />
              <Input
                label="Número"
                size={inputSize}
                {...register('home_number')}
              />
            </VStack>
          </Stack>

          <Divider borderColor="gray.300" />
        </VStack>
      </Flex>

      <Flex justify="flex-end" mt={6}>
        <Button
          bgColor="white"
          _hover={{ bgColor: 'white' }}
          color="blue.450"
          variant="outline"
          mr={5}
        >
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </Flex>
    </Box>
  );
}

export default EditUser;
