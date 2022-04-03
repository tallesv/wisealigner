import {
  Box,
  VStack,
  Text,
  Flex,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Input } from '../components/Form/input';
import { Button } from '../components/Button';
import { auth } from '../config/firebase';

type ResetPasswordFormData = {
  password: string;
  password_confirmation: string;
};

const resetPasswordFormSchema = yup.object().shape({
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

interface ResetPasswordProps {
  code: string;
}

function ResetPassword({ code }: ResetPasswordProps) {
  const [buttonLoading, setButtonLoading] = useState(false);

  const { push } = useRouter();
  const toast = useToast();

  const { register, handleSubmit, formState } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordFormSchema),
  });

  const { errors } = formState;

  const isDefaultSize = useBreakpointValue({
    lg: true,
    sm: false,
  });

  const handleResetPassword: SubmitHandler<
    ResetPasswordFormData
  > = async values => {
    try {
      setButtonLoading(true);
      await auth.confirmPasswordReset(code, values.password);
      toast({
        title: 'Senha alterada.',
        status: 'success',
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      });
      setButtonLoading(false);
      push('/');
    } catch (err) {
      toast({
        title: 'Houve um erro ao alterar a sua senha.',
        description: 'Por favo tente novamente',
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    async function verifyCode() {
      try {
        await auth.verifyPasswordResetCode(code);
      } catch (err) {
        toast({
          title: 'O link para resetar a senha expirou!',
          status: 'error',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
        push('/login');
      }
    }
    verifyCode();
  }, [code, push, toast]);

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
        <Box mx="auto" as="form" onSubmit={handleSubmit(handleResetPassword)}>
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
              Alterar senha
            </Text>
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
              Alterar
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}

export default ResetPassword;

export const getServerSideProps: GetServerSideProps = async ({
  query: { oobCode },
}) => {
  const code = Array.isArray(oobCode) ? oobCode[0] : oobCode;

  return {
    props: {
      code,
    },
  };
};
