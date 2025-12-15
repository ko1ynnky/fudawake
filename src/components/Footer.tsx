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

// 和風カラー定数
const colors = {
  sumiBlack: '#1a1a1a',
  shuRed: '#c41e3a',
  kinGold: '#c9a227',
  washiCream: '#f5f0e6',
  washiLight: '#faf8f3',
  haiGray: '#6b6b6b',
};

export default function Footer() {
  return (
    <Box
      as="footer"
      bg={colors.sumiBlack}
      py={{ base: 4, md: 6 }}
      mt="auto"
      position="relative"
      overflow="hidden"
    >
      {/* 装飾ライン */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        h="2px"
        bgGradient={`linear(to-r, transparent, ${colors.kinGold}, ${colors.shuRed}, ${colors.kinGold}, transparent)`}
      />

      <Container maxW="container.md">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          gap={{ base: 3, md: 0 }}
        >
          <HStack spacing={2}>
            {/* 朱印風ロゴ */}
            <Box
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              w="1.5rem"
              h="1.5rem"
              bg={colors.shuRed}
              color={colors.washiCream}
              borderRadius="3px"
              fontFamily="'Noto Serif JP', serif"
              fontSize="0.625rem"
              fontWeight="700"
              transform="rotate(-3deg)"
              boxShadow="inset 0 0 0 1px rgba(255, 255, 255, 0.2)"
            >
              札
            </Box>
            <Text
              fontSize={{ base: 'xs', md: 'sm' }}
              color={colors.washiCream}
              fontFamily="'Noto Sans JP', sans-serif"
              opacity={0.8}
            >
              {`© ${currentYear} 札分け`}
            </Text>
          </HStack>

          <HStack spacing={{ base: 1, md: 2 }}>
            <Link
              href="https://twitter.com/0kdynnkw"
              isExternal
              _hover={{ textDecoration: 'none' }}
            >
              <IconButton
                aria-label="Twitter"
                icon={<FaTwitter />}
                size="sm"
                fontSize={{ base: '14px', md: '16px' }}
                bg="transparent"
                color={colors.washiCream}
                opacity={0.7}
                _hover={{
                  opacity: 1,
                  color: '#1DA1F2',
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.2s ease"
              />
            </Link>
            <Link
              href="https://github.com/ko1ynnky"
              isExternal
              _hover={{ textDecoration: 'none' }}
            >
              <IconButton
                aria-label="GitHub"
                icon={<FaGithub />}
                size="sm"
                fontSize={{ base: '14px', md: '16px' }}
                bg="transparent"
                color={colors.washiCream}
                opacity={0.7}
                _hover={{
                  opacity: 1,
                  color: colors.washiCream,
                  transform: 'translateY(-2px)',
                }}
                transition="all 0.2s ease"
              />
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
