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

import { useEffect, useState } from 'react';
import { RadioGroup } from '../Form/RadioGroup';
import { Button } from '../Button';
import { CheckBoxGroup } from '../Form/CheckBoxGroup';

interface RestricaoDeMovimentoDentarioProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  restricaoDeMovimentoDenatrio?: any;
  handleNextStep: () => void;
  handleSubmitData: (values: {
    restricao_de_movimento_dentario: RestricaoDeMovimentoDentarioType;
  }) => Promise<void>;
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
  restricaoDeMovimentoDenatrio,
  handleNextStep,
  handleSubmitData,
}: RestricaoDeMovimentoDentarioProps) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [hideSubOptions, setHideSubOptions] = useState(
    restricaoDeMovimentoDenatrio === '' ||
      restricaoDeMovimentoDenatrio?.option ===
        'Não, movimentar todos os dentes',
  );
  const [option, setOption] = useState(restricaoDeMovimentoDenatrio?.option);

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
    setOption(value);
    setHideSubOptions(value === 'Não, movimentar todos os dentes');

    if (value === 'Não, movimentar todos os dentes') {
      setValue('sub_options', []);
    }
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
    await handleSubmitData({ restricao_de_movimento_dentario: { ...values } });
    setButtonLoading(false);
  };

  useEffect(() => {
    if (restricaoDeMovimentoDenatrio) {
      setValue('option', restricaoDeMovimentoDenatrio.option);
      setValue('sub_options', restricaoDeMovimentoDenatrio.sub_options);
    }
  }, [restricaoDeMovimentoDenatrio, setValue]);

  return (
    <VStack
      w="100%"
      spacing={5}
      as="form"
      onSubmit={handleSubmit(handleSubmitRestricaoDeMovimentoDentario)}
    >
      <RadioGroup
        name="option"
        error={errors.option}
        onChangeOption={value => handleSelectOption(value)}
        value={option}
      >
        <VStack spacing={3} align="flex-start">
          <Radio value="Não, movimentar todos os dentes">
            Não, movimentar todos os dentes
          </Radio>
          <Radio value="Sim, não mover os dentes abaixo">
            Sim, não mover os dentes abaixo
          </Radio>
        </VStack>
      </RadioGroup>

      <FormControl>
        <Box hidden={hideSubOptions}>
          <CheckBoxGroup
            itensSelected={restricaoDeMovimentoDenatrio?.sub_options}
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
          Salvar
        </Button>
      </Flex>
    </VStack>
  );
}
