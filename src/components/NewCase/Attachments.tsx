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
  attachments?: AttachmentsType;
  handleNextStep: () => void;
  handleSubmitData: (values: { attachments: AttachmentsType }) => Promise<void>;
}

const AttachmentsFormSchema = yup.object().shape({
  option: yup
    .string()
    .required('Por favor escolha uma opção para o Attachments.'),
  subOptions: yup.array().of(yup.string()),
});

export function Attachments({
  attachments,
  handleNextStep,
  handleSubmitData,
}: AttachmentsProps) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [hideSubOptions, setHideSubOptions] = useState(true);

  const [option, setOption] = useState(attachments?.option);

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
    setOption(value);
    setHideSubOptions(value === 'sim');

    if (value === 'sim') {
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

  const handleSubmitAttachments: SubmitHandler<
    AttachmentsType
  > = async values => {
    setButtonLoading(true);
    await handleSubmitData({ attachments: { ...values } });
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
        error={errors.option}
        onChangeOption={value => handleSelectOption(value)}
        value={option}
      >
        <VStack spacing={3} align="flex-start">
          <Radio value="sim">Coloque attachments se necessário</Radio>
          <Radio value="nao">Não coloque attachments nos dentes abaixo</Radio>
        </VStack>
      </RadioGroup>

      <FormControl>
        <Box hidden={hideSubOptions}>
          <CheckBoxGroup
            itensSelected={attachments?.sub_options}
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
