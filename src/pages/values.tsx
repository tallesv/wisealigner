import { Box, Flex, Heading, Image, Divider } from '@chakra-ui/react';
import { withSSRAuth } from '../utils/withSSRAuth';

function Values() {
  return (
    <Box p={[6, 8]}>
      <Flex mx="auto">
        <Heading size="lg">Valores</Heading>
      </Flex>

      <Divider my="6" />

      <Box mt={10}>
        <Image
          mx="auto"
          src="https://restrita.orthoemotion.com.br/dist/img/tabela-valores-20-01-22.jpg"
        />
      </Box>
    </Box>
  );
}

export default Values;

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
