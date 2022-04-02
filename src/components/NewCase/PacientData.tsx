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

import { useCallback, useEffect, useState } from 'react';
import { Input } from '../Form/input';
import { RadioGroup } from '../Form/RadioGroup';
import { Button } from '../Button';
import { FileUpload } from '../Form/FileUpload';
import deleteFile from '../../utils/deleteFile';

interface PacientDataProps {
  dadosDoPaciente?: DadosDoPacienteType;
  inputSize: string;
  isWideVersion: boolean | undefined;
  handlePrevStep: () => void;
  handleSubmitData: (values: {
    dados_do_paciente: DadosDoPacienteType;
  }) => Promise<void>;
}

const PacientDataFormSchema = yup.object().shape({
  nome_completo: yup
    .string()
    .required('Por favor insira o nome completo do paciente.'),
  genero: yup.string().required('Por favor escolha o genêro do paciente.'),
  data_de_nascimento: yup
    .string()
    .required('Por favor insira a data de nascimento do paciente.'),
  avatar: yup.string(),
});

export function PacientData({
  dadosDoPaciente,
  inputSize,
  isWideVersion,
  handleSubmitData,
}: PacientDataProps) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [pacientImage, setPacientImage] = useState(dadosDoPaciente?.avatar);
  const [pacientGenero, setPacientGenero] = useState(dadosDoPaciente?.genero);

  const { register, handleSubmit, formState, setValue, getValues, reset } =
    useForm<DadosDoPacienteType>({
      resolver: yupResolver(PacientDataFormSchema),
    });

  const { errors } = formState;

  const handleSubmitPacientData: SubmitHandler<
    DadosDoPacienteType
  > = async values => {
    setButtonLoading(true);
    await handleSubmitData({ dados_do_paciente: { ...values } });
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

  useEffect(() => {
    if (dadosDoPaciente) {
      setValue('nome_completo', dadosDoPaciente.nome_completo);
      setValue('genero', dadosDoPaciente.genero);
      setValue('data_de_nascimento', dadosDoPaciente.data_de_nascimento);
      setValue('avatar', dadosDoPaciente.avatar);
    }
  }, [dadosDoPaciente, setValue, reset]);
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
          onChangeOption={value => {
            setPacientGenero(value);
            setValue('genero', value);
          }}
          value={pacientGenero}
        >
          <HStack>
            <Radio value="Masculino">Masculino</Radio>
            <Radio value="Feminino">Feminino</Radio>
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
          Próximo
        </Button>
      </Flex>
    </VStack>
  );
}
