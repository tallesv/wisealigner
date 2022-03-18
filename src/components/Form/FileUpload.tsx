import {
  Input as ChakraInput,
  InputGroup,
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from '@chakra-ui/react';
import { ReactNode, useRef, useState } from 'react';
import uploadFile from '../../utils/uploadFile';

interface FileUploadProps extends ChakraButtonProps {
  children?: ReactNode;
  label: string;
  onUploadImage: (url: string) => void;
  isUploading: (uploading: boolean) => void;
}

export const FileUpload = ({
  children,
  label,
  onUploadImage,
  isUploading,
  ...rest
}: FileUploadProps) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleClick = () => {
    inputRef.current?.click();
  };

  async function handleUpload(file: File) {
    setButtonLoading(true);
    isUploading(true);
    const url = await uploadFile(file);
    onUploadImage(url);
    isUploading(false);
    setButtonLoading(false);
  }

  return (
    <InputGroup onClick={handleClick}>
      <ChakraInput
        type="file"
        hidden
        focusBorderColor="purple.400"
        ref={e => {
          inputRef.current = e;
        }}
        onChange={e => e.target.files && handleUpload(e.target.files[0])}
      />
      {children}
      <ChakraButton
        isLoading={buttonLoading}
        fontSize={[11, 16]}
        variant="outline"
        bgColor="white"
        _hover={{ bgColor: 'white' }}
        color="blue.450"
        {...rest}
      >
        {label}
      </ChakraButton>
    </InputGroup>
  );
};
