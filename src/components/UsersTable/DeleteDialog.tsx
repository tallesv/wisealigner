import {
  Button as ChakraButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import { useState } from 'react';
import api from '../../client/api';

interface DeleteDialog {
  pacientName?: string;
  caseId?: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export function DeleteDialog({
  pacientName,
  caseId,
  isOpen,
  onClose,
  onDelete,
}: DeleteDialog) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function removeCase() {
    setIsDeleting(true);
    await api.delete(`/requests/${caseId}`);
    setIsDeleting(false);
    onDelete();
    onClose();
  }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={undefined}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Deletar caso
          </AlertDialogHeader>

          <AlertDialogBody>
            {`Você tem certeza que quer deletar o caso de ${pacientName}.`}
          </AlertDialogBody>

          <AlertDialogFooter>
            <ChakraButton onClick={onClose}>Cancelar</ChakraButton>
            <ChakraButton
              colorScheme="red"
              isLoading={isDeleting}
              onClick={() => removeCase()}
              ml={3}
            >
              Deletar
            </ChakraButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
