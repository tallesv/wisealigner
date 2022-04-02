import {
  Box,
  Heading,
  Divider,
  Flex,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { PacientData } from '../../components/NewCase/PacientData';
import { Button } from '../../components/Button';
import { Arco } from '../../components/NewCase/Arco';
import { RestricaoDeMovimentoDentario } from '../../components/NewCase/RestricaoDeMovimentoDentario';
import { Attachments } from '../../components/NewCase/Attachments';
import { RelacaoAnteroPosterior } from '../../components/NewCase/RelacaoAnteroPosterior';
import { Overjet } from '../../components/NewCase/Overjet';
import { Sobremordida } from '../../components/NewCase/Sobremordida';
import { LinhaMedia } from '../../components/NewCase/LinhaMedia';
import { ManejoDeEspaços } from '../../components/NewCase/ManejoDeEspacos';
import { InformacoesComplementares } from '../../components/NewCase/InformacoesComplementares';
import { Documentacao } from '../../components/NewCase/Documentacao';
import api from '../../client/api';
import { withSSRAuth } from '../../utils/withSSRAuth';
import { getApiClient } from '../../client/apiClient';

const steps = [
  { label: 'Dados do Paciente' },
  { label: 'Arco' },
  { label: 'Restrição De Movimento Dentário' },
  { label: 'Attachments' },
  { label: 'Relação Ântero-Posterior (A-P)' },
  { label: 'Overjet' },
  { label: 'Sobremordida' },
  { label: 'Linha Média' },
  { label: 'Manejo de Espaços' },
  { label: 'Informações Complementares' },
  { label: 'Documentação' },
];

type TratarArcoType = {
  tratarArco: string;
};

type OverjetType = {
  overjet: string;
};

interface EditCaseProps {
  newCase: NewCaseType;
}

function EditCase({ newCase }: EditCaseProps) {
  const { push } = useRouter();
  const [newCaseState, setNewCaseState] = useState<NewCaseType>(newCase);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { nextStep, prevStep, activeStep, setStep } = useSteps({
    initialStep: 0,
  });

  function handleNextStep() {
    nextStep();
  }

  function handlePrevStep() {
    prevStep();
  }

  async function handleSubmitData(
    values:
      | { dados_do_paciente: DadosDoPacienteType }
      | TratarArcoType
      | { restricao_de_movimento_dentario: RestricaoDeMovimentoDentarioType }
      | { attachments: AttachmentsType }
      | { relacao_antero_posterior: RelacaoAnteroPosteriorType }
      | OverjetType
      | { sobremordida: SobremordidaType }
      | { linha_media: LinhaMediaType }
      | { manejo_de_espaços: ManejoDeEspaçosType }
      | { additionalFields: InformacoesComplementaresType }
      | { documentacao: DocumentacaoType },
  ) {
    const response = await api.put(`/requests/${newCaseState?.id}`, {
      ...newCaseState,
      ...values,
    });
    setNewCaseState(response.data.request);

    handleNextStep();
  }

  function getInputsForStep(step: string): JSX.Element {
    const inputSize = 'md';
    switch (step) {
      case 'Dados do Paciente':
        return (
          <PacientData
            dadosDoPaciente={newCaseState.dados_do_paciente}
            inputSize={inputSize}
            isWideVersion={isWideVersion}
            handlePrevStep={() => handlePrevStep()}
            handleSubmitData={values => handleSubmitData(values)}
          />
        );
      case 'Arco':
        return (
          <Arco
            tratarArco={newCaseState.tratarArco}
            handleNextStep={() => handleNextStep()}
            handleSubmitData={values => handleSubmitData(values)}
          />
        );
      case 'Restrição De Movimento Dentário':
        return (
          <RestricaoDeMovimentoDentario
            restricaoDeMovimentoDenatrio={
              newCaseState.restricao_de_movimento_dentario
            }
            handleNextStep={() => handleNextStep()}
            handleSubmitData={values => handleSubmitData(values)}
          />
        );
      case 'Attachments':
        return (
          <Attachments
            attachments={newCaseState.attachments}
            handleNextStep={() => handleNextStep()}
            handleSubmitData={values => handleSubmitData(values)}
          />
        );
      case 'Relação Ântero-Posterior (A-P)':
        return (
          <RelacaoAnteroPosterior
            relacaoAnteroPosterior={newCaseState.relacao_antero_posterior}
            handleNextStep={() => handleNextStep()}
            handleSubmitData={values => handleSubmitData(values)}
          />
        );
      case 'Overjet':
        return (
          <Overjet
            overjet={newCaseState.overjet}
            handleNextStep={() => handleNextStep()}
            handleSubmitData={values => handleSubmitData(values)}
          />
        );
      case 'Sobremordida':
        return (
          <Sobremordida
            sobreMordida={newCaseState.sobremordida}
            handleNextStep={() => handleNextStep()}
            handleSubmitData={values => handleSubmitData(values)}
          />
        );
      case 'Linha Média':
        return (
          <LinhaMedia
            linhaMedia={newCaseState.linha_media}
            handleNextStep={() => handleNextStep()}
            handleSubmitData={values => handleSubmitData(values)}
          />
        );
      case 'Manejo de Espaços':
        return (
          <ManejoDeEspaços
            manejoDeEspaços={newCaseState.manejo_de_espaços}
            handleNextStep={() => handleNextStep()}
            handleSubmitData={values => handleSubmitData(values)}
          />
        );
      case 'Informações Complementares':
        return (
          <InformacoesComplementares
            additionalFields={newCaseState.additionalFields}
            handleNextStep={() => handleNextStep()}
            handleSubmitData={values => handleSubmitData(values)}
          />
        );
      case 'Documentação':
        return (
          <Documentacao
            documentacao={newCaseState.documentacao}
            handleNextStep={() => handleNextStep()}
            handleSubmitData={values => handleSubmitData(values)}
          />
        );
      default:
        return <>Default</>;
    }
  }

  return (
    <Box mx="auto" p={[6, 8]}>
      <Heading size="lg">Editar caso</Heading>
      <Divider my="6" borderColor="gray.800" />
      <Steps
        orientation="vertical"
        onClickStep={step => setStep(step)}
        activeStep={activeStep}
        colorScheme="teal"
      >
        {steps.map(({ label }) => (
          <Step width="100%" label={label} key={label}>
            <VStack w="100%" spacing={3}>
              {getInputsForStep(label)}
            </VStack>
          </Step>
        ))}
      </Steps>
      {activeStep === steps.length && (
        <Flex px={4} py={4} width="100%" flexDirection="column">
          <Heading fontSize="xl" textAlign="center">
            Caso editado com sucesso!
          </Heading>
          <Button mx="auto" mt={6} size="sm" onClick={() => push('/case/new')}>
            Criar outro caso
          </Button>
        </Flex>
      )}
    </Box>
  );
}

export default EditCase;

export const getServerSideProps = withSSRAuth(
  async ({ query: { id }, req }) => {
    const { 'wisealigners.token': token } = req.cookies;

    const apiClient = getApiClient(token);
    const response = await apiClient.get(`requests/${id}`);

    const newCase = response.data.request;

    if (!newCase) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        newCase,
      },
    };
  },
);
