import { Box, Flex, Heading, Image, Divider } from '@chakra-ui/react';
import { withSSRAuth } from '../utils/withSSRAuth';

function Values() {
  return (
    <Box p={[6, 8]}>
      <Flex mx="auto">
        <Heading size="lg">Valores</Heading>
      </Flex>

      <Divider my="6" />

      <Flex mt={10} direction="column">
        <Image mx="auto" src="/images/valores1.jpeg" />

        <Image mx="auto" src="/images/valores2.jpeg" />
      </Flex>
    </Box>
  );
}

export default Values;

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
