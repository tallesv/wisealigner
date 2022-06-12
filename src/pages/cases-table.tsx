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

import {
  RiDeleteBin2Line,
  RiEditLine,
  RiShareBoxLine,
  RiArrowUpLine,
  RiArrowDownLine,
} from 'react-icons/ri';
import api from '../client/api';
import { Pagination } from '../components/Pagination';
import { DeleteDialog } from '../components/UsersTable/DeleteDialog';
import { useAuth } from '../hooks/useAuth';
import { withSSRAuth } from '../utils/withSSRAuth';

function CaseTable() {
  const [page, setPage] = useState(1);
  const [isLoadindCase, setIsLoadingCases] = useState(false);
  const [cases, setCases] = useState<NewCaseType[]>([]);
  const [caseToDelete, setCaseToDelete] = useState<NewCaseType | undefined>();
  const [casesDateOrder, setCaseDateOrder] = useState('ascending');

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

  function handleChangeCasesDateOrder() {
    setIsLoadingCases(true);
    setCaseDateOrder(
      casesDateOrder === 'ascending' ? 'descending' : 'ascending',
    );
    if (casesDateOrder === 'ascending') {
      setCaseDateOrder('descending');
      const casesSorted = cases.sort(
        (a: NewCaseType, b: NewCaseType) =>
          new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
      setCases(casesSorted);
    } else {
      setCaseDateOrder('ascending');
      const casesSorted = cases.sort(
        (a: NewCaseType, b: NewCaseType) =>
          new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      setCases(casesSorted);
    }
    setIsLoadingCases(false);
  }

  useEffect(() => {
    async function loadCases() {
      setIsLoadingCases(true);
      const response = await api.get('/requests');
      if (user.type === 'Admin') {
        const casesSorted = response.data.sort(
          (a: NewCaseType, b: NewCaseType) =>
            new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        setCases(casesSorted);
      } else {
        const filterCases = response.data.filter(
          (caseItem: NewCaseType) => caseItem.userId === user.id,
        );
        const casesSorted = filterCases.sort(
          (a: NewCaseType, b: NewCaseType) =>
            new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        setCases(casesSorted);
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
            <Th display="flex" alignItems="center">
              Data
              <Tooltip
                label={
                  casesDateOrder === 'ascending'
                    ? 'Ordem crescente'
                    : 'Ordem decresente'
                }
                aria-label="case order"
              >
                <IconButton
                  aria-label="Order case"
                  size="xs"
                  ml={4}
                  icon={
                    casesDateOrder === 'ascending' ? (
                      <RiArrowUpLine />
                    ) : (
                      <RiArrowDownLine />
                    )
                  }
                  onClick={() => handleChangeCasesDateOrder()}
                />
              </Tooltip>
            </Th>
            <Th>Opções</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cases.slice((page - 1) * 10, page * 10).map(caseItem => (
            <Tr key={caseItem.id}>
              <Td>
                <Flex align="center">
                  <Avatar
                    size="md"
                    name={caseItem.dados_do_paciente.nome_completo}
                    src={caseItem.dados_do_paciente.avatar}
                  />
                  <Text ml={3}>{caseItem.dados_do_paciente.nome_completo}</Text>
                </Flex>
              </Td>
              <Td>{caseItem.dados_do_paciente.genero}</Td>
              <Td>{new Date(caseItem.date).toLocaleDateString('pt-BR')}</Td>
              <Td>
                <Tooltip label="Ver caso" aria-label="see case">
                  <IconButton
                    aria-label="See case"
                    bgColor="white"
                    icon={<RiShareBoxLine />}
                    onClick={() => push(`/case/${caseItem.id}`)}
                  />
                </Tooltip>
                <Tooltip label="Editar caso" aria-label="edit case">
                  <IconButton
                    aria-label="Edit case"
                    bgColor="white"
                    icon={<RiEditLine />}
                    ml={3}
                    onClick={() => push(`/case/edit/${caseItem.id}`)}
                  />
                </Tooltip>
                <Tooltip label="Deletar caso" aria-label="delete case">
                  <IconButton
                    aria-label="Delte case"
                    bgColor="white"
                    icon={<RiDeleteBin2Line />}
                    onClick={() => handleDeleteCase(caseItem)}
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

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
