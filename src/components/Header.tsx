import {
  Flex,
  Box,
  Text,
  Avatar,
  useBreakpointValue,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';
import { useSidebarDrawer } from '../context/SidebarDrawerContext';

export function Header() {
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
            aria-label="Open navigation"
            icon={<Icon as={RiMenuLine} />}
            fontSize="24"
            variant="unstyled"
            onClick={onOpen}
            mr={[1, 5]}
            mt={[1, 2]}
          />
        )}

        <Text
          fontSize={['2xl', '3xl']}
          fontWeight="bold"
          letterSpacing="tight"
          w="64"
        >
          wisealigner
          <Text as="span" ml={1} color="purple.550">
            .
          </Text>
        </Text>
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
