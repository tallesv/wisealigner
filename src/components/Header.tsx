import { Flex, Box, Text, Avatar } from '@chakra-ui/react';

export function Header() {
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
