import { Box, Flex, VStack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { Input } from '../components/Form/input';
import { Button } from '../components/Button';

export default function Login() {
  return (
    <Box>
      <VStack pt={[7, 14]} mx="auto" maxW={1000} spacing={10}>
        <Box h={6} w={[358, 540]} pl={[4, 8]} align="left">
          <Text fontSize={[24]} fontWeight={800}>
            Untitleproject
          </Text>
        </Box>

        <Box
          bgColor="white"
          w={[358, 540]}
          h={[436]}
          borderRadius={5}
          boxShadow="xl"
        >
          <Flex px={[1, 2]} py={[2, 3]} direction="column">
            <VStack spacing={7} px={[7, 16]} align="stretch" mt={10}>
              <Text fontSize={24} fontWeight={800}>
                Entrar
              </Text>
              <Input name="email" type="email" label="Email" />
              <Box>
                <Flex justifyContent="space-between">
                  <Text fontWeight={700}>Senha</Text>
                  <Text
                    fontWeight={700}
                    as="a"
                    color="purple.550"
                    _hover={{
                      color: 'blue.450',
                    }}
                  >
                    <Link href="/sign-up">Esqueceu a senha?</Link>
                  </Text>
                </Flex>
                <Input name="password" type="password" mt={2} />
              </Box>
              <Button>Entrar</Button>
            </VStack>
          </Flex>
        </Box>

        <Flex w={[358, 540]} pl={[2, 4]} fontSize={14} align="left">
          <Text>Não possui conta?</Text>
          <Text
            as="a"
            ml={2}
            color="purple.550"
            _hover={{
              color: 'blue.450',
            }}
          >
            <Link href="/sign-up">Criar conta</Link>
          </Text>
        </Flex>
      </VStack>
    </Box>
  );
}
