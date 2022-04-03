import {
  Box,
  Flex,
  VStack,
  Text,
  Alert,
  AlertIcon,
  Image,
} from '@chakra-ui/react';
import { useState } from 'react';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/Form/input';
import { Button } from '../components/Button';
import { withSSRGuest } from '../utils/withSSRGuest';

type LoginFormData = {
  email: string;
  password: string;
};

const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('Por favor insira um E-mail')
    .email('E-mail inválido'),
  password: yup.string().required('Por favor insira uma senha.'),
});

export default function Login() {
  const { signIn } = useAuth();
  const [loginError, setLoginError] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const { register, handleSubmit, formState } = useForm<LoginFormData>({
    resolver: yupResolver(loginFormSchema),
  });

  const { errors } = formState;

  const handleLogin: SubmitHandler<LoginFormData> = async values => {
    try {
      setLoginError(false);
      setButtonLoading(true);
      await signIn(values);
    } catch (err) {
      setLoginError(true);
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <Box>
      <VStack pt={[7, 14]} mx="auto" maxW={1000} spacing={3}>
        <Box h={150} w={[358, 540]} pl={[4, 8]}>
          <Image
            maxW="220px"
            maxH="200px"
            mx="auto"
            src="images/wisealignerslogo.png"
          />
        </Box>

        <Box
          as="form"
          onSubmit={handleSubmit(handleLogin)}
          bgColor="white"
          w={[358, 540]}
          borderRadius={5}
          boxShadow="xl"
        >
          <Flex px={[1, 2]} py={[2, 3]} direction="column">
            <VStack spacing={5} px={[7, 16]} align="stretch" py={10}>
              <Text fontSize={24} fontWeight={800}>
                Entrar
              </Text>

              {loginError && (
                <Alert status="error">
                  <AlertIcon />
                  Combinação de email e senha incorreta.
                </Alert>
              )}

              <Input
                type="email"
                label="Email"
                bgColor="white"
                error={errors.email}
                {...register('email')}
              />
              <Box>
                <Flex justifyContent="space-between">
                  <Text fontWeight={700}>Senha</Text>
                  {/* <Text
                    fontWeight={700}
                    color="purple.550"
                    _hover={{
                      color: 'blue.450',
                    }}
                  >
                    <Link href="/sign-up">Esqueceu a senha?</Link>
                  </Text> */}
                </Flex>
                <Input
                  type="password"
                  mt={2}
                  bgColor="white"
                  error={errors.password}
                  {...register('password')}
                />
              </Box>

              <Button type="submit" isLoading={buttonLoading}>
                Entrar
              </Button>
            </VStack>
          </Flex>
        </Box>

        {/* <Flex w={[358, 540]} pl={[2, 4]} fontSize={14} align="left">
          <Text>Não possui conta?</Text>
          <Text
            ml={2}
            color="purple.550"
            _hover={{
              color: 'blue.450',
            }}
          >
            <Link href="/sign-up">Criar conta</Link>
          </Text>
        </Flex> */}
      </VStack>
    </Box>
  );
}

export const getServerSideProps = withSSRGuest(async () => {
  return {
    props: {},
  };
});
