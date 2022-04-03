import {
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
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

interface SobremordidaProps {
  sobreMordida?: SobremordidaType;
  handleNextStep: () => void;
  handleSubmitData: (values: {
    sobremordida: SobremordidaType;
  }) => Promise<void>;
}

const SobremordidaFormSchema = yup.object().shape({
  option: yup.string().required('Por favor selecione uma opção.'),
  subOptions: yup.array().of(yup.string()),
  observation: yup.string(),
});

export function Sobremordida({
  sobreMordida,
  handleNextStep,
  handleSubmitData,
}: SobremordidaProps) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [hideAbertaSubOptions, setHideAbertaSubOptions] = useState(
    sobreMordida?.option !== 'corrigir mordida aberta',
  );
  const [hideProfundaSubOptions, setHideProfundaSubOptions] = useState(
    sobreMordida?.option !== 'corrigir mordida profunda',
  );

  const [option, setOption] = useState(sobreMordida?.option);
  const [subOptionsSelected, setSubOptionsSelected] = useState<string[]>(
    sobreMordida?.sub_options ? sobreMordida?.sub_options : [],
  );

  const { register, handleSubmit, formState, setValue, getValues } =
    useForm<SobremordidaType>({
      resolver: yupResolver(SobremordidaFormSchema),
    });

  const { errors } = formState;

  function handleSelectOption(value: string) {
    setValue('option', value);
    setOption(value);
    setHideAbertaSubOptions(value !== 'Corrigir mordida aberta');
    setHideProfundaSubOptions(value !== 'Corrigir mordida profunda');

    setValue('sub_options', []);
    setSubOptionsSelected([]);
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

  const handleSubmitSobremordida: SubmitHandler<
    SobremordidaType
  > = async values => {
    setButtonLoading(true);
    await handleSubmitData({ sobremordida: { ...values } });
    setButtonLoading(false);
  };

  useEffect(() => {
    if (sobreMordida) {
      setValue('option', sobreMordida.option);
      setValue('sub_options', sobreMordida.sub_options);
      setValue('observation', sobreMordida.observation);
    }
  }, [sobreMordida, setValue]);

  return (
    <VStack
      w="100%"
      spacing={5}
      as="form"
      onSubmit={handleSubmit(handleSubmitSobremordida)}
    >
      <RadioGroup
        name="option"
        error={errors.option}
        onChangeOption={value => handleSelectOption(value)}
        value={option}
      >
        <VStack spacing={2} align="flex-start">
          <Radio value="Mostrar resultado de sobremordida">
            Mostrar resultado de sobremordida
          </Radio>
          <Radio value="Corrigir mordida aberta">Corrigir mordida aberta</Radio>
          <VStack align="flex-start" pl={10} hidden={hideAbertaSubOptions}>
            <Checkbox
              value="Extruir dentes superiores"
              isChecked={subOptionsSelected.includes(
                'Extruir dentes superiores',
              )}
              onChange={e => handleSelectSubOptions(e.target.value)}
            >
              Extruir dentes superiores
            </Checkbox>
            <Checkbox
              value="Extruir dentes inferiores"
              isChecked={subOptionsSelected.includes(
                'Extruir dentes inferiores',
              )}
              onChange={e => handleSelectSubOptions(e.target.value)}
            >
              Extruir dentes inferiores
            </Checkbox>
          </VStack>
          <Radio value="Corrigir mordida profunda">
            Corrigir mordida profunda
          </Radio>
          <VStack align="flex-start" pl={10} hidden={hideProfundaSubOptions}>
            <Checkbox
              value="Intruir dentes superiores"
              isChecked={subOptionsSelected.includes(
                'Intruir dentes superiores',
              )}
              onChange={e => handleSelectSubOptions(e.target.value)}
            >
              Intruir dentes superiores
            </Checkbox>
            <Checkbox
              value="Intruir dentes inferiores"
              isChecked={subOptionsSelected.includes(
                'Intruir dentes inferiores',
              )}
              onChange={e => handleSelectSubOptions(e.target.value)}
            >
              Intruir dentes inferiores
            </Checkbox>
            <Checkbox
              value="Adicionar Bite Ramps nos incisivos superiores"
              isChecked={subOptionsSelected.includes(
                'Adicionar Bite Ramps nos incisivos superiores',
              )}
              onChange={e => handleSelectSubOptions(e.target.value)}
            >
              Adicionar Bite Ramps nos incisivos superiores
            </Checkbox>
          </VStack>
          <Radio value="outro">outro</Radio>
        </VStack>
      </RadioGroup>

      <FormControl>
        <FormLabel fontWeight={700} htmlFor="observation">
          Observações
        </FormLabel>
        <Textarea focusBorderColor="teal.600" {...register('observation')} />
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
