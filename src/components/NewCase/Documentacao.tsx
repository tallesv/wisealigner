import {
  VStack,
  Flex,
  Box,
  useBreakpointValue,
  FormControl,
  FormErrorMessage,
  Image,
  Text,
} from '@chakra-ui/react';
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useEffect, useState } from 'react';
import { Button } from '../Button';
import { FileUpload } from '../Form/FileUpload';

type Fotos = {
  perfil: string;
  frente: string;
  sorriso: string;
  arca_superior: string;
  arca_inferior: string;
  arca_esquerda: string;
  arca_direita: string;
  arca_frontal: string;
};

type Radiografia = {
  frente: string;
  perfil: string;
};

type Stls = {
  superior: string;
  inferior: string;
};
interface DocumentacaoProps {
  documentacao?: DocumentacaoType;
  handleNextStep: () => void;
  handleSubmitData: (values: {
    documentacao: DocumentacaoType;
  }) => Promise<void>;
}

const DocumentacaoFormSchema = yup.object().shape({
  fotos: yup.object().shape({
    perfil: yup.string().required('Por favor insira todas as fotos.'),
    frente: yup.string().required('Por favor insira todas as fotos.'),
    sorriso: yup.string().required('Por favor insira todas as fotos.'),
    arca_superior: yup.string().required('Por favor insira todas as fotos.'),
    arca_inferior: yup.string().required('Por favor insira todas as fotos.'),
    arca_esquerda: yup.string().required('Por favor insira todas as fotos.'),
    arca_direita: yup.string().required('Por favor insira todas as fotos.'),
    arca_frontal: yup.string().required('Por favor insira todas as fotos.'),
  }),
  radiografia: yup.object().shape({
    frente: yup.string().required('Por favor insira todas as radiografias.'),
    perfil: yup.string().required('Por favor insira todas as radiografias.'),
  }),
  stls: yup.object().shape({
    superior: yup.string().required('Por favor insira todas as stls.'),
    inferior: yup.string().required('Por favor insira todas as stls.'),
  }),
});

