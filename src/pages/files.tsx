import {
  Box,
  Flex,
  Heading,
  Image,
  Divider,
  Button as CharkaButton,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import api from '../client/api';
import { Button } from '../components/Button';
import { FileUpload } from '../components/Form/FileUpload';
import { useAuth } from '../hooks/useAuth';
import deleteFile from '../utils/deleteFile';
import { withSSRAuth } from '../utils/withSSRAuth';

type FileType = {
  id: string;
  fileUrl: string;
};

function Files() {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<FileType[]>([]);

  const { user } = useAuth();

  async function loadFiles() {
    const response = await api.get('/files');
    setFiles(response.data);
  }

  const handleAddFile = useCallback(async (url: string) => {
    await api.post('/files', { fileUrl: url });
    loadFiles();
  }, []);

  const handleRemoveFile = useCallback(async (file: FileType) => {
    await deleteFile(file.fileUrl);
    await api.delete(`/files/${file.id}`);
    loadFiles();
  }, []);

  useEffect(() => {
    loadFiles();
  }, []);

  return (
    <Box p={[6, 8]}>
      <Flex w="100%" justifyContent="space-between">
        <Heading size="lg">
          Arquivos
          {isLoading && <Spinner ml={5} />}
        </Heading>

        <Box hidden={user.type !== 'Admin'}>
          <FileUpload
            label="Adicionar arquivo"
            isUploading={uploading => setIsLoading(uploading)}
            onUploadImage={url => handleAddFile(url)}
          />
        </Box>
      </Flex>

      <Divider my="6" />

      <Flex mt={10} wrap="wrap">
        {files.map(file => (
          <Flex key={file.id} direction="column" maxW="200px" m={5}>
            <Image
              boxSize="200px"
              src={file.fileUrl}
              fallbackSrc="https://icon-library.com/images/file-icon-png/file-icon-png-12.jpg"
            />

            <Text mx="auto">
              {file.fileUrl.substring(
                file.fileUrl.lastIndexOf('/') + 1,
                file.fileUrl.lastIndexOf('?'),
              )}
            </Text>

            <CharkaButton
              colorScheme="red"
              mt={2}
              onClick={() => handleRemoveFile(file)}
              hidden={user.type !== 'Admin'}
            >
              Remover
            </CharkaButton>

            <a href={file.fileUrl} target="_blank" rel="noreferrer">
              <Button w="100%" mt={2}>
                Download
              </Button>
            </a>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
}

export default Files;

export const getServerSideProps = withSSRAuth(async () => {
  return {
    props: {},
  };
});
