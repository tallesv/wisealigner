import {
  VStack,
  Radio,
  Flex,
  FormControl,
  FormLabel,
  Textarea,
  Text,
  Box,
  RadioGroup as ChakraRadioGroup,
  Stack,
  useBreakpointValue,
  FormErrorMessage,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useEffect, useState } from 'react';
import { RadioGroup } from '../Form/RadioGroup';
import { Button } from '../Button';
import { CheckBoxGroup } from '../Form/CheckBoxGroup';

type Corrigir = {
  expandir: string;
  vestibularizar: string;
  ipr_anterior: string;
  ipr_posterior_direito: string;
  ipr_posterior_esquerdo: string;
};

interface ManejoDeEspaçosProps {
  manejoDeEspaços?: ManejoDeEspaçosType;
  handleNextStep: () => void;
  handleSubmitData: (value: {
    manejo_de_espaços: ManejoDeEspaçosType;
  }) => Promise<void>;
}

const ManejoDeEspaçosFormSchema = yup.object().shape({
  diastemas: yup.object().shape({
    option: yup
      .string()
      .required('Por favor escolha uma opção para Diastemas.'),
    observation: yup.string(),
  }),
  apinhamento: yup.object().shape({
    corrigir_superior: yup.object().shape({
      expandir: yup
        .string()
        .required(
          'Por favor escolha uma opção para Apinhamento superior expandir.',
        ),
      vestibularizar: yup
        .string()
        .required(
          'Por favor escolha uma opção para Apinhamento superior vestibularizar.',
        ),
      ipr_anterior: yup
        .string()
        .required(
          'Por favor escolha uma opção para Apinhamento superior IPR Anterior.',
        ),
      ipr_posterior_direito: yup
        .string()
        .required(
          'Por favor escolha uma opção para Apinhamento superior IPR Posterior Direito.',
        ),
      ipr_posterior_esquerdo: yup
        .string()
        .required(
          'Por favor escolha uma opção para Apinhamento superior IPR Posterior Esquerdo.',
        ),
    }),
    corrigir_inferior: yup.object().shape({
      expandir: yup
        .string()
        .required(
          'Por favor escolha uma opção para Apinhamento inferior expandir.',
        ),
      vestibularizar: yup
        .string()
        .required(
          'Por favor escolha uma opção para Apinhamento inferior vestibularizar.',
        ),
      ipr_anterior: yup
        .string()
        .required(
          'Por favor escolha uma opção para Apinhamento inferior IPR Anterior.',
        ),
      ipr_posterior_direito: yup
        .string()
        .required(
          'Por favor escolha uma opção para Apinhamento inferior IPR Posterior Direito.',
        ),
      ipr_posterior_esquerdo: yup
        .string()
        .required(
          'Por favor escolha uma opção para Apinhamento inferior IPR Posterior Esquerdo.',
        ),
    }),
  }),
  extracoes: yup.object().shape({
    option: yup
      .string()
      .required('Por favor escolha uma opção para Extrações.'),
    suboptions: yup.string(),
  }),
});

