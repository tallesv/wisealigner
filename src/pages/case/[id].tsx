/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  List,
  ListItem,
  Spinner,
  Stack,
  Text,
  UnorderedList,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../client/api';
import { CommentBox } from '../../components/CommentBox';
import { CheckBoxGroup } from '../../components/Form/CheckBoxGroup';
import { ImagesSlider } from '../../components/ImagesSlider/index';
import { withSSRAuth } from '../../utils/withSSRAuth';

function ShowCase() {
  const [isLoadingCase, setIsLoadingCase] = useState(false);
  const [clientCase, setClientCase] = useState<ShowNewCaseType>();
  const { query } = useRouter();

  const caseId = query.id as string;

  const checkBoxSize = useBreakpointValue({
    lg: 'md',
    sm: 'sm',
  });

  const isDefaultSize = useBreakpointValue({
    xl: true,
    lg: false,
  });

  useEffect(() => {
    async function loadData() {
      setIsLoadingCase(true);
      const response = await api.get(`requests/${caseId}`);
      const caseFromRequest = response.data.request;
      setClientCase(caseFromRequest);
      setIsLoadingCase(false);
    }

    if (caseId) {
      loadData();
    }
  }, [caseId]);

  return (
    <Box mx="auto" p={[6, 8]}>
      <Heading size="lg">
        Caso
        {isLoadingCase && <Spinner ml={5} />}
        {clientCase &&
          clientCase.dados_do_paciente !== '' &&
          ` - ${clientCase.dados_do_paciente.nome_completo}`}
      </Heading>

      <Accordion mt={10} allowMultiple hidden={clientCase === undefined}>
        <AccordionItem>
          <AccordionButton pl={0}>
            <Box flex="1" textAlign="left">
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color="yellow.500"
                fontWeight="500"
                textTransform="uppercase"
              >
                Comentários
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <CommentBox caseId={caseId} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Box mt={5} hidden={clientCase === undefined}>
        {clientCase?.dados_do_paciente !== '' && (
          <Box>
            <Text
              fontSize={{ base: '16px', lg: '18px' }}
              color="yellow.500"
              fontWeight="500"
              textTransform="uppercase"
              mb="4"
            >
              Dados do Paciente
            </Text>

            <Stack
              direction={['column-reverse', 'column-reverse', 'row']}
              justifyContent="space-between"
              spacing={5}
            >
              <List spacing={2} w="50%">
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Nome Completo do paciente:
                  </Text>{' '}
                  {clientCase?.dados_do_paciente.nome_completo}
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Gênero:
                  </Text>{' '}
                  {clientCase?.dados_do_paciente.genero}
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Data de nascimento:
                  </Text>{' '}
                  {clientCase?.dados_do_paciente.data_de_nascimento &&
                    new Date(
                      clientCase?.dados_do_paciente.data_de_nascimento,
                    ).toLocaleDateString('pt-BR')}
                </ListItem>
              </List>
              <Box w="50%">
                <Avatar
                  mx="auto"
                  size={isDefaultSize ? 'xl' : 'lg'}
                  src={clientCase?.dados_do_paciente.avatar}
                />
              </Box>
            </Stack>
          </Box>
        )}

        <Divider my="6" borderColor="gray.300" />

        <Box>
          <Text
            fontSize={{ base: '16px', lg: '18px' }}
            color="yellow.500"
            fontWeight="500"
            textTransform="uppercase"
            mb="4"
          >
            Arco
          </Text>

          <List spacing={2}>
            <ListItem>
              {clientCase?.tratarArco === ''
                ? 'Não informado'
                : clientCase?.tratarArco}
            </ListItem>
          </List>
        </Box>

        <Divider my="6" borderColor="gray.300" />

        <Box>
          <Text
            fontSize={{ base: '16px', lg: '18px' }}
            color="yellow.500"
            fontWeight="500"
            textTransform="uppercase"
            mb="4"
          >
            Restrição De Movimento Dentário
          </Text>

          <List spacing={2}>
            <ListItem>
              {clientCase === undefined ||
              clientCase?.restricao_de_movimento_dentario === '' ? (
                'Não informado'
              ) : (
                <Box>
                  <Text align="initial">
                    {clientCase?.restricao_de_movimento_dentario.option}
                  </Text>
                  <Box>
                    <CheckBoxGroup
                      itensSelected={
                        clientCase?.restricao_de_movimento_dentario.sub_options
                      }
                      isDefaultSize={isDefaultSize}
                      isDisabled
                      checkBoxSize={checkBoxSize}
                      onSelect={() => {}}
                    />
                  </Box>
                </Box>
              )}
            </ListItem>
          </List>
        </Box>

        <Divider my="6" borderColor="gray.300" />

        <Box>
          <Text
            fontSize={{ base: '16px', lg: '18px' }}
            color="yellow.500"
            fontWeight="500"
            textTransform="uppercase"
            mb="4"
          >
            Attachments
          </Text>

          <List spacing={2}>
            <ListItem>
              {clientCase === undefined || clientCase?.attachments === '' ? (
                'Não informado'
              ) : (
                <Box>
                  <Text align="initial">{clientCase?.attachments.option}</Text>
                  <Box>
                    <CheckBoxGroup
                      itensSelected={clientCase?.attachments.sub_options}
                      isDefaultSize={isDefaultSize}
                      isDisabled
                      checkBoxSize={checkBoxSize}
                      onSelect={() => {}}
                    />
                  </Box>
                </Box>
              )}
            </ListItem>
          </List>
        </Box>

        <Divider my="6" borderColor="gray.300" />

        <Box>
          <Text
            fontSize={{ base: '16px', lg: '18px' }}
            color="yellow.500"
            fontWeight="500"
            textTransform="uppercase"
            mb="4"
          >
            Relação Ântero-Posterior (A-P)
          </Text>
          <List spacing={2}>
            {clientCase === undefined ||
            clientCase?.relacao_antero_posterior === '' ? (
              <Text>Não informado</Text>
            ) : (
              <>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    D:
                  </Text>{' '}
                  {clientCase?.relacao_antero_posterior.d}
                </ListItem>

                <ListItem>
                  <Text as="span" fontWeight="bold">
                    E:
                  </Text>{' '}
                  {clientCase?.relacao_antero_posterior.e}
                </ListItem>

                <ListItem>
                  {clientCase.relacao_antero_posterior.option}
                </ListItem>
                <ListItem>
                  <UnorderedList pl={3}>
                    {clientCase.relacao_antero_posterior.sub_options?.map(
                      subOption => (
                        <ListItem key={subOption}>{subOption}</ListItem>
                      ),
                    )}
                  </UnorderedList>
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Observações:
                  </Text>{' '}
                  {clientCase?.relacao_antero_posterior.observation === ''
                    ? 'Nao informado'
                    : clientCase?.relacao_antero_posterior.observation}
                </ListItem>
              </>
            )}
          </List>
        </Box>

        <Divider my="6" borderColor="gray.300" />

        <Box>
          <Text
            fontSize={{ base: '16px', lg: '18px' }}
            color="yellow.500"
            fontWeight="500"
            textTransform="uppercase"
            mb="4"
          >
            Overjet
          </Text>
          <List spacing={2}>
            <ListItem>
              {clientCase === undefined || clientCase.overjet === ''
                ? 'Não informado'
                : clientCase.overjet}
            </ListItem>
          </List>
        </Box>

        <Divider my="6" borderColor="gray.300" />

        <Box>
          <Text
            fontSize={{ base: '16px', lg: '18px' }}
            color="yellow.500"
            fontWeight="500"
            textTransform="uppercase"
            mb="4"
          >
            Sobremordida
          </Text>
          <List spacing={2}>
            {clientCase === undefined || clientCase?.sobremordida === '' ? (
              <Text>Não informado</Text>
            ) : (
              <>
                <ListItem>{clientCase.sobremordida.option}</ListItem>
                <ListItem>
                  <UnorderedList pl={3}>
                    {clientCase.sobremordida.sub_options?.map(subOption => (
                      <ListItem key={subOption}>{subOption}</ListItem>
                    ))}
                  </UnorderedList>
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Observações:
                  </Text>{' '}
                  {clientCase?.sobremordida.observation === ''
                    ? 'Nao informado'
                    : clientCase?.sobremordida.observation}
                </ListItem>
              </>
            )}
          </List>
        </Box>

        <Divider my="6" borderColor="gray.300" />

        <Box>
          <Text
            fontSize={{ base: '16px', lg: '18px' }}
            color="yellow.500"
            fontWeight="500"
            textTransform="uppercase"
            mb="4"
          >
            Linha Média
          </Text>
          <List spacing={2}>
            {clientCase === undefined || clientCase?.linha_media === '' ? (
              <Text>Não informado</Text>
            ) : (
              <>
                <ListItem>{clientCase.linha_media.option}</ListItem>
                <ListItem
                  hidden={
                    clientCase.linha_media.option ===
                    'Manter linha média de acordo com o alinhamento'
                  }
                >
                  <Stack
                    direction={isDefaultSize ? 'row' : 'column'}
                    justifyContent="space-between"
                    spacing={1}
                  >
                    <Box w="100%">
                      <Text as="span" fontWeight="bold">
                        Superior
                      </Text>
                      <Box mt={1}>
                        <Flex justifyContent="space-around">
                          <Box>
                            <Text as="span" fontWeight="bold">
                              Para Esquerda:
                            </Text>{' '}
                            {clientCase?.linha_media.superior?.esquerda === ''
                              ? 'Nao informado'
                              : `${clientCase?.linha_media.superior?.esquerda}mm`}
                          </Box>
                          <Box>
                            <Text as="span" fontWeight="bold">
                              Para Direita:
                            </Text>{' '}
                            {clientCase?.linha_media.superior?.esquerda === ''
                              ? 'Nao informado'
                              : `${clientCase?.linha_media.superior?.direita}mm`}
                          </Box>
                        </Flex>
                      </Box>
                    </Box>
                    <Box w="100%">
                      <Text as="span" fontWeight="bold">
                        Inferior
                      </Text>
                      <Box mt={1}>
                        <Flex justifyContent="space-around">
                          <Box>
                            <Text as="span" fontWeight="bold">
                              Para Esquerda:
                            </Text>{' '}
                            {clientCase?.linha_media.inferior?.esquerda === ''
                              ? 'Nao informado'
                              : `${clientCase?.linha_media.inferior?.esquerda}mm`}
                          </Box>
                          <Box>
                            <Text as="span" fontWeight="bold">
                              Para Direita:
                            </Text>{' '}
                            {clientCase?.linha_media.inferior?.esquerda === ''
                              ? 'Nao informado'
                              : `${clientCase?.linha_media.inferior?.direita}mm`}
                          </Box>
                        </Flex>
                      </Box>
                    </Box>
                  </Stack>
                </ListItem>
              </>
            )}
          </List>
        </Box>

        <Divider my="6" borderColor="gray.300" />

        <Box>
          <Text
            fontSize={{ base: '16px', lg: '18px' }}
            color="yellow.500"
            fontWeight="500"
            textTransform="uppercase"
            mb="4"
          >
            Manejo de Espaços
          </Text>
          <List spacing={2}>
            {clientCase === undefined ||
            clientCase?.manejo_de_espaços === '' ? (
              <Text>Não informado</Text>
            ) : (
              <>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Diastemas:
                  </Text>{' '}
                  {clientCase.manejo_de_espaços.diastemas.option}
                </ListItem>
                <ListItem
                  hidden={
                    clientCase.manejo_de_espaços.diastemas.option ===
                    'Fechar todos os espaços'
                  }
                >
                  <Text as="span" fontWeight="bold">
                    Observações:
                  </Text>{' '}
                  {clientCase?.manejo_de_espaços.diastemas.observation === ''
                    ? 'Nao informado'
                    : clientCase?.manejo_de_espaços.diastemas.observation}
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Apinhamento
                  </Text>
                  <Stack
                    direction={['column', 'column', 'row']}
                    justifyContent="space-around"
                    spacing={4}
                  >
                    <VStack mt={2} spacing={3} align="stretch">
                      <Text fontWeight="bold">Corrigir Superior</Text>
                      <Text>{`Expandir: ${clientCase.manejo_de_espaços.apinhamento.corrigir_superior.expandir}`}</Text>
                      <Text>{`Vestibularizar: ${clientCase.manejo_de_espaços.apinhamento.corrigir_superior.vestibularizar}`}</Text>
                      <Text>{`IPR - Anterior: ${clientCase.manejo_de_espaços.apinhamento.corrigir_superior.ipr_anterior}`}</Text>
                      <Text>{`IPR - Posterior Direito: ${clientCase.manejo_de_espaços.apinhamento.corrigir_superior.ipr_posterior_direito}`}</Text>
                      <Text>{`IPR - Posterior Esquerdo: ${clientCase.manejo_de_espaços.apinhamento.corrigir_superior.ipr_posterior_esquerdo}`}</Text>
                    </VStack>
                    <VStack mt={2} spacing={3} align="stretch">
                      <Text fontWeight="bold">Corrigir Inferior</Text>
                      <Text>{`Expandir: ${clientCase.manejo_de_espaços.apinhamento.corrigir_inferior.expandir}`}</Text>
                      <Text>{`Vestibularizar: ${clientCase.manejo_de_espaços.apinhamento.corrigir_inferior.vestibularizar}`}</Text>
                      <Text>{`IPR - Anterior: ${clientCase.manejo_de_espaços.apinhamento.corrigir_inferior.ipr_anterior}`}</Text>
                      <Text>{`IPR - Posterior Direito: ${clientCase.manejo_de_espaços.apinhamento.corrigir_inferior.ipr_posterior_direito}`}</Text>
                      <Text>{`IPR - Posterior Esquerdo: ${clientCase.manejo_de_espaços.apinhamento.corrigir_inferior.ipr_posterior_esquerdo}`}</Text>
                    </VStack>
                  </Stack>
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Extrações:
                  </Text>{' '}
                  {clientCase.manejo_de_espaços.extracoes.option}
                </ListItem>
                <ListItem
                  hidden={
                    clientCase.manejo_de_espaços.extracoes.option === 'Nenhuma'
                  }
                >
                  <CheckBoxGroup
                    itensSelected={
                      clientCase?.manejo_de_espaços.extracoes.sub_options
                    }
                    isDefaultSize={isDefaultSize}
                    isDisabled
                    checkBoxSize={checkBoxSize}
                    onSelect={() => {}}
                  />
                </ListItem>
              </>
            )}
          </List>
        </Box>

        <Divider my="6" borderColor="gray.300" />

        <Box>
          <Text
            fontSize={{ base: '16px', lg: '18px' }}
            color="yellow.500"
            fontWeight="500"
            textTransform="uppercase"
            mb="4"
          >
            Informações Complementares
          </Text>
          <List spacing={2}>
            {clientCase === undefined || clientCase?.additionalFields === '' ? (
              <Text>Não informado</Text>
            ) : (
              <>
                <ListItem>
                  {
                    clientCase?.additionalFields
                      .informacoes_a_serem_compartilhadas
                  }
                </ListItem>

                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Terceiro Molares:
                  </Text>{' '}
                  {clientCase?.additionalFields.terceiros_molares}
                </ListItem>
                <ListItem>
                  <Text as="span" fontWeight="bold">
                    Contenções:
                  </Text>{' '}
                  {clientCase?.additionalFields.contencoes}
                </ListItem>
              </>
            )}
          </List>
        </Box>

        <Divider my="6" borderColor="gray.300" />

        <Box>
          <Text
            fontSize={{ base: '16px', lg: '18px' }}
            color="yellow.500"
            fontWeight="500"
            textTransform="uppercase"
            mb="4"
          >
            Documentação
          </Text>
          <List spacing={2}>
            {clientCase === undefined || clientCase?.documentacao === '' ? (
              <Text>Não informado</Text>
            ) : (
              <Box m="auto" maxHeight={900} maxWidth={600}>
                <ImagesSlider
                  images={
                    clientCase.documentacao.radiografia.others
                      ? [
                          clientCase.documentacao.fotos.perfil,
                          clientCase.documentacao.fotos.frente,
                          clientCase.documentacao.fotos.sorriso,
                          clientCase.documentacao.fotos.arca_superior,
                          clientCase.documentacao.fotos.arca_inferior,
                          clientCase.documentacao.fotos.arca_direita,
                          clientCase.documentacao.fotos.arca_frontal,
                          clientCase.documentacao.fotos.arca_esquerda,
                          clientCase.documentacao.radiografia.frente,
                          clientCase.documentacao.radiografia.perfil,
                          ...clientCase.documentacao.radiografia.others,
                          clientCase.documentacao.stls.superior,
                          clientCase.documentacao.stls.inferior,
                        ]
                      : [
                          clientCase.documentacao.fotos.perfil,
                          clientCase.documentacao.fotos.frente,
                          clientCase.documentacao.fotos.sorriso,
                          clientCase.documentacao.fotos.arca_superior,
                          clientCase.documentacao.fotos.arca_inferior,
                          clientCase.documentacao.fotos.arca_direita,
                          clientCase.documentacao.fotos.arca_frontal,
                          clientCase.documentacao.fotos.arca_esquerda,
                          clientCase.documentacao.radiografia.frente,
                          clientCase.documentacao.radiografia.perfil,
                          clientCase.documentacao.stls.superior,
                          clientCase.documentacao.stls.inferior,
                        ]
                  }
                />
              </Box>
            )}
          </List>
        </Box>
      </Box>
    </Box>
  );
}

export default ShowCase;

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});

type ShowNewCaseType = {
  id: string | '';
  date: Date | '';
  userId: string | '';
  userName: string | '';
  dados_do_paciente: DadosDoPacienteType | '';
  tratarArco: string | '';
  restricao_de_movimento_dentario: RestricaoDeMovimentoDentarioType | '';
  attachments: AttachmentsType | '';
  relacao_antero_posterior: RelacaoAnteroPosteriorType | '';
  overjet: string | '';
  sobremordida: SobremordidaType | '';
  linha_media: LinhaMediaType | '';
  manejo_de_espaços: ManejoDeEspaçosType | '';
  additionalFields: InformacoesComplementaresType | '';
  documentacao: DocumentacaoType | '';
};
