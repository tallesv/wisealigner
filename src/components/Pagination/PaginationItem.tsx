import { Button } from '@chakra-ui/react';

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange: (page: number) => void;
}

export function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        color="white"
        disabled
        _hover={{
          bg: 'teal.650',
        }}
        _disabled={{
          bg: 'teal.650',
          cursor: 'unset',
        }}
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      colorScheme="teal"
      _hover={{
        bg: 'teal.650',
      }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  );
}
