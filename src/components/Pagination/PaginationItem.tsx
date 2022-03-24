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
          bg: 'purple.550',
        }}
        _disabled={{
          bg: 'purple.550',
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
      colorScheme="purple"
      _hover={{
        bg: 'purple.550',
      }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  );
}