export function ManejoDeEspaços({
  manejoDeEspaços,
  handleNextStep,
  handleSubmitData,
}: ManejoDeEspaçosProps) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [hideDiastemasObservation, setHideDiastemasObservation] = useState(
    () => {
      if (manejoDeEspaços?.diastemas) {
        return manejoDeEspaços?.diastemas?.option === 'Fechar todos os espaços';
      }
      return true;
    },
  );
  const [hideExtraçoesSubOptions, setHideExtraçoesSubOptions] = useState(() => {
    if (manejoDeEspaços?.diastemas) {
      return manejoDeEspaços?.extracoes?.option === 'Nenhuma';
    }
    return true;
  });

  const [diasTemasOption, setDiastemasOption] = useState(
    manejoDeEspaços?.diastemas?.option,
  );
  const [extracoesOption, setExtracoesOption] = useState(
    manejoDeEspaços?.extracoes?.option,
  );

  const [corrigirSuperior, setCorrigirSuperior] = useState(
    manejoDeEspaços?.apinhamento?.corrigir_superior
      ? manejoDeEspaços?.apinhamento.corrigir_superior
      : ({} as Corrigir),
  );

  const [corrigirInferior, setCorrigirInferior] = useState(
    manejoDeEspaços?.apinhamento?.corrigir_inferior
      ? manejoDeEspaços?.apinhamento.corrigir_inferior
      : ({} as Corrigir),
  );

  const { register, handleSubmit, formState, setValue, getValues } =
    useForm<ManejoDeEspaçosType>({
      resolver: yupResolver(ManejoDeEspaçosFormSchema),
    });

  const { errors } = formState;

  const checkBoxSize = useBreakpointValue({
    lg: 'md',
    sm: 'sm',
  });

  const isDefaultSize = useBreakpointValue({
    xl: true,
    lg: false,
  });

  const isMobileSize = useBreakpointValue({
    md: true,
  });

  function handleChangeDiastemasOption(value: string) {
    setValue('diastemas.option', value);
    setDiastemasOption(value);
    setHideDiastemasObservation(value === 'Fechar todos os espaços');
  }

  function handleChangeExtraçoesOption(value: string) {
    setValue('extracoes.option', value);
    setExtracoesOption(value);
    setHideExtraçoesSubOptions(value === 'Nenhuma');
    if (value === 'Nenhuma') {
      setValue('extracoes.sub_options', []);
    }
  }

  function handleSelectSubOptions(value: string) {
    const subOptionsArray = Array.isArray(getValues().extracoes.sub_options)
      ? getValues().extracoes.sub_options
      : [];

    const findValue = subOptionsArray?.find(item => item === value);

    if (findValue) {
      const subOptionsArrayUpdated = subOptionsArray?.filter(
        item => item !== value,
      );
      setValue('extracoes.sub_options', subOptionsArrayUpdated);
    } else {
      subOptionsArray?.push(value);
      setValue('extracoes.sub_options', subOptionsArray);
    }
  }

  const handleSubmitManejoDeEspaços: SubmitHandler<
    ManejoDeEspaçosType
  > = async value => {
    setButtonLoading(true);
    await handleSubmitData({ manejo_de_espaços: { ...value } });
    setButtonLoading(false);
  };

  useEffect(() => {
    if (manejoDeEspaços) {
      setValue('diastemas.option', manejoDeEspaços?.diastemas?.option);
      setValue(
        'diastemas.observation',
        manejoDeEspaços?.diastemas?.observation,
      );
      setValue('apinhamento', manejoDeEspaços.apinhamento);
      setValue('extracoes.option', manejoDeEspaços?.extracoes?.option);
      setValue(
        'extracoes.sub_options',
        manejoDeEspaços?.extracoes?.sub_options,
      );
    }
  }, [setValue, manejoDeEspaços]);

  return (
    <VStack
      w="100%"
      spacing={8}
      as="form"
      onSubmit={handleSubmit(handleSubmitManejoDeEspaços)}
    >
      <RadioGroup
        name="diastemas.option"
        label="Diastemas"
        error={errors.diastemas?.option}
        onChangeOption={value => handleChangeDiastemasOption(value)}
        value={diasTemasOption}
      >
        <VStack spacing={3} align="flex-start">
          <Radio value="Fechar todos os espaços">Fechar todos os espaços</Radio>
          <Radio value="Abrir ou manter espaços. Favor descrever entre quais dentes no espaço abaixo...">
            Abrir ou manter espaços. Favor descrever entre quais dentes no
            espaço abaixo...
          </Radio>
        </VStack>
      </RadioGroup>

      <Box hidden={hideDiastemasObservation} width="100%">
        <FormControl>
          <FormLabel fontWeight={600} htmlFor="observation">
            Observações
          </FormLabel>
          <Textarea
            focusBorderColor="teal.600"
            {...register('diastemas.observation')}
          />
        </FormControl>
      </Box>

      <Flex align="flex-start" direction="column" w="100%">
        <Text fontWeight={700} alignSelf="flex-start" mb={2}>
          Apinhamento
        </Text>
        <VStack align="flex-start">
          <Text fontWeight={600}>Corrigir Superior</Text>
          <VStack>
            <FormControl
              isInvalid={!!errors.apinhamento?.corrigir_superior?.expandir}
            >
              <Stack direction={isMobileSize ? 'row' : 'column'}>
                <FormLabel fontWeight={500}>Expandir:</FormLabel>
                <ChakraRadioGroup
                  name="apinhamento.corrigir_superior.expandir"
                  onChange={value => {
                    setCorrigirSuperior({
                      ...corrigirSuperior,
                      expandir: value,
                    });
                    setValue('apinhamento.corrigir_superior.expandir', value);
                  }}
                  value={corrigirSuperior.expandir}
                >
                  <Stack
                    spacing={4}
                    direction={isMobileSize ? 'row' : 'column'}
                  >
                    <Radio value="Primeiro">Primeiro</Radio>
                    <Radio value="Quanto Necessario">Quanto Necessario</Radio>
                    <Radio value="Nenhum">Nenhum</Radio>
                  </Stack>
                </ChakraRadioGroup>

                {!!errors.apinhamento?.corrigir_superior?.expandir && (
                  <FormErrorMessage>
                    {errors.apinhamento?.corrigir_superior?.expandir.message}
                  </FormErrorMessage>
                )}
              </Stack>
            </FormControl>
          </VStack>

          <VStack align="flex-start">
            <FormControl
              isInvalid={
                !!errors.apinhamento?.corrigir_superior?.vestibularizar
              }
            >
              <Stack direction={isMobileSize ? 'row' : 'column'}>
                <FormLabel fontWeight={500}>Vestibularizar:</FormLabel>
                <ChakraRadioGroup
                  name="apinhamento.corrigir_superior.vestibularizar"
                  onChange={value => {
                    setCorrigirSuperior({
                      ...corrigirSuperior,
                      vestibularizar: value,
                    });
                    setValue(
                      'apinhamento.corrigir_superior.vestibularizar',
                      value,
                    );
                  }}
                  value={corrigirSuperior.vestibularizar}
                >
                  <Stack
                    spacing={4}
                    direction={isMobileSize ? 'row' : 'column'}
                  >
                    <Radio value="Primeiro">Primeiro</Radio>
                    <Radio value="Quanto Necessario">Quanto Necessario</Radio>
                    <Radio value="Nenhum">Nenhum</Radio>
                  </Stack>
                </ChakraRadioGroup>

                {!!errors.apinhamento?.corrigir_superior?.vestibularizar && (
                  <FormErrorMessage>
                    {
                      errors.apinhamento?.corrigir_superior?.vestibularizar
                        .message
                    }
                  </FormErrorMessage>
                )}
              </Stack>
            </FormControl>
          </VStack>

          <VStack align="flex-start">
            <FormControl
              isInvalid={!!errors.apinhamento?.corrigir_superior?.ipr_anterior}
            >
              <Stack direction={isMobileSize ? 'row' : 'column'}>
                <FormLabel fontWeight={500}>IPR - Anterior:</FormLabel>
                <ChakraRadioGroup
                  name="apinhamento.corrigir_superior.ipr_anterior"
                  onChange={value => {
                    setCorrigirSuperior({
                      ...corrigirSuperior,
                      ipr_anterior: value,
                    });
                    setValue(
                      'apinhamento.corrigir_superior.ipr_anterior',
                      value,
                    );
                  }}
                  value={corrigirSuperior.ipr_anterior}
                >
                  <Stack
                    spacing={4}
                    direction={isMobileSize ? 'row' : 'column'}
                  >
                    <Radio value="Primeiro">Primeiro</Radio>
                    <Radio value="Quanto Necessario">Quanto Necessario</Radio>
                    <Radio value="Nenhum">Nenhum</Radio>
                  </Stack>
                </ChakraRadioGroup>

                {!!errors.apinhamento?.corrigir_superior?.ipr_anterior && (
                  <FormErrorMessage>
                    {
                      errors.apinhamento?.corrigir_superior?.ipr_anterior
                        .message
                    }
                  </FormErrorMessage>
                )}
              </Stack>
            </FormControl>
          </VStack>

          <VStack align="flex-start">
            <FormControl
              isInvalid={
                !!errors.apinhamento?.corrigir_superior?.ipr_posterior_direito
              }
            >
              <Stack direction={isMobileSize ? 'row' : 'column'}>
                <FormLabel fontWeight={500}>IPR - Posterior Direito:</FormLabel>
                <ChakraRadioGroup
                  name="apinhamento.corrigir_superior.ipr_posterior_direito"
                  onChange={value => {
                    setCorrigirSuperior({
                      ...corrigirSuperior,
                      ipr_posterior_direito: value,
                    });
                    setValue(
                      'apinhamento.corrigir_superior.ipr_posterior_direito',
                      value,
                    );
                  }}
                  value={corrigirSuperior.ipr_posterior_direito}
                >
                  <Stack
                    spacing={4}
                    direction={isMobileSize ? 'row' : 'column'}
                  >
                    <Radio value="Primeiro">Primeiro</Radio>
                    <Radio value="Quanto Necessario">Quanto Necessario</Radio>
                    <Radio value="Nenhum">Nenhum</Radio>
                  </Stack>
                </ChakraRadioGroup>

                {!!errors.apinhamento?.corrigir_superior
                  ?.ipr_posterior_direito && (
                  <FormErrorMessage>
                    {
                      errors.apinhamento?.corrigir_superior
                        ?.ipr_posterior_direito.message
                    }
                  </FormErrorMessage>
                )}
              </Stack>
            </FormControl>
          </VStack>

          <VStack align="flex-start">
            <FormControl
              isInvalid={
                !!errors.apinhamento?.corrigir_superior?.ipr_posterior_esquerdo
              }
            >
              <Stack direction={isMobileSize ? 'row' : 'column'}>
                <FormLabel fontWeight={500}>
                  IPR - Posterior Esquerdo:
                </FormLabel>
                <ChakraRadioGroup
                  name="apinhamento.corrigir_superior.ipr_posterior_esquerdo"
                  onChange={value => {
                    setCorrigirSuperior({
                      ...corrigirSuperior,
                      ipr_posterior_esquerdo: value,
                    });
                    setValue(
                      'apinhamento.corrigir_superior.ipr_posterior_esquerdo',
                      value,
                    );
                  }}
                  value={corrigirSuperior.ipr_posterior_esquerdo}
                >
                  <Stack
                    spacing={4}
                    direction={isMobileSize ? 'row' : 'column'}
                  >
                    <Radio value="Primeiro">Primeiro</Radio>
                    <Radio value="Quanto Necessario">Quanto Necessario</Radio>
                    <Radio value="Nenhum">Nenhum</Radio>
                  </Stack>
                </ChakraRadioGroup>

                {!!errors.apinhamento?.corrigir_superior
                  ?.ipr_posterior_esquerdo && (
                  <FormErrorMessage>
                    {
                      errors.apinhamento?.corrigir_superior
                        ?.ipr_posterior_esquerdo.message
                    }
                  </FormErrorMessage>
                )}
              </Stack>
            </FormControl>
          </VStack>
        </VStack>

        <VStack align="flex-start">
          <Text fontWeight={600}>Corrigir Inferior</Text>
          <VStack>
            <FormControl
              isInvalid={!!errors.apinhamento?.corrigir_inferior?.expandir}
            >
              <Stack direction={isMobileSize ? 'row' : 'column'}>
                <FormLabel fontWeight={500}>Expandir:</FormLabel>
                <ChakraRadioGroup
                  name="apinhamento.corrigir_inferior.expandir"
                  onChange={value => {
                    setCorrigirInferior({
                      ...corrigirInferior,
                      expandir: value,
                    });
                    setValue('apinhamento.corrigir_inferior.expandir', value);
                  }}
                  value={corrigirInferior?.expandir}
                >
                  <Stack
                    spacing={4}
                    direction={isMobileSize ? 'row' : 'column'}
                  >
                    <Radio value="Primeiro">Primeiro</Radio>
                    <Radio value="Quanto Necessario">Quanto Necessario</Radio>
                    <Radio value="Nenhum">Nenhum</Radio>
                  </Stack>
                </ChakraRadioGroup>

                {!!errors.apinhamento?.corrigir_inferior?.expandir && (
                  <FormErrorMessage>
                    {errors.apinhamento?.corrigir_inferior?.expandir.message}
                  </FormErrorMessage>
                )}
              </Stack>
            </FormControl>
          </VStack>

          <VStack align="flex-start">
            <FormControl
              isInvalid={
                !!errors.apinhamento?.corrigir_inferior?.vestibularizar
              }
            >
              <Stack direction={isMobileSize ? 'row' : 'column'}>
                <FormLabel fontWeight={500}>Vestibularizar:</FormLabel>
                <ChakraRadioGroup
                  name="apinhamento.corrigir_inferior.vestibularizar"
                  onChange={value => {
                    setCorrigirInferior({
                      ...corrigirInferior,
                      vestibularizar: value,
                    });
                    setValue(
                      'apinhamento.corrigir_inferior.vestibularizar',
                      value,
                    );
                  }}
                  value={corrigirInferior?.vestibularizar}
                >
                  <Stack
                    spacing={4}
                    direction={isMobileSize ? 'row' : 'column'}
                  >
                    <Radio value="Primeiro">Primeiro</Radio>
                    <Radio value="Quanto Necessario">Quanto Necessario</Radio>
                    <Radio value="Nenhum">Nenhum</Radio>
                  </Stack>
                </ChakraRadioGroup>

                {!!errors.apinhamento?.corrigir_inferior?.vestibularizar && (
                  <FormErrorMessage>
                    {
                      errors.apinhamento?.corrigir_inferior?.vestibularizar
                        .message
                    }
                  </FormErrorMessage>
                )}
              </Stack>
            </FormControl>
          </VStack>

          <VStack align="flex-start">
            <FormControl
              isInvalid={!!errors.apinhamento?.corrigir_inferior?.ipr_anterior}
            >
              <Stack direction={isMobileSize ? 'row' : 'column'}>
                <FormLabel fontWeight={500}>IPR - Anterior:</FormLabel>
                <ChakraRadioGroup
                  name="apinhamento.corrigir_inferior.ipr_anterior"
                  onChange={value => {
                    setCorrigirInferior({
                      ...corrigirInferior,
                      ipr_anterior: value,
                    });
                    setValue(
                      'apinhamento.corrigir_inferior.ipr_anterior',
                      value,
                    );
                  }}
                  value={corrigirInferior?.ipr_anterior}
                >
                  <Stack
                    spacing={4}
                    direction={isMobileSize ? 'row' : 'column'}
                  >
                    <Radio value="Primeiro">Primeiro</Radio>
                    <Radio value="Quanto Necessario">Quanto Necessario</Radio>
                    <Radio value="Nenhum">Nenhum</Radio>
                  </Stack>
                </ChakraRadioGroup>

                {!!errors.apinhamento?.corrigir_inferior?.ipr_anterior && (
                  <FormErrorMessage>
                    {
                      errors.apinhamento?.corrigir_inferior?.ipr_anterior
                        .message
                    }
                  </FormErrorMessage>
                )}
              </Stack>
            </FormControl>
          </VStack>

          <VStack align="flex-start">
            <FormControl
              isInvalid={
                !!errors.apinhamento?.corrigir_inferior?.ipr_posterior_direito
              }
            >
              <Stack direction={isMobileSize ? 'row' : 'column'}>
                <FormLabel fontWeight={500}>IPR - Posterior Direito:</FormLabel>
                <ChakraRadioGroup
                  name="apinhamento.corrigir_inferior.ipr_posterior_direito"
                  onChange={value => {
                    setCorrigirInferior({
                      ...corrigirInferior,
                      ipr_posterior_direito: value,
                    });
                    setValue(
                      'apinhamento.corrigir_inferior.ipr_posterior_direito',
                      value,
                    );
                  }}
                  value={corrigirInferior?.ipr_posterior_direito}
                >
                  <Stack
                    spacing={4}
                    direction={isMobileSize ? 'row' : 'column'}
                  >
                    <Radio value="Primeiro">Primeiro</Radio>
                    <Radio value="Quanto Necessario">Quanto Necessario</Radio>
                    <Radio value="Nenhum">Nenhum</Radio>
                  </Stack>
                </ChakraRadioGroup>

                {!!errors.apinhamento?.corrigir_inferior
                  ?.ipr_posterior_direito && (
                  <FormErrorMessage>
                    {
                      errors.apinhamento?.corrigir_inferior
                        ?.ipr_posterior_direito.message
                    }
                  </FormErrorMessage>
                )}
              </Stack>
            </FormControl>
          </VStack>

          <VStack align="flex-start">
            <FormControl
              isInvalid={
                !!errors.apinhamento?.corrigir_inferior?.ipr_posterior_esquerdo
              }
            >
              <Stack direction={isMobileSize ? 'row' : 'column'}>
                <FormLabel fontWeight={500}>
                  IPR - Posterior Esquerdo:
                </FormLabel>
                <ChakraRadioGroup
                  name="apinhamento.corrigir_inferior.ipr_posterior_esquerdo"
                  onChange={value => {
                    setCorrigirInferior({
                      ...corrigirInferior,
                      ipr_posterior_esquerdo: value,
                    });
                    setValue(
                      'apinhamento.corrigir_inferior.ipr_posterior_esquerdo',
                      value,
                    );
                  }}
                  value={corrigirInferior?.ipr_posterior_esquerdo}
                >
                  <Stack
                    spacing={4}
                    direction={isMobileSize ? 'row' : 'column'}
                  >
                    <Radio value="Primeiro">Primeiro</Radio>
                    <Radio value="Quanto Necessario">Quanto Necessario</Radio>
                    <Radio value="Nenhum">Nenhum</Radio>
                  </Stack>
                </ChakraRadioGroup>

                {!!errors.apinhamento?.corrigir_inferior
                  ?.ipr_posterior_esquerdo && (
                  <FormErrorMessage>
                    {
                      errors.apinhamento?.corrigir_inferior
                        ?.ipr_posterior_esquerdo.message
                    }
                  </FormErrorMessage>
                )}
              </Stack>
            </FormControl>
          </VStack>
        </VStack>
      </Flex>

      <RadioGroup
        name="extracoes.option"
        label="Extrações"
        error={errors.extracoes?.option}
        onChangeOption={value => handleChangeExtraçoesOption(value)}
        value={extracoesOption}
      >
        <VStack spacing={3} align="flex-start">
          <Radio value="Nenhuma">Nenhuma</Radio>
          <Radio value="Extração dos dentes abaixo">
            Extração dos dentes abaixo
          </Radio>
        </VStack>
      </RadioGroup>

      <Box hidden={hideExtraçoesSubOptions} width="100%">
        <FormControl>
          <CheckBoxGroup
            isDefaultSize={isDefaultSize}
            checkBoxSize={checkBoxSize}
            onSelect={value => handleSelectSubOptions(value)}
          />
        </FormControl>
      </Box>

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
