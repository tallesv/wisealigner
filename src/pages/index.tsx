import { withSSRAuth } from '../utils/withSSRAuth';

function Home() {
  return <div>Home</div>;
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
