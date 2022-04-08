import { Box, Flex, Heading, Image, Divider } from '@chakra-ui/react';
import { withSSRAuth } from '../utils/withSSRAuth';

function Home() {
  return (
    <Box p={[6, 8]}>
      <Flex mx="auto">
        <Heading size="lg">Seja bem vindo!</Heading>
      </Flex>

      <Divider my="6" />

      <Box mt={10}>
        <a
          href="https://www.youtube.com/watch?v=q6j8WWWgNMQ"
          target="_blank"
          rel="noreferrer"
        >
          <Image mx="auto" src="/images/aviso-viewer.jpg" />
        </a>
      </Box>
    </Box>
  );
}

export default Home;

export const getServerSideProps = withSSRAuth(async () => {
  return {
    redirect: {
      destination: '/cases-table',
      permanent: false,
    },
  };

  return {
    props: {},
  };
});
