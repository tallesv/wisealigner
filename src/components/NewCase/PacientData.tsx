import {
  Flex,
  VStack,
  Stack,
  Avatar,
  FormControl,
  FormLabel,
  HStack,
  Radio,
  FormErrorMessage,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useCallback, useState } from 'react';
import { Input } from '../Form/input';
import { RadioGroup } from '../Form/RadioGroup';
import { Button } from '../Button';
import { FileUpload } from '../Form/FileUpload';
import deleteFile from '../../utils/deleteFile';

interface PacientDataProps {
  inputSize: string;
  isWideVersion: boolean | undefined;
  stepsSize: number;
  activeStep: number;
  handlePrevStep: () => void;
  handleSubmitData: (values: DadosDoPacienteType) => void;
}

const PacientDataFormSchema = yup.object().shape({
  nome_completo: yup
    .string()
    .required('Por favor insira o nome completo do paciente.'),
  genero: yup.string().required('Por favor escolha o genêro do paciente.'),
  data_de_nascimento: yup
    .string()
    .required('Por favor insira a data de nascimento do paciente.'),
  avatar: yup
    .string()
    .required('Por favor selecione uma foto para o paciente.'),
});

export function PacientData({
  inputSize,
  isWideVersion,
  stepsSize,
  activeStep,
  handlePrevStep,
  handleSubmitData,
}: PacientDataProps) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [pacientImage, setPacientImage] = useState('');

  const { register, handleSubmit, formState, setValue, getValues } =
    useForm<DadosDoPacienteType>({
      resolver: yupResolver(PacientDataFormSchema),
    });

  const { errors } = formState;

  const handleSubmitPacientData: SubmitHandler<
    DadosDoPacienteType
  > = async values => {
    setButtonLoading(true);
    handleSubmitData({ ...values });
    setButtonLoading(false);
  };

  const handleUploadPacientImage = useCallback(
    async (url: string) => {
      if (getValues().avatar) {
        await deleteFile(getValues().avatar);
      }
      setValue('avatar', url);
      setPacientImage(url);
    },
    [getValues, setValue],
  );

  return (
    <VStack
      w="100%"
      spacing={8}
      as="form"
      onSubmit={handleSubmit(handleSubmitPacientData)}
    >
      <Input
        label="Nome Completo do paciente"
        size={inputSize}
        error={errors.nome_completo}
        {...register('nome_completo')}
      />
      <Stack w="100%" direction={['column', 'row']} spacing={8}>
        <RadioGroup
          name="genero"
          label="Gênero"
          error={errors.genero}
          onChangeOption={value => setValue('genero', value)}
          value={undefined}
        >
          <HStack>
            <Radio value="masculine">Masculino</Radio>
            <Radio value="feminine">Feminino</Radio>
          </HStack>
        </RadioGroup>
        <Input
          label="Data de nascimento"
          type="date"
          placeholder="dd-mm-yyyy"
          size={inputSize}
          error={errors.data_de_nascimento}
          {...register('data_de_nascimento')}
        />
      </Stack>

      <FormControl isInvalid={!!errors.avatar}>
        <FormLabel fontWeight={700} htmlFor="Foto do paciente">
          Foto do paciente
        </FormLabel>
        <HStack spacing={[3, 6]}>
          <Avatar size={isWideVersion ? 'xl' : 'lg'} src={pacientImage} />

          <FileUpload
            label="Adicionar foto do paciente"
            onUploadImage={url => handleUploadPacientImage(url)}
            isUploading={uploading => setIsUploading(uploading)}
          />
        </HStack>
        {!!errors.avatar && (
          <FormErrorMessage>{errors.avatar.message}</FormErrorMessage>
        )}
      </FormControl>

      <Flex>
        <Button
          size="sm"
          type="submit"
          isLoading={buttonLoading}
          disabled={isUploading}
        >
          {activeStep === stepsSize ? 'Finalizar' : 'Próximo'}
        </Button>
      </Flex>
    </VStack>
  );
}
