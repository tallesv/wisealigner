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

interface AttachmentsProps {
  handleNextStep: () => void;
  handleSubmitData: (values: AttachmentsType) => void;
}

const AttachmentsFormSchema = yup.object().shape({
  option: yup
    .string()
    .required('Por favor escolha uma opção para o Attachments.'),
  subOptions: yup.array().of(yup.string()),
});

export function Attachments({
  handleNextStep,
  handleSubmitData,
}: AttachmentsProps) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [hideSubOptions, setHideSubOptions] = useState(true);

  const checkBoxSize = useBreakpointValue({
    lg: 'md',
    sm: 'sm',
  });

  const { handleSubmit, formState, setValue, getValues } =
    useForm<AttachmentsType>({
      resolver: yupResolver(AttachmentsFormSchema),
    });

  const { errors } = formState;

  const isDefaultSize = useBreakpointValue({
    xl: true,
    lg: false,
  });

  function handleSelectOption(value: string) {
    setValue('option', value);
    setHideSubOptions(value === 'sim');
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

  const handleSubmitAttachments: SubmitHandler<
    AttachmentsType
  > = async values => {
    setButtonLoading(true);
    handleSubmitData(values);
    setButtonLoading(false);
  };

  return (
    <VStack
      w="100%"
      spacing={5}
      as="form"
      onSubmit={handleSubmit(handleSubmitAttachments)}
    >
      <RadioGroup
        name="option"
        label="Attachments"
        error={errors.option}
        onChangeOption={value => handleSelectOption(value)}
        value={undefined}
      >
        <VStack spacing={3} align="flex-start">
          <Radio value="sim">Coloque attachments se necessário</Radio>
          <Radio value="nao">Não coloque attachments nos dentes abaixo</Radio>
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
