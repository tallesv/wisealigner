import {
  Box,
  useBreakpointValue,
  Flex,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../components/Form/input';
import { Button } from '../components/Button';
import api from '../client/api';
import { withSSRAuth } from '../utils/withSSRAuth';

type RegisterFormData = {
  email: string;
  name: string;
  last_name: string;
  password: string;
  password_confirmation: string;
};

const registerFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('Por favor insira um E-mail')
    .email('E-mail inválido'),
  name: yup.string().required('Por favor insira seu Nome'),
  last_name: yup.string(),
  password: yup
    .string()
    .required('Por favor insira uma senha.')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  password_confirmation: yup
    .string()
    .required('Por favor insira a confirmação da senha.')
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .equals([yup.ref('password')], 'As senhas precisam ser iguais.'),
});

export default function SignUp(): JSX.Element {
  const { push } = useRouter();
  const toast = useToast();

  const [buttonLoading, setButtonLoading] = useState(false);

  let isDefaultSize = true;

  isDefaultSize = !!useBreakpointValue({
    lg: true,
    sm: false,
  });

  const { register, handleSubmit, formState } = useForm<RegisterFormData>({
    resolver: yupResolver(registerFormSchema),
  });

  const { errors } = formState;

  const handleRegister: SubmitHandler<RegisterFormData> = async values => {
    try {
      setButtonLoading(true);
      await api.post('/users', {
        ...values,
        type: 'Client',
      });
      toast({
        title: 'Usuário criado com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      push('/');
    } catch (err) {
      toast({
        title: 'Houve um erro ao criar o usuário.',
        description: 'Por favo tente novamente',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setButtonLoading(false);
    }
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Text>Loading</Text>;

  return (
    <Box>
      <Flex
        mx="auto"
        maxW={1000}
        pt={[7, 14]}
        direction="row"
        justifyContent={isDefaultSize ? 'space-between' : 'center'}
      >
        <Box mx="auto" as="form" onSubmit={handleSubmit(handleRegister)}>
          <VStack
            spacing={5}
            align="stretch"
            w={[358, 540]}
            px={[7, 12]}
            py={[7, 14]}
            bgColor="white"
            borderRadius={5}
            boxShadow="xl"
          >
            <Text fontSize={[20, 22]} fontWeight={800}>
              Novo usuário
            </Text>
            <Input
              label="Email"
              type="email"
              size="md"
              bgColor="white"
              error={errors.email}
              {...register('email')}
            />
            <Input
              label="Nome"
              size="md"
              bgColor="white"
              error={errors.name}
              {...register('name')}
            />

            <Input
              label="Sobrenome"
              size="md"
              bgColor="white"
              error={errors.last_name}
              {...register('last_name')}
            />
            <Input
              label="Senha"
              type="password"
              size="md"
              bgColor="white"
              error={errors.password}
              {...register('password')}
            />
            <Input
              label="Confirmação de Senha"
              type="password"
              size="md"
              bgColor="white"
              error={errors.password_confirmation}
              {...register('password_confirmation')}
            />

            <Button type="submit" isLoading={buttonLoading}>
              Registrar usuário
            </Button>

            {/* <Flex pt={3} fontSize={14} justify="center">
              <Text>Já possui conta?</Text>
              <Text
                ml={2}
                color="purple.550"
                _hover={{
                  color: 'blue.450',
                }}
              >
                <Link href="/login">Faça o login</Link>
              </Text>
            </Flex> */}
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
