import { Flex, Center, VStack, Text, Button } from '@chakra-ui/react';
import Image from 'next/image';
import { Input } from '../components/Form/input';

export default function Login() {
  return (
    <Center h="100vh">
      <Flex w={700} p={[2, 10]} mb={[20, 40]} direction="column">
        <Image src="/vercel.svg" width={100} height={50} />
        <VStack spacing={7} px={[7, 20]} align="stretch" mt={10}>
          <Text fontSize={24} fontWeight={900}>
            Entrar
          </Text>
          <Input name="email" type="email" placeholder="Email" />
          <Input name="password" type="password" placeholder="Senha" />
          <Button
            size="lg"
            fontSize="lg"
            letterSpacing={1.2}
            colorScheme="blue"
          >
            Entrar
          </Button>
          <Text>Não possui conta?</Text>
        </VStack>
      </Flex>
    </Center>
  );
}
