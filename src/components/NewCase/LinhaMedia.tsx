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

import { useState } from 'react';
import { RadioGroup } from '../Form/RadioGroup';
import { Button } from '../Button';
import { Input } from '../Form/input';

interface LinhaMediaProps {
  handleNextStep: () => void;
  handleSubmitData: (value: { linha_media: LinhaMediaType }) => void;
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
  handleNextStep,
  handleSubmitData,
}: LinhaMediaProps) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [hideSubOptions, setHideSubOptions] = useState(true);

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
    setHideSubOptions(value === 'manter');
    if (value === 'manter') {
      setValue('inferior.direita', '');
      setValue('inferior.esquerda', '');
      setValue('superior.direita', '');
      setValue('superior.esquerda', '');
    }
  }

  const handleSubmitLinhaMedia: SubmitHandler<LinhaMediaType> = async value => {
    setButtonLoading(true);
    handleSubmitData({ linha_media: { ...value } });
    setButtonLoading(false);
  };

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
        value={undefined}
      >
        <VStack spacing={3} align="flex-start">
          <Radio value="manter">
            Manter linha média de acordo com o alinhamento
          </Radio>
          <Radio value="modificar com irp">
            Modificar a linha média com IPR
          </Radio>
          <Radio value="modificar sem ipr">
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
