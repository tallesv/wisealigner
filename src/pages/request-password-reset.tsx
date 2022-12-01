import {
  Box,
  Flex,
  VStack,
  Text,
  Alert,
  AlertIcon,
  Image,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../components/Form/input';
import { Button } from '../components/Button';
import { auth } from '../config/firebase';

type SendResetPasswordEmailFormData = {
  email: string;
};

const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    .required('Por favor insira um E-mail')
    .email('E-mail inválido'),
});

export default function RequestPasswordReset() {
  const [sendResetPasswordEmail, setSendResetPasswordEmail] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const toast = useToast();

  const { register, handleSubmit, formState } =
    useForm<SendResetPasswordEmailFormData>({
      resolver: yupResolver(loginFormSchema),
    });

  const { errors } = formState;

  const handleSendResetPasswordEmail: SubmitHandler<
    SendResetPasswordEmailFormData
  > = async values => {
    try {
      setSendResetPasswordEmail(false);
      setButtonLoading(true);
      await auth.sendPasswordResetEmail(values.email);
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
      setSendResetPasswordEmail(true);
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
          onSubmit={handleSubmit(handleSendResetPasswordEmail)}
          bgColor="white"
          w={[358, 540]}
          borderRadius={5}
          boxShadow="xl"
        >
          <Flex px={[1, 2]} py={[2, 3]} direction="column">
            <VStack spacing={5} px={[7, 16]} align="stretch" py={10}>
              <Text fontSize={24} fontWeight={800}>
                Alterar senha
              </Text>
              <Text>
                Digite abaixo o seu email, e enviaremos um link para você
                resetar a sua senha.
              </Text>

              {sendResetPasswordEmail && (
                <Alert status="error">
                  <AlertIcon />
                  Email não está cadastrado.
                </Alert>
              )}

              <Input
                type="email"
                label="Email"
                bgColor="white"
                error={errors.email}
                {...register('email')}
              />
              <Button type="submit" isLoading={buttonLoading}>
                Enviar
              </Button>
            </VStack>
          </Flex>
        </Box>
      </VStack>
    </Box>
  );
}
