import {
  Flex,
  Box,
  Text,
  Avatar,
  useBreakpointValue,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { RiMenuLine } from 'react-icons/ri';
import { useSidebarDrawer } from '../context/SidebarDrawerContext';

export function Header() {
  const { push } = useRouter();
  const { onOpen } = useSidebarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      mx="auto"
      mt={3}
      px={[4, 10]}
      h={20}
      maxWidth={1480}
      align="center"
      justifyContent="space-between"
    >
      <Flex>
        {!isWideVersion && (
          <IconButton
            suppressHydrationWarning
            aria-label="Open navigation"
            icon={<Icon as={RiMenuLine} />}
            fontSize="24"
            variant="unstyled"
            onClick={onOpen}
            mr={[1, 5]}
            mt={[3]}
          />
        )}

        <IconButton
          onClick={() => push('/')}
          bgColor="gray.200"
          aria-label="Navigate to home page"
          suppressHydrationWarning
        >
          <Text
            fontSize={['2xl', '3xl']}
            fontWeight="bold"
            letterSpacing="tight"
          >
            wisealigner
            <Text as="span" ml={1} color="purple.550">
              .
            </Text>
          </Text>
        </IconButton>
      </Flex>

      <Flex>
        <Box mr={3} textAlign="right">
          <Text>name</Text>
          <Text color="gray.450">email</Text>
        </Box>

        <Avatar size="md" name="Talles" src="https://github.com/tallesv.png" />
      </Flex>
    </Flex>
  );
}
