import {
  Box,
  Container,
  Flex,
  Text,
  Link,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { FaTwitter, FaGithub } from 'react-icons/fa';

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <Box as="footer" bg="gray.100" py={{ base: 2, md: 4 }} mt={8}>
      <Container maxW="container.xl">
        <Flex
          direction={{ base: 'row', md: 'row' }}
          justify="space-between"
          align="center"
          fontSize={{ base: 'xs', md: 'sm' }}
        >
          <Text>{`© ${currentYear} 札分け`}</Text>
          <HStack spacing={{ base: 2, md: 4 }}>
            <Link href="https://twitter.com/0kdynnkw" isExternal>
              <IconButton
                aria-label="Twitter"
                icon={<FaTwitter />}
                size="sm"
                fontSize={{ base: '14px', md: '16px' }}
                colorScheme="twitter"
                variant="ghost"
              />
            </Link>
            <Link href="https://github.com/ko1ynnky" isExternal>
              <IconButton
                aria-label="GitHub"
                icon={<FaGithub />}
                size="sm"
                fontSize={{ base: '14px', md: '16px' }}
                colorScheme="gray"
                variant="ghost"
              />
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
