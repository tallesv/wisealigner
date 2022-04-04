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
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { RiDeleteBin2Line, RiEditLine } from 'react-icons/ri';
import api from '../client/api';
import { Pagination } from '../components/Pagination';
import { DeleteDialog } from '../components/UsersTable/DeleteDialog';
import { useAuth } from '../hooks/useAuth';

function CaseTable() {
  const [page, setPage] = useState(1);
  const [isLoadindCase, setIsLoadingCases] = useState(false);
  const [cases, setCases] = useState<NewCaseType[]>([]);
  const [caseToDelete, setCaseToDelete] = useState<NewCaseType | undefined>();

  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { push } = useRouter();

  function handleDeleteCase(caseItem: NewCaseType) {
    setCaseToDelete(caseItem);
    onOpen();
  }

  function afterDeletedCase() {
    const updateCases = [...cases].filter(
      caseItem => caseItem.id !== caseToDelete?.id,
    );
    setCases(updateCases);
    setCaseToDelete(undefined);
  }

  useEffect(() => {
    async function loadCases() {
      setIsLoadingCases(true);
      const response = await api.get('/requests');
      if (user.type === 'Admin') {
        setCases(response.data);
      } else {
        const filterCases = response.data.filter(
          (caseItem: NewCaseType) => caseItem.userId === user.id,
        );
        setCases(filterCases);
      }
      setIsLoadingCases(false);
    }

    loadCases();
  }, [user, user.id, user.type]);

  return (
    <Box p={[6, 8]}>
      <DeleteDialog
        pacientName={caseToDelete?.dados_do_paciente.nome_completo}
        caseId={caseToDelete?.id}
        isOpen={isOpen}
        onClose={onClose}
        onDelete={() => afterDeletedCase()}
      />

      <Flex mx="auto">
        <Heading size="lg">
          Casos
          {isLoadindCase && <Spinner ml={5} />}
        </Heading>
      </Flex>
      <Table variant="simple" mt={5}>
        <Thead>
          <Tr bgColor="gray.200">
            <Th>Nome</Th>
            <Th>Gênero</Th>
            <Th>Data</Th>
            <Th isNumeric>Opções</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cases.slice((page - 1) * 10, page * 10).map(caseItem => (
            <Tr key={caseItem.id}>
              <Td>
                <Flex align="center">
                  <Avatar
                    size="md"
                    name="teste"
                    src={caseItem.dados_do_paciente.avatar}
                  />
                  <Text ml={3}>{caseItem.dados_do_paciente.nome_completo}</Text>
                </Flex>
              </Td>
              <Td>{caseItem.dados_do_paciente.genero}</Td>
              <Td>{new Date(caseItem.date).toLocaleDateString('pt-BR')}</Td>
              <Td isNumeric>
                <Tooltip label="Deletar caso" aria-label="delete case">
                  <IconButton
                    aria-label="Delte case"
                    bgColor="white"
                    icon={<RiDeleteBin2Line />}
                    onClick={() => handleDeleteCase(caseItem)}
                  />
                </Tooltip>
                <Tooltip label="Editar caso" aria-label="edit case">
                  <IconButton
                    aria-label="Edit case"
                    bgColor="white"
                    icon={<RiEditLine />}
                    ml={3}
                    onClick={() => push(`/case/${caseItem.id}`)}
                  />
                </Tooltip>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Pagination
        totalCountOfRegisters={cases.length}
        currentPage={page}
        onPageChange={setPage}
      />
    </Box>
  );
}

export default CaseTable;
