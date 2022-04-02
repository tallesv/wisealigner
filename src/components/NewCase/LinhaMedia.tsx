import {
  VStack,
  Radio,
  Flex,
  HStack,
  Text,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useEffect, useState } from 'react';
import { RadioGroup } from '../Form/RadioGroup';
import { Button } from '../Button';
import { Input } from '../Form/input';

interface LinhaMediaProps {
  linhaMedia?: LinhaMediaType;
  handleNextStep: () => void;
  handleSubmitData: (value: { linha_media: LinhaMediaType }) => Promise<void>;
}

const LinhaMediaFormSchema = yup.object().shape({
  option: yup
    .string()
    .required('Por favor escolha uma opção para o tratamento de LinhaMedia.'),
  superior_direita: yup.string(),
  superior_esquerda: yup.string(),
  inferior_direita: yup.string(),
  inferior_esquerda: yup.string(),
});

export function LinhaMedia({
  linhaMedia,
  handleNextStep,
  handleSubmitData,
}: LinhaMediaProps) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [hideSubOptions, setHideSubOptions] = useState(
    linhaMedia?.option === 'Manter linha média de acordo com o alinhamento',
  );
  const [option, setOption] = useState(linhaMedia?.option);

  const isMobileSize = useBreakpointValue({
    md: true,
  });

  const { register, handleSubmit, formState, setValue } =
    useForm<LinhaMediaType>({
      resolver: yupResolver(LinhaMediaFormSchema),
    });

  const { errors } = formState;

  function handleSelectOption(value: string) {
    setValue('option', value);
    setOption(value);
    setHideSubOptions(
      value === 'Manter linha média de acordo com o alinhamento',
    );
    if (value === 'Manter linha média de acordo com o alinhamento') {
      setValue('inferior.direita', '');
      setValue('inferior.esquerda', '');
      setValue('superior.direita', '');
      setValue('superior.esquerda', '');
    }
  }

  const handleSubmitLinhaMedia: SubmitHandler<LinhaMediaType> = async value => {
    setButtonLoading(true);
    await handleSubmitData({ linha_media: { ...value } });
    setButtonLoading(false);
  };

  useEffect(() => {
    if (linhaMedia) {
      setValue('option', linhaMedia.option);
      setValue(
        'inferior.direita',
        linhaMedia?.inferior?.direita ? linhaMedia?.inferior?.direita : '',
      );
      setValue(
        'inferior.esquerda',
        linhaMedia?.inferior?.esquerda ? linhaMedia?.inferior?.esquerda : '',
      );
      setValue(
        'superior.direita',
        linhaMedia?.superior?.direita ? linhaMedia?.superior?.direita : '',
      );
      setValue(
        'superior.esquerda',
        linhaMedia?.superior?.esquerda ? linhaMedia?.superior?.esquerda : '',
      );
    }
  }, [setValue, linhaMedia]);

  return (
    <VStack
      w="100%"
      spacing={8}
      as="form"
      onSubmit={handleSubmit(handleSubmitLinhaMedia)}
    >
      <RadioGroup
        name="option"
        error={errors.option}
        onChangeOption={value => handleSelectOption(value)}
        value={option}
      >
        <VStack spacing={3} align="flex-start">
          <Radio value="Manter linha média de acordo com o alinhamento">
            Manter linha média de acordo com o alinhamento
          </Radio>
          <Radio value="Modificar a linha média com IPR">
            Modificar a linha média com IPR
          </Radio>
          <Radio value="Modificar linha média sem IPR (se houver excesso de espaço)">
            Modificar linha média sem IPR (se houver excesso de espaço)
          </Radio>
        </VStack>
      </RadioGroup>

      <Stack
        hidden={hideSubOptions}
        direction={isMobileSize ? 'row' : 'column'}
      >
        <VStack align="flex-start">
          <Text fontWeight={700}>Superior</Text>
          <HStack spacing={4}>
            <Input
              label="Para Esquerda"
              rightAddon="mm"
              type="number"
              size={isMobileSize ? 'lg' : 'md'}
              {...register('superior.esquerda')}
            />
            <Input
              label="Para Direita"
              rightAddon="mm"
              type="number"
              size={isMobileSize ? 'lg' : 'md'}
              {...register('superior.direita')}
            />
          </HStack>
        </VStack>
        <VStack align="flex-start">
          <Text fontWeight={700}>Inferior</Text>
          <HStack spacing={4}>
            <Input
              label="Para Esquerda"
              rightAddon="mm"
              type="number"
              size={isMobileSize ? 'lg' : 'md'}
              {...register('inferior.esquerda')}
            />
            <Input
              label="Para Direita"
              rightAddon="mm"
              type="number"
              size={isMobileSize ? 'lg' : 'md'}
              {...register('inferior.direita')}
            />
          </HStack>
        </VStack>
      </Stack>

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
