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
  useToast,
} from '@chakra-ui/react';
import { RiCloseLine } from 'react-icons/ri';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import cepPromise from 'cep-promise';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Form/input';
import states from '../../utils/states';
import { withSSRAuth } from '../../utils/withSSRAuth';
import api from '../../client/api';
import { FileUpload } from '../../components/Form/FileUpload';
import deleteFile from '../../utils/deleteFile';
import { getApiClient } from '../../client/apiClient';
import { useAuth } from '../../hooks/useAuth';
import { auth } from '../../config/firebase';

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

interface EditUserProps {
  user: UserType;
}

function EditUser({ user }: EditUserProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [userToEdit, setUserToEdit] = useState<UserType>(user);

  const toast = useToast();

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
    setIsLoading(true);
    await api.put(`/users/${userToEdit.id}`, {
      ...userToEdit,
      ...values,
    });
    const getUpdatedUser = await api.get(`/users/${userToEdit.id}`);
    setUserToEdit(getUpdatedUser.data);
    setIsLoading(false);
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

  const setUserValues = useCallback(
    (userToSet: UserType) => {
      setValue('avatar', userToSet.avatar);
      setValue('name', userToSet.name);
      setValue('last_name', userToSet.last_name);
      setValue('email', userToSet.email);
      setValue('cpf', userToSet.cpf);
      setValue('fixed_phone', userToSet.fixed_phone);
      setValue('phone', userToSet.phone);
      setValue('clinic', userToSet.clinic);
      setValue('cro', userToSet.cro);
      setValue('cro_state', userToSet.cro_state);
      setValue('cep', userToSet.cep);
      setValue('state', userToSet.state);
      setValue('city', userToSet.city);
      setValue('neighborhood', userToSet.neighborhood);
      setValue('street', userToSet.street);
      setValue('complement', userToSet.complement);
      setValue('home_number', userToSet.home_number);
    },
    [setValue],
  );

  async function removeAvatar(url: string) {
    await deleteFile(url);
  }

  async function handleUploadUserAvatar(url: string) {
    if (userToEdit.avatar !== '') {
      await removeAvatar(userToEdit.avatar);
    }

    handleEditUser({
      ...userToEdit,
      avatar: url,
    });
  }

  async function handleRemoveAvatar() {
    await removeAvatar(userToEdit.avatar);
    handleEditUser({
      ...userToEdit,
      avatar: '',
    });
  }

  async function handleSendResetPasswordEmail() {
    try {
      setIsLoading(true);
      await auth.sendPasswordResetEmail(user.email);
      toast({
        title: 'Email enviado',
        description:
          'Um email com o link para resetar a senha foi enviado para o seu email.',
        status: 'info',
        duration: 10000,
        position: 'top-right',
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Houve um erro ao enviar o email para resetar a sua senha.',
        description: 'Por favo tente novamente',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setUserValues(user);
  }, [setUserValues, user]);

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
          disabled={isLoading}
          onClick={() => handleSendResetPasswordEmail()}
          hidden={useAuth().user.id !== user.id}
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
                name={userToEdit.name}
                src={userToEdit.avatar}
              >
                <AvatarBadge
                  hidden={userToEdit.avatar === ''}
                  boxSize={isWideVersion ? 10 : 8}
                  bg="red.500"
                >
                  <Tooltip label="Remover avatar" aria-label="Remove avatar">
                    <IconButton
                      colorScheme="red.500"
                      aria-label="Remove avatar"
                      onClick={() => handleRemoveAvatar()}
                      icon={<RiCloseLine />}
                    />
                  </Tooltip>
                </AvatarBadge>
              </Avatar>

              <FileUpload
                label="Alterar avatar"
                onUploadImage={url => handleUploadUserAvatar(url)}
                isUploading={uploading => setIsLoading(uploading)}
                size={isWideVersion ? 'md' : 'sm'}
                ml={5}
                disabled={isLoading}
              />
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
          onClick={() => setUserValues(userToEdit)}
          mr={5}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type="submit" isLoading={isLoading}>
          Salvar
        </Button>
      </Flex>
    </Box>
  );
}

export default EditUser;

export const getServerSideProps = withSSRAuth(
  async ({ query: { id }, req }) => {
    const { 'wisealigners.token': token } = req.cookies;

    const apiClient = getApiClient(token);
    const response = await apiClient.get(`users/${id}`);

    const user = response.data;

    if (!user) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        user,
      },
    };
  },
);
