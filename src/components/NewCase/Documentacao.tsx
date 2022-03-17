import {
  VStack,
  Radio,
  Flex,
  Box,
  useBreakpointValue,
  FormControl,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useState } from 'react';
import { RadioGroup } from '../Form/RadioGroup';
import { Button } from '../Button';
import { CheckBoxGroup } from '../Form/CheckBoxGroup';

interface DocumentacaoProps {
  handleNextStep: () => void;
  handleSubmitData: (values: { documentacao: DocumentacaoType }) => void;
}

const DocumentacaoFormSchema = yup.object().shape({
  fotos: yup.object().shape({
    perfil: yup.string(),
    frente: yup.string(),
    sorriso: yup.string(),
    arca_superior: yup.string(),
    arca_inferior: yup.string(),
    arca_esquerda: yup.string(),
    arca_direita: yup.string(),
    arca_frontal: yup.string(),
  }),
  radiografia: yup.object().shape({
    frente: yup.string(),
    perfil: yup.string(),
  }),
  stls: yup.object().shape({
    superior: yup.string(),
    inferior: yup.string(),
  }),
});

export function Documentacao({
  handleNextStep,
  handleSubmitData,
}: DocumentacaoProps) {
  const [buttonLoading, setButtonLoading] = useState(false);

  const checkBoxSize = useBreakpointValue({
    lg: 'md',
    sm: 'sm',
  });

  const { handleSubmit, formState, setValue, getValues } =
    useForm<DocumentacaoType>({
      resolver: yupResolver(DocumentacaoFormSchema),
    });

  const { errors } = formState;

  const isDefaultSize = useBreakpointValue({
    xl: true,
    lg: false,
  });

  const handleSubmitDocumentacao: SubmitHandler<
    DocumentacaoType
  > = async values => {
    setButtonLoading(true);
    handleSubmitData({ documentacao: { ...values } });
    setButtonLoading(false);
  };

  return (
    <VStack
      w="100%"
      spacing={5}
      as="form"
      onSubmit={handleSubmit(handleSubmitDocumentacao)}
    >
      <Flex>
        <Button
          size="sm"
          type="submit"
          isLoading={buttonLoading}
          onClick={() => handleNextStep()}
        >
          Finalizar
        </Button>
      </Flex>
    </VStack>
  );
}
