import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import moment from 'moment';
import { Input } from './Form/input';
import { Pagination } from './Pagination';
import api from '../client/api';
import { useAuth } from '../hooks/useAuth';

type CommentFormData = {
  comment: string;
};

const commentFormSchema = yup.object().shape({
  comment: yup.string().required('Por favor digite um comentário.'),
});

type CommentProps = {
  authorId: string;
  content: string;
  createdAt: string;
  id: string;
};

interface CommentBoxProps {
  caseId: string;
}

export function CommentBox({ caseId }: CommentBoxProps) {
  const { user } = useAuth();

  const [commentsData, setCommentsData] = useState<CommentProps[]>([]);
  const [commentAuthors, setCommentAuthors] = useState<UserType[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const commentsPerPage = 6;
  const [page, setPage] = useState(1);

  const { register, handleSubmit, formState, reset } = useForm<CommentFormData>(
    {
      resolver: yupResolver(commentFormSchema),
    },
  );

  const { errors } = formState;

  const loadAuthorsFromComments = useCallback(async (ids: string[]) => {
    const authors = await Promise.all(
      ids.map(async id => (await api.get(`users/${id}`)).data),
    );

    return authors;
  }, []);

  const loadComments = useCallback(async () => {
    const { data: newComments } = await api.get(`/comments/request/${caseId}`);

    const authors = await loadAuthorsFromComments(
      newComments.map((comment: CommentProps) => comment.authorId),
    );

    setCommentAuthors(authors);

    const commentsSorted = newComments.sort(
      (a: CommentProps, b: CommentProps) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    setCommentsData(commentsSorted);
  }, [caseId, loadAuthorsFromComments]);

  const handleSendComment: SubmitHandler<CommentFormData> = async values => {
    setIsLoading(true);
    const commentData = {
      authorId: user.id,
      content: values.comment,
      createdAt: new Date(),
    };
    await api.post(`/comments/request/${caseId}`, commentData);
    loadComments();
    reset();
    setIsLoading(false);
  };

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  return (
    <Stack
      direction="column"
      spacing={5}
      my={4}
      as="form"
      onSubmit={handleSubmit(handleSendComment)}
    >
      {commentsData
        .slice((page - 1) * commentsPerPage, page * commentsPerPage)
        .map(comment => {
          return (
            <Stack key={comment.id} direction="column" maxW="2xl">
              <HStack spacing={3}>
                <Avatar
                  size="md"
                  name={
                    commentAuthors.find(
                      author => author.id === comment.authorId,
                    )?.name
                  }
                  src={
                    commentAuthors.find(
                      author => author.id === comment.authorId,
                    )?.avatar
                  }
                />
                <Flex direction="column">
                  <Text fontWeight="bold" fontSize="md">
                    {
                      commentAuthors.find(
                        author => author.id === comment.authorId,
                      )?.name
                    }
                  </Text>
                  <Text fontWeight="light" fontSize="xs">
                    {moment(comment.createdAt, 'YYYYMMDD').fromNow()}
                  </Text>
                </Flex>
              </HStack>
              <Text
                color="gray.700"
                fontSize="0.87rem"
                textAlign="left"
                lineHeight="1.375"
                fontWeight="300"
              >
                {comment.content}
              </Text>
            </Stack>
          );
        })}

      <Pagination
        totalCountOfRegisters={commentsData.length}
        registerPerPage={commentsPerPage}
        currentPage={page}
        onPageChange={setPage}
      />
      <FormControl isInvalid={!!errors.comment}>
        <InputGroup size="md">
          <Input placeholder="Enviar comentário" {...register('comment')} />
          <InputRightElement width="4.5rem">
            <Button type="submit" isLoading={isLoading}>
              Enviar
            </Button>
          </InputRightElement>
        </InputGroup>
        {!!errors.comment && (
          <FormErrorMessage>{errors.comment.message}</FormErrorMessage>
        )}
      </FormControl>
    </Stack>
  );
}
