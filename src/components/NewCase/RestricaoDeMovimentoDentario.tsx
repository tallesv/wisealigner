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

interface RestricaoDeMovimentoDentarioProps {
  handleNextStep: () => void;
  handleSubmitData: (values: {
    restricao_de_movimento_dentario: RestricaoDeMovimentoDentarioType;
  }) => void;
}

const RestricaoDeMovimentoDentarioFormSchema = yup.object().shape({
  option: yup
    .string()
    .required(
      'Por favor escolha uma opção para a Restrição De Movimento Dentário.',
    ),
  subOptions: yup.array().of(yup.string()),
});

export function RestricaoDeMovimentoDentario({
  handleNextStep,
  handleSubmitData,
}: RestricaoDeMovimentoDentarioProps) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [hideSubOptions, setHideSubOptions] = useState(true);

  const checkBoxSize = useBreakpointValue({
    lg: 'md',
    sm: 'sm',
  });

  const { handleSubmit, formState, setValue, getValues } =
    useForm<RestricaoDeMovimentoDentarioType>({
      resolver: yupResolver(RestricaoDeMovimentoDentarioFormSchema),
    });

  const { errors } = formState;

  const isDefaultSize = useBreakpointValue({
    xl: true,
    lg: false,
  });

  function handleSelectOption(value: string) {
    setValue('option', value);
    setHideSubOptions(value === 'nao');
  }

  function handleSelectSubOptions(value: string) {
    const subOptionsArray = Array.isArray(getValues().sub_options)
      ? getValues().sub_options
      : [];

    const findValue = subOptionsArray?.find(item => item === value);

    if (findValue) {
      const subOptionsArrayUpdated = subOptionsArray?.filter(
        item => item !== value,
      );
      setValue('sub_options', subOptionsArrayUpdated);
    } else {
      subOptionsArray?.push(value);
      setValue('sub_options', subOptionsArray);
    }
  }

  const handleSubmitRestricaoDeMovimentoDentario: SubmitHandler<
    RestricaoDeMovimentoDentarioType
  > = async values => {
    setButtonLoading(true);
    handleSubmitData({ restricao_de_movimento_dentario: { ...values } });
    setButtonLoading(false);
  };

  return (
    <VStack
      w="100%"
      spacing={5}
      as="form"
      onSubmit={handleSubmit(handleSubmitRestricaoDeMovimentoDentario)}
    >
      <RadioGroup
        name="option"
        label="Restrição De Movimento Dentário"
        error={errors.option}
        onChangeOption={value => handleSelectOption(value)}
        value={undefined}
      >
        <VStack spacing={3} align="flex-start">
          <Radio value="nao">Não, movimentar todos os dentes</Radio>
          <Radio value="sim">Sim, não mover os dentes abaixo</Radio>
        </VStack>
      </RadioGroup>

      <FormControl>
        <Box hidden={hideSubOptions}>
          <CheckBoxGroup
            isDefaultSize={isDefaultSize}
            checkBoxSize={checkBoxSize}
            onSelect={value => handleSelectSubOptions(value)}
          />
        </Box>
      </FormControl>
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
