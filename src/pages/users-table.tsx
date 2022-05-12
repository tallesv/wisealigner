import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Avatar,
  Text,
  Tooltip,
  IconButton,
  Badge,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { RiEditLine } from 'react-icons/ri';
import api from '../client/api';
import { Pagination } from '../components/Pagination';
import { withSSRAuth } from '../utils/withSSRAuth';

function UsersTable() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<UserType[]>([]);

  const { push } = useRouter();

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/users');
      setUsers(response.data);
    }

    loadUsers();
  }, []);

  return (
    <Box p={[6, 8]}>
      <Flex mx="auto">
        <Heading size="lg">Usuários</Heading>
      </Flex>

      <Table variant="simple" mt={5}>
        <Thead>
          <Tr bgColor="gray.200">
            <Th>Nome</Th>
            <Th>Email</Th>
            <Th>Tipo</Th>
            <Th isNumeric>Opções</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.slice((page - 1) * 10, page * 10).map(user => (
            <Tr key={user.id}>
              <Td>
                <Flex align="center">
                  <Avatar size="md" name={user.name} src={user.avatar} />
                  <Text ml={3}>{user.name}</Text>
                </Flex>
              </Td>
              <Td>{user.email}</Td>
              <Td>
                <Badge colorScheme={user.type === 'Admin' ? 'red' : 'green'}>
                  {user.type}
                </Badge>
              </Td>
              <Td isNumeric>
                {/* <Tooltip label="Deletar usuário" aria-label="delete user">
                  <IconButton
                    aria-label="delete user"
                    bgColor="white"
                    icon={<RiDeleteBin2Line />}
                  />
                </Tooltip> */}
                <Tooltip label="Editar usuário" aria-label="delete user">
                  <IconButton
                    aria-label="delete user"
                    bgColor="white"
                    icon={<RiEditLine />}
                    ml={3}
                    onClick={() => push(`edit-user/${user.id}`)}
                  />
                </Tooltip>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Pagination
        totalCountOfRegisters={users.length}
        currentPage={page}
        onPageChange={setPage}
      />
    </Box>
  );
}

export default UsersTable;

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
