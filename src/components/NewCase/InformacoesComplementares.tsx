import {
  VStack,
  Radio,
  Flex,
  FormControl,
  Text,
  Textarea,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useEffect, useState } from 'react';
import { RadioGroup } from '../Form/RadioGroup';
import { Button } from '../Button';

interface InformacoesComplementaresProps {
  additionalFields?: InformacoesComplementaresType;
  handleNextStep: () => void;
  handleSubmitData: (values: {
    additionalFields: InformacoesComplementaresType;
  }) => Promise<void>;
}

const InformacoesComplementaresFormSchema = yup.object().shape({
  informacoes_a_serem_compartilhadas: yup.string(),
  terceiros_molares: yup.string(),
  contencoes: yup.string(),
});

export function InformacoesComplementares({
  additionalFields,
  handleNextStep,
  handleSubmitData,
}: InformacoesComplementaresProps) {
  const [buttonLoading, setButtonLoading] = useState(false);

  const [terceirosMolaresOption, setTerceirosMolaresOption] = useState(
    additionalFields?.terceiros_molares,
  );
  const [contencoesOption, setContencoesOption] = useState(
    additionalFields?.contencoes,
  );

  const { register, handleSubmit, formState, setValue } =
    useForm<InformacoesComplementaresType>({
      resolver: yupResolver(InformacoesComplementaresFormSchema),
    });

  const { errors } = formState;

  const handleSubmitInformacoesComplementares: SubmitHandler<
    InformacoesComplementaresType
  > = async values => {
    setButtonLoading(true);
    await handleSubmitData({ additionalFields: { ...values } });
    setButtonLoading(false);
  };

  useEffect(() => {
    if (additionalFields) {
      setValue('contencoes', additionalFields.contencoes);
      setValue('terceiros_molares', additionalFields.terceiros_molares);
      setValue(
        'informacoes_a_serem_compartilhadas',
        additionalFields.informacoes_a_serem_compartilhadas,
      );
    }
  }, [setValue, additionalFields]);
  return (
    <VStack
      w="100%"
      spacing={5}
      as="form"
      onSubmit={handleSubmit(handleSubmitInformacoesComplementares)}
    >
      <FormControl>
        <Text align="initial" mb={2}>
          Descreva aqui quaisquer informações a serem compartilhadas com o
          A-Team
        </Text>

        <Textarea
          focusBorderColor="teal.600"
          {...register('informacoes_a_serem_compartilhadas')}
        />
      </FormControl>

      <RadioGroup
        name="terceiros_molares"
        label="Terceiros Molares"
        error={errors.terceiros_molares}
        onChangeOption={value => {
          setTerceirosMolaresOption(value);
          setValue('terceiros_molares', value);
        }}
        value={terceirosMolaresOption}
      >
        <Text align="initial" mb={2}>
          A presença dos terceiros molares pode alterar a funcionalidade e
          planos de tratamento. Pedimos cuidado de avaliar as opções abaixo em
          relação a esses dentes:
        </Text>
        <VStack spacing={3} align="flex-start">
          <Radio value="Não há terceiros molares presentes no escaneamento">
            Não há terceiros molares presentes no escaneamento
          </Radio>
          <Text fontSize={14} pl={6}>
            Obs.: Opção recomendada
          </Text>

          <Radio value=" O terceiro molar está presente no escaneamento mas será extraído. Confeccionar o alinhador até segundos molares">
            O terceiro molar está presente no escaneamento mas será extraído.
            Confeccionar o alinhador até segundos molares
          </Radio>
          <Text fontSize={14} pl={6}>
            Obs: Apesar desse procedimento ser confiável na maioria dos casos,
            ele pode interferir na funcionalidade do alinhador
          </Text>

          <Radio value=" O terceiro molar será mantido e o alinhador deve cobri-lo da melhor forma possível">
            O terceiro molar será mantido e o alinhador deve cobri-lo da melhor
            forma possível.
          </Radio>
          <Text fontSize={14} pl={6}>
            Obs: Essa opção pode fazer com que o alinhador interfira na oclusão
            do paciente e também no conforto do uso. Lembramos que a presença de
            terceiro molares pode comprometer as correções de discrepâncias
            antero-posteriores, tanto por distalização dente a dente quanto em
            bloco (simulação).
          </Text>
        </VStack>
      </RadioGroup>

      <RadioGroup
        name="contencoes"
        label="Contencões"
        error={errors.terceiros_molares}
        onChangeOption={value => {
          setContencoesOption(value);
          setValue('contencoes', value);
        }}
        value={contencoesOption}
      >
        <VStack spacing={3} align="flex-start">
          <Radio value="Não há contenções coladas no escaneamento">
            Não há contenções coladas no escaneamento
          </Radio>
          <Radio value="Há contenções coladas no escamento. Favor removê-la(s) digitalmente.">
            Há contenções coladas no escamento. Favor removê-la(s) digitalmente.
          </Radio>
          <Text fontSize={14} pl={6}>
            Obs: Apesar desse procedimento ser confiável na maioria dos casos,
            ele pode interferir na funcionalidade e adaptação do alinhador
          </Text>
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
