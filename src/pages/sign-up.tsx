import { Box, useBreakpointValue, Flex, VStack, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { Input } from '../components/Form/input';
import { Button } from '../components/Button';

export default function SignUp(): JSX.Element {
  let isDefaultSize = true;

  isDefaultSize = !!useBreakpointValue({
    lg: true,
    sm: false,
  });

  return (
    <Box>
      <Flex
        mx="auto"
        maxW={1000}
        pt={[7, 14]}
        direction="row"
        justifyContent={isDefaultSize ? 'space-between' : 'center'}
      >
        {isDefaultSize && (
          <Box pt={19} mr={16}>
            <Text mb={8} fontSize={[24]} fontWeight={800}>
              wisealigners
            </Text>

            <VStack spacing={5} align="stretch">
              {[1, 2, 3].map(item => (
                <Box key={item}>
                  <Flex alignItems="center">
                    <CheckCircleIcon color="purple.550" marginRight={2} />

                    <Text fontWeight={800} fontSize={17}>
                      Get started quickly
                    </Text>
                  </Flex>
                  <Text ml={6}>
                    Integrate with developer-friendly APIs or choose low-code or
                    pre-built solutions.
                  </Text>
                </Box>
              ))}
            </VStack>
          </Box>
        )}

        <Box>
          <VStack
            spacing={5}
            align="stretch"
            h={628}
            w={[358, 540]}
            px={[7, 12]}
            py={[7, 14]}
            bgColor="white"
            borderRadius={5}
            boxShadow="xl"
          >
            <Text fontSize={[20, 22]} fontWeight={800}>
              Crie sua conta na wisealigners
            </Text>
            <Input name="email" label="Email" type="email" size="md" />
            <Input name="name" label="Nome" size="md" />
            <Input name="password" label="Senha" type="password" size="md" />
            <Input
              name="password_confirmation"
              label="Confirmação de Senha"
              type="password"
              size="md"
            />

            <Button>Criar conta</Button>

            <Flex pt={3} fontSize={14} justify="center">
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
            </Flex>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}
