import {
  Flex,
  Box,
  Text,
  Avatar,
  useBreakpointValue,
  IconButton,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { RiMenuLine, RiLogoutBoxRLine, RiContactsLine } from 'react-icons/ri';
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
            wisealigners
            <Text as="span" ml={1} color="purple.550">
              .
            </Text>
          </Text>
        </IconButton>
      </Flex>

      <Flex>
        <Box mr={3} textAlign="right">
          <Text>Talles</Text>
          <Text color="gray.450">talles@mail.com</Text>
        </Box>
        <Menu>
          <MenuButton>
            <Avatar
              size="md"
              name="Talles"
              src="https://github.com/tallesv.png"
            />
          </MenuButton>
          <MenuList>
            <Link href="/edit-user">
              <MenuItem icon={<RiContactsLine />}>Meus dados</MenuItem>
            </Link>
            <MenuItem icon={<RiLogoutBoxRLine />}>Sair</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
