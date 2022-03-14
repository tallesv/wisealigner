import { VStack, Radio, Flex } from '@chakra-ui/react';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useState } from 'react';
import { RadioGroup } from '../Form/RadioGroup';
import { Button } from '../Button';

interface OverjetProps {
  handleNextStep: () => void;
  handleSubmitData: (value: { overjet: string }) => void;
}

const OverjetFormSchema = yup.object().shape({
  overjet: yup
    .string()
    .required('Por favor escolha uma opção para o tratamento de Overjet.'),
});

export function Overjet({ handleNextStep, handleSubmitData }: OverjetProps) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const { handleSubmit, formState, setValue } = useForm<{
    overjet: string;
  }>({
    resolver: yupResolver(OverjetFormSchema),
  });

  const { errors } = formState;

  const handleSubmitOverjet: SubmitHandler<{
    overjet: string;
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
      onSubmit={handleSubmit(handleSubmitOverjet)}
    >
      <RadioGroup
        name="overjet"
        error={errors.overjet}
        onChangeOption={value => setValue('overjet', value)}
        value={undefined}
      >
        <VStack spacing={3} align="flex-start">
          <Radio value="mostrar o overjet apos alinhamneto">
            Mostrar o overjet após alinhamneto
          </Radio>
          <Radio value="melhorar o overjet com desgastes interpoximais">
            Melhorar o overjet com desgastes interpoximais
          </Radio>
          <Radio value="melhorar o overjet com abertura de espaços">
            Melhorar o overjet com abertura de espaços
          </Radio>
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