export function Documentacao({
  documentacao,
  handleNextStep,
  handleSubmitData,
}: DocumentacaoProps) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [fotos, setFotos] = useState(
    documentacao?.fotos ? documentacao.fotos : ({} as Fotos),
  );

  const [radiografia, setRadiografia] = useState(
    documentacao?.radiografia ? documentacao.radiografia : ({} as Radiografia),
  );

  const [stls, setStls] = useState(
    documentacao?.stls ? documentacao.stls : ({} as Stls),
  );

  const imageSize = useBreakpointValue({
    lg: '200px',
    md: '150px',
    sm: '150px',
  });

  const { handleSubmit, formState, setValue } = useForm<DocumentacaoType>({
    resolver: yupResolver(DocumentacaoFormSchema),
  });

  const { errors } = formState;

  const handleSubmitDocumentacao: SubmitHandler<
    DocumentacaoType
  > = async values => {
    setButtonLoading(true);
    await handleSubmitData({ documentacao: { ...values } });
    setButtonLoading(false);
  };

  useEffect(() => {
    if (documentacao) {
      setValue('fotos.perfil', documentacao.fotos.perfil);
      setValue('fotos.frente', documentacao.fotos.frente);
      setValue('fotos.sorriso', documentacao.fotos.sorriso);
      setValue('fotos.arca_direita', documentacao.fotos.arca_direita);
      setValue('fotos.arca_esquerda', documentacao.fotos.arca_esquerda);
      setValue('fotos.arca_superior', documentacao.fotos.arca_superior);
      setValue('fotos.arca_inferior', documentacao.fotos.arca_inferior);
      setValue('fotos.arca_frontal', documentacao.fotos.arca_frontal);
      setValue('radiografia.frente', documentacao.radiografia.frente);
      setValue('radiografia.perfil', documentacao.radiografia.perfil);
      setValue('stls.inferior', documentacao.stls.inferior);
      setValue('stls.superior', documentacao.stls.superior);
    }
  }, [setValue, documentacao]);
  return (
    <VStack
      w="100%"
      spacing={5}
      as="form"
      onSubmit={handleSubmit(handleSubmitDocumentacao)}
    >
      <Box w="100%" textAlign="initial">
        <Text fontWeight={700} my={2}>
          Fotos
        </Text>
        <Flex justifyContent="space-between" flexWrap="wrap">
          <Flex direction="column" alignItems="center" my={4}>
            <FormControl isInvalid>
              <Image
                boxSize={imageSize}
                src={fotos?.perfil ? fotos.perfil : '/images/foto_perfil.jpg'}
                alt="perfil"
              />
              <FileUpload
                label="Escolher foto"
                onUploadImage={url => {
                  setFotos({ ...fotos, perfil: url });
                  setValue('fotos.perfil', url);
                }}
                isUploading={uploading => setIsUploading(uploading)}
                mt={2}
              />
              {!!errors.fotos?.perfil && (
                <FormErrorMessage>
                  {errors.fotos?.perfil?.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </Flex>
          <Flex direction="column" alignItems="center" my={4}>
            <FormControl isInvalid>
              <Image
                boxSize={imageSize}
                src={fotos?.frente ? fotos.frente : '/images/foto_frontal.jpg'}
                alt="frente"
              />

              <FileUpload
                label="Escolher foto"
                onUploadImage={url => {
                  setFotos({ ...fotos, frente: url });
                  setValue('fotos.frente', url);
                }}
                isUploading={uploading => setIsUploading(uploading)}
                mt={2}
              />
              {!!errors.fotos?.frente && (
                <FormErrorMessage>
                  {errors.fotos?.frente.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </Flex>
          <Flex direction="column" alignItems="center" my={4}>
            <FormControl isInvalid>
              <Image
                boxSize={imageSize}
                src={
                  fotos?.sorriso ? fotos.sorriso : '/images/foto_sorriso.jpg'
                }
                alt="sorriso"
              />

              <FileUpload
                label="Escolher foto"
                onUploadImage={url => {
                  setFotos({ ...fotos, sorriso: url });
                  setValue('fotos.sorriso', url);
                }}
                isUploading={uploading => setIsUploading(uploading)}
                mt={2}
              />
              {!!errors.fotos?.sorriso && (
                <FormErrorMessage>
                  {errors.fotos?.sorriso.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </Flex>
        </Flex>

        <Flex justifyContent="space-between" flexWrap="wrap" w="100%">
          <Flex direction="column" alignItems="center" my={4}>
            <FormControl isInvalid>
              <Image
                boxSize={imageSize}
                src={
                  fotos?.arca_superior
                    ? fotos.arca_superior
                    : '/images/arca_superior.jpg'
                }
                alt="arca superior"
              />

              <FileUpload
                label="Escolher foto"
                onUploadImage={url => {
                  setFotos({ ...fotos, arca_superior: url });
                  setValue('fotos.arca_superior', url);
                }}
                isUploading={uploading => setIsUploading(uploading)}
                mt={2}
              />
              {!!errors.fotos?.arca_superior && (
                <FormErrorMessage>
                  {errors.fotos?.arca_superior.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </Flex>
          <Flex direction="column" alignItems="center" my={4}>
            <FormControl isInvalid>
              <Image
                boxSize={imageSize}
                src={
                  fotos?.arca_inferior
                    ? fotos.arca_inferior
                    : '/images/arca_inferior.jpg'
                }
                alt="arca inferior"
              />

              <FileUpload
                label="Escolher foto"
                onUploadImage={url => {
                  setFotos({ ...fotos, arca_inferior: url });
                  setValue('fotos.arca_inferior', url);
                }}
                isUploading={uploading => setIsUploading(uploading)}
                mt={2}
              />
              {!!errors.fotos?.arca_inferior && (
                <FormErrorMessage>
                  {errors.fotos?.arca_inferior.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </Flex>
        </Flex>

        <Flex justifyContent="space-between" flexWrap="wrap" w="100%">
          <Flex direction="column" alignItems="center" my={4}>
            <FormControl isInvalid>
              <Image
                boxSize={imageSize}
                src={
                  fotos?.arca_esquerda
                    ? fotos.arca_esquerda
                    : '/images/arca_esquerda.jpg'
                }
                alt="arca esquerda"
              />

              <FileUpload
                label="Escolher foto"
                onUploadImage={url => {
                  setFotos({ ...fotos, arca_esquerda: url });
                  setValue('fotos.arca_esquerda', url);
                }}
                isUploading={uploading => setIsUploading(uploading)}
                mt={2}
              />
              {!!errors.fotos?.arca_esquerda && (
                <FormErrorMessage>
                  {errors.fotos?.arca_esquerda.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </Flex>
          <Flex direction="column" alignItems="center" my={4}>
            <FormControl isInvalid>
              <Image
                boxSize={imageSize}
                src={
                  fotos?.arca_frontal
                    ? fotos.arca_frontal
                    : '/images/arca_frontal.jpg'
                }
                alt="arca frontal"
              />

              <FileUpload
                label="Escolher foto"
                onUploadImage={url => {
                  setFotos({ ...fotos, arca_frontal: url });
                  setValue('fotos.arca_frontal', url);
                }}
                isUploading={uploading => setIsUploading(uploading)}
                mt={2}
              />
              {!!errors.fotos?.arca_frontal && (
                <FormErrorMessage>
                  {errors.fotos?.arca_frontal.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </Flex>
          <Flex direction="column" alignItems="center" my={4}>
            <FormControl isInvalid>
              <Image
                boxSize={imageSize}
                src={
                  fotos?.arca_direita
                    ? fotos.arca_direita
                    : '/images/arca_direita.jpg'
                }
                alt="arca esquerda"
              />

              <FileUpload
                label="Escolher foto"
                onUploadImage={url => {
                  setFotos({ ...fotos, arca_direita: url });
                  setValue('fotos.arca_direita', url);
                }}
                isUploading={uploading => setIsUploading(uploading)}
                mt={2}
              />
              {!!errors.fotos?.arca_direita && (
                <FormErrorMessage>
                  {errors.fotos?.arca_direita.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </Flex>
        </Flex>
      </Box>

      <Box w="100%" textAlign="initial">
        <Text fontWeight={700} my={2}>
          Radiografias
        </Text>
        <Flex justifyContent="space-around" flexWrap="wrap">
          <Flex direction="column" alignItems="center" my={4}>
            <FormControl isInvalid>
              <Image
                boxSize={imageSize}
                src={
                  radiografia?.frente
                    ? radiografia.frente
                    : '/images/radiografia_frontal.jpg'
                }
                alt="perfil"
              />

              <FileUpload
                label="Escolher radiografia"
                onUploadImage={url => {
                  setRadiografia({ ...radiografia, frente: url });
                  setValue('radiografia.frente', url);
                }}
                isUploading={uploading => setIsUploading(uploading)}
                mt={2}
              />
              {!!errors.radiografia?.frente && (
                <FormErrorMessage>
                  {errors.radiografia?.frente.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </Flex>

          <Flex direction="column" alignItems="center" my={4}>
            <FormControl isInvalid>
              <Image
                boxSize={imageSize}
                src={
                  radiografia?.perfil
                    ? radiografia.perfil
                    : '/images/radiografia_perfil.jpg'
                }
                alt="perfil"
              />

              <FileUpload
                label="Escolher radiografia"
                onUploadImage={url => {
                  setRadiografia({ ...radiografia, perfil: url });
                  setValue('radiografia.perfil', url);
                }}
                isUploading={uploading => setIsUploading(uploading)}
                mt={2}
              />
              {!!errors.radiografia?.perfil && (
                <FormErrorMessage>
                  {errors.radiografia?.perfil.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </Flex>
        </Flex>
      </Box>

      <Box w="100%" textAlign="initial">
        <Text fontWeight={700} my={2}>
          STLs
        </Text>
        <Flex justifyContent="space-around" flexWrap="wrap">
          <Flex direction="column" alignItems="center" my={4}>
            <FormControl isInvalid>
              <Image
                boxSize={imageSize}
                src={
                  stls?.superior ? stls.superior : '/images/stls_superior.jpg'
                }
                alt="perfil"
              />
              <FileUpload
                label="Escolher stl"
                onUploadImage={url => {
                  setStls({ ...stls, superior: url });
                  setValue('stls.superior', url);
                }}
                isUploading={uploading => setIsUploading(uploading)}
                mt={2}
              />
              {!!errors.stls?.superior && (
                <FormErrorMessage>
                  {errors.stls?.superior?.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </Flex>

          <Flex direction="column" alignItems="center" my={4}>
            <FormControl isInvalid>
              <Image
                boxSize={imageSize}
                src={
                  stls?.inferior ? stls.inferior : '/images/stls_inferior.jpg'
                }
                alt="perfil"
              />
              <FileUpload
                label="Escolher stl"
                onUploadImage={url => {
                  setStls({ ...stls, inferior: url });
                  setValue('stls.inferior', url);
                }}
                isUploading={uploading => setIsUploading(uploading)}
                mt={2}
              />
              {!!errors.stls?.inferior && (
                <FormErrorMessage>
                  {errors.stls?.inferior.message}
                </FormErrorMessage>
              )}
            </FormControl>
          </Flex>
        </Flex>
      </Box>

      <Flex>
        <Button
          size="sm"
          type="submit"
          isLoading={buttonLoading}
          disabled={isUploading}
          onClick={() => handleNextStep()}
        >
          Finalizar
        </Button>
      </Flex>
    </VStack>
  );
}
