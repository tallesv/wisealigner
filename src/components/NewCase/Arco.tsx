import { VStack, Radio, Flex } from '@chakra-ui/react';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useEffect, useState } from 'react';
import { RadioGroup } from '../Form/RadioGroup';
import { Button } from '../Button';

interface ArcoProps {
  tratarArco?: string;
  handleNextStep: () => void;
  handleSubmitData: (value: { tratarArco: string }) => Promise<void>;
}

const ArcoFormSchema = yup.object().shape({
  tratarArco: yup
    .string()
    .required('Por favor escolha uma opção para o tratamento de Arco.'),
});

export function Arco({
  tratarArco,
  handleNextStep,
  handleSubmitData,
}: ArcoProps) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [tratarArcoState, setTratarArcoState] = useState(tratarArco);
  const { handleSubmit, formState, setValue } = useForm<{
    tratarArco: string;
  }>({
    resolver: yupResolver(ArcoFormSchema),
  });

  const { errors } = formState;

  const handleSubmitArco: SubmitHandler<{
    tratarArco: string;
  }> = async value => {
    setButtonLoading(true);
    await handleSubmitData(value);
    setButtonLoading(false);
  };

  useEffect(() => {
    if (tratarArco) {
      setValue('tratarArco', tratarArco);
    }
  }, [setValue, tratarArco]);

  return (
    <VStack
      w="100%"
      spacing={8}
      as="form"
      onSubmit={handleSubmit(handleSubmitArco)}
    >
      <RadioGroup
        name="tratarArco"
        label="Tratar Arco"
        error={errors.tratarArco}
        onChangeOption={value => {
          setTratarArcoState(value);
          setValue('tratarArco', value);
        }}
        value={tratarArcoState}
      >
        <VStack spacing={3} align="flex-start">
          <Radio value="Ambos">Ambos</Radio>
          <Radio value="Superior">Superior</Radio>
          <Radio value="Inferior">Inferior</Radio>
        </VStack>
      </RadioGroup>

      <Flex>
        <Button
          size="sm"
          type="submit"
          isLoading={buttonLoading}
          onClick={() => handleNextStep()}
        >
          Próximo
        </Button>
      </Flex>
    </VStack>
  );
}
