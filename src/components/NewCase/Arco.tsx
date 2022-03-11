import { VStack, Radio, Flex } from '@chakra-ui/react';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useState } from 'react';
import { RadioGroup } from '../Form/RadioGroup';
import { Button } from '../Button';

interface ArcoProps {
  handleNextStep: () => void;
  handleSubmitData: (value: { tratarArco: string }) => void;
}

const ArcoFormSchema = yup.object().shape({
  tratarArco: yup
    .string()
    .required('Por favor escolha uma opção para o tratamento de Arco.'),
});

export function Arco({ handleNextStep, handleSubmitData }: ArcoProps) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const { handleSubmit, formState, setValue } = useForm<{
    tratarArco: string;
  }>({
    resolver: yupResolver(ArcoFormSchema),
  });

  const { errors } = formState;

  const handleSubmitPacientData: SubmitHandler<{
    tratarArco: string;
  }> = async value => {
    setButtonLoading(true);
    handleSubmitData(value);
    setButtonLoading(false);
  };

  return (
    <VStack
      w="100%"
      spacing={8}
      as="form"
      onSubmit={handleSubmit(handleSubmitPacientData)}
    >
      <RadioGroup
        name="tratarArco"
        label="Tratar Arco"
        error={errors.tratarArco}
        onChangeOption={value => setValue('tratarArco', value)}
        value={undefined}
      >
        <VStack spacing={3} align="flex-start">
          <Radio value="ambos">Ambos</Radio>
          <Radio value="superior">Superior</Radio>
          <Radio value="inferior">Inferior</Radio>
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
