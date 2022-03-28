import {
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Radio,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';

import { RadioGroup } from '../Form/RadioGroup';
import { Button } from '../Button';

interface RelacaoAnteroPosteriorProps {
  relacaoAnteroPosterior?: RelacaoAnteroPosteriorType;
  handleNextStep: () => void;
  handleSubmitData: (values: {
    relacao_antero_posterior: RelacaoAnteroPosteriorType;
  }) => Promise<void>;
}

const RelacaoAnteroPosteriorFormSchema = yup.object().shape({
  e: yup.string().required('Por favor escolha uma opção para D.'),
  d: yup.string().required('Por favor escolha uma opção para E.'),
  option: yup.string().required('Por favor selecione uma opção.'),
  sub_options: yup.array().of(yup.string()),
  observation: yup.string(),
});

export function RelacaoAnteroPosterior({
  relacaoAnteroPosterior,
  handleNextStep,
  handleSubmitData,
}: RelacaoAnteroPosteriorProps) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [hideSubOptions, setHideSubOptions] = useState(
    relacaoAnteroPosterior?.option !== 'movimento dentário',
  );
  const [subOptionsSelected, setSubOptionsSelected] = useState<string[]>(
    relacaoAnteroPosterior?.sub_options
      ? relacaoAnteroPosterior?.sub_options
      : [],
  );

  const [eOption, setEOption] = useState(relacaoAnteroPosterior?.e);
  const [dOption, setDOption] = useState(relacaoAnteroPosterior?.d);
  const [option, setOption] = useState(relacaoAnteroPosterior?.option);

  const { register, handleSubmit, formState, setValue, getValues } =
    useForm<RelacaoAnteroPosteriorType>({
      resolver: yupResolver(RelacaoAnteroPosteriorFormSchema),
    });

  const { errors } = formState;

  function handleSelectOption(value: string) {
    setValue('option', value);
    setOption(value);
    setHideSubOptions(value !== 'movimento dentário');
    if (value !== 'movimento dentário') {
      setValue('sub_options', []);
      setSubOptionsSelected([]);
    }
  }

  function handleSelectSubOptions(value: string) {
    const subOptionsArray = Array.isArray(getValues().sub_options)
      ? getValues().sub_options
      : [];

    const findValue = subOptionsArray?.find(item => item === value);

    if (findValue) {
      setValue(
        'sub_options',
        [...subOptionsSelected].filter(item => item !== value),
      );
      setSubOptionsSelected(
        [...subOptionsSelected].filter(item => item !== value),
      );
    } else {
      subOptionsArray?.push(value);
      const updateSubOptionsArray = [...subOptionsSelected];
      updateSubOptionsArray.push(value);
      setValue('sub_options', updateSubOptionsArray);
      setSubOptionsSelected(updateSubOptionsArray);
    }
  }

  const handleSubmitRelacaoAnteroPosterior: SubmitHandler<
    RelacaoAnteroPosteriorType
  > = async values => {
    setButtonLoading(true);
    await handleSubmitData({ relacao_antero_posterior: { ...values } });
    setButtonLoading(false);
  };

  useEffect(() => {
    if (relacaoAnteroPosterior) {
      setValue('d', relacaoAnteroPosterior.d);
      setValue('e', relacaoAnteroPosterior.e);
      setValue('option', relacaoAnteroPosterior.option);
      setValue('sub_options', relacaoAnteroPosterior.sub_options);
      setValue('observation', relacaoAnteroPosterior.observation);
    }
  }, [relacaoAnteroPosterior, setValue]);

  return (
    <VStack
      w="100%"
      spacing={5}
      as="form"
      onSubmit={handleSubmit(handleSubmitRelacaoAnteroPosterior)}
    >
      <HStack alignSelf="flex-start">
        <RadioGroup
          name="d"
          label="D"
          error={errors.d}
          onChangeOption={value => {
            setDOption(value);
            setValue('d', value);
          }}
          value={dOption}
        >
          <VStack spacing={2} align="flex-start">
            <Radio value="manter">Manter</Radio>
            <Radio value="melhorar">
              Melhorar relacionamento de canino somente
            </Radio>
            <Radio value="correção">
              Correção para Classe I(canino e molar)
            </Radio>
          </VStack>
        </RadioGroup>

        <RadioGroup
          name="e"
          label="E"
          error={errors.e}
          onChangeOption={value => {
            setEOption(value);
            setValue('e', value);
          }}
          value={eOption}
        >
          <VStack spacing={2} align="flex-start">
            <Radio value="manter">Manter</Radio>
            <Radio value="melhorar">
              Melhorar relacionamento de canino somente
            </Radio>
            <Radio value="correção">
              Correção para Classe I(canino e molar)
            </Radio>
          </VStack>
        </RadioGroup>
      </HStack>

      <RadioGroup
        name="option"
        error={errors.option}
        onChangeOption={value => handleSelectOption(value)}
        value={option}
      >
        <VStack spacing={2} align="flex-start">
          <Radio value="movimento dentário">
            Opções de movimento dentário (se selecionar mais de uma opção,
            indicar quantidade e sequência em observações)
          </Radio>
          <VStack align="flex-start" pl={10} hidden={hideSubOptions}>
            <Checkbox
              value="desgastes"
              isChecked={subOptionsSelected.includes('desgastes')}
              onChange={e => handleSelectSubOptions(e.target.value)}
            >
              Desgastes interproximais posteriores
            </Checkbox>
            <Checkbox
              value="simulacao"
              isChecked={subOptionsSelected.includes('simulacao')}
              onChange={e => handleSelectSubOptions(e.target.value)}
            >
              Simulação de correção de Classe II/III
            </Checkbox>
            <Checkbox
              value="distalizacao"
              isChecked={subOptionsSelected.includes('distalizacao')}
              onChange={e => handleSelectSubOptions(e.target.value)}
            >
              Distalização dente-a-dente (é mais previsível, porém resulta em
              uma maior quantidade de alinhadores)
            </Checkbox>
          </VStack>
          <Radio value="simulação">Simulação de cirurgia ortognática</Radio>
          <Radio value="outro">Outro</Radio>
        </VStack>
      </RadioGroup>

      <FormControl>
        <FormLabel fontWeight={700} htmlFor="observation">
          Observações
        </FormLabel>
        <Textarea focusBorderColor="purple.400" {...register('observation')} />
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
