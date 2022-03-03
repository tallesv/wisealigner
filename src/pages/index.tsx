import { withSSRAuth } from '../utils/withSSRAuth';

function Home() {
  return <div>Home</div>;
}

export default Home;

export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {},
  };
});
