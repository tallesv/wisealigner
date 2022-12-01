import { Box, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { Button } from '../components/Button';

export default function NotFound() {
  return (
    <Box>
      <Flex
        py={[7, 14]}
        px={10}
        mx="auto"
        maxW={1000}
        direction="column"
        alignItems="center"
      >
        <Text fontSize={[58, 58, 160, 220]} fontWeight={500}>
          404
        </Text>
        <Text fontSize={[28, 38]} fontWeight={700}>
          Essa página não existe.
        </Text>
        <Text mt={[2, 4, 8]}>
          Infelizmente, isso é uma página de erro. Você pode ter digitado errado
          o endereço ou essa URL não existe mais.
        </Text>
        <Link href="/">
          <Button mt={8}>Voltar para home</Button>
        </Link>
      </Flex>
    </Box>
  );
}
