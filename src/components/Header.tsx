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
  Image,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  RiMenuLine,
  RiLogoutBoxRLine,
  RiContactsLine,
  RiUserAddLine,
} from 'react-icons/ri';
import { useSidebarDrawer } from '../context/SidebarDrawerContext';
import { useAuth } from '../hooks/useAuth';

export function Header() {
  const { push } = useRouter();
  const { onOpen } = useSidebarDrawer();
  const { signOut, user } = useAuth();

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
          <Image maxW="120px" maxH="100px" src="wisealignerslogo.png" />
        </IconButton>
      </Flex>

      <Flex>
        <Box mr={3} textAlign="right">
          <Text>{user.name}</Text>
          <Text color="gray.450">{user.email}</Text>
        </Box>
        <Menu>
          <MenuButton>
            <Avatar size="md" name={user.name} src={user.avatar} />
          </MenuButton>
          <MenuList>
            <Link href="/sign-up">
              <MenuItem hidden={user.type !== 'Admin'} icon={<RiUserAddLine />}>
                Registrar usuário
              </MenuItem>
            </Link>
            <Link href={`/edit-user/${user.id}`}>
              <MenuItem icon={<RiContactsLine />}>Meus dados</MenuItem>
            </Link>
            <MenuItem icon={<RiLogoutBoxRLine />} onClick={signOut}>
              Sair
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
