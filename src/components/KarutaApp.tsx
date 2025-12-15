'use client';

import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Heading,
  VStack,
  Text,
  HStack,
  IconButton,
  Container,
  Flex,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RulePosition,
  SelectedPositions,
  RULE_POSITIONS,
  ThreeNumbersRule,
  ThreeFromEachRule,
  SplitRule,
  HistoryItem,
} from '../types';
import {
  generatePositionRule,
  generateThreeNumbersRule,
  generateThreeFromEachRule,
  generateSplitRule,
} from '../utils/ruleGenerators';
import Footer from './Footer';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

const STORAGE_KEY = 'karutaAppHistory';

// 和風カラー定数
const colors = {
  sumiBlack: '#1a1a1a',
  shuRed: '#c41e3a',
  shuRedDark: '#a01830',
  shuRedLight: '#e8425a',
  kinGold: '#c9a227',
  kinGoldLight: '#d4b84a',
  washiCream: '#f5f0e6',
  washiLight: '#faf8f3',
  haiGray: '#6b6b6b',
};

export default function KarutaApp() {
  const [ruleDescription, setRuleDescription] = useState<string[]>([]);
  const [selectedPositions, setSelectedPositions] = useState<SelectedPositions>(
    () =>
      RULE_POSITIONS.reduce(
        (acc, position) => ({
          ...acc,
          [position.key]: ['ones', 'tens', 'threeNumbers'].includes(
            position.key
          ),
        }),
        {}
      )
  );
  const [threeNumbersRule, setThreeNumbersRule] =
    useState<ThreeNumbersRule | null>(null);
  const [threeFromEachRule, setThreeFromEachRule] =
    useState<ThreeFromEachRule | null>(null);
  const [splitRule, setSplitRule] = useState<SplitRule | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedHistory = localStorage.getItem(STORAGE_KEY);
      return savedHistory ? JSON.parse(savedHistory) : [];
    }
    return [];
  });
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }
  }, [history]);

  const handlePositionChange = (key: string) => {
    setSelectedPositions((prev) => {
      const newState = {
        ...prev,
        [key]: !prev[key],
      };
      return newState;
    });
  };

  const generateRandomRule = useCallback(() => {
    const availablePositions = RULE_POSITIONS.filter(
      (position) => selectedPositions[position.key]
    );

    if (availablePositions.length === 0) {
      setRuleDescription(['ルールを選択してください']);
      return;
    }

    setIsGenerating(true);

    const selectedPosition =
      availablePositions[Math.floor(Math.random() * availablePositions.length)];

    let newRuleDescription: string[];

    switch (selectedPosition.type) {
      case 'position':
        newRuleDescription = generatePositionRule();
        newRuleDescription[0] = `${selectedPosition.label}が ${newRuleDescription[0]}`;
        break;
      case 'threeNumbers':
        newRuleDescription = generateThreeNumbersRule(setThreeNumbersRule);
        break;
      case 'threeFromEach':
        newRuleDescription = generateThreeFromEachRule(setThreeFromEachRule);
        break;
      case 'fourTwoSplit':
        newRuleDescription = generateSplitRule(4, 2, setSplitRule);
        break;
      case 'twoFourSplit':
        newRuleDescription = generateSplitRule(2, 4, setSplitRule);
        break;
      default:
        newRuleDescription = ['未知のルールタイプです'];
    }

    setTimeout(() => {
      setRuleDescription(newRuleDescription);
      setIsGenerating(false);

      setHistory((prevHistory) => {
        const newHistory = [
          { id: Date.now().toString(), description: newRuleDescription },
          ...prevHistory,
        ];
        return newHistory.slice(0, 10);
      });
    }, 300);
  }, [selectedPositions]);

  const deleteHistoryItem = (id: string) => {
    setHistory((prevHistory) => prevHistory.filter((item) => item.id !== id));
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Container maxW="container.md" py={{ base: 6, md: 10 }} flex={1}>
        {/* ヘッダー */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          textAlign="center"
          mb={{ base: 6, md: 10 }}
        >
          <Flex justify="center" align="center" gap={3}>
            <Box
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              w="2.5rem"
              h="2.5rem"
              bg={colors.shuRed}
              color={colors.washiCream}
              borderRadius="6px"
              fontFamily="'Noto Serif JP', serif"
              fontSize="1rem"
              fontWeight="700"
              transform="rotate(-3deg)"
              boxShadow="inset 0 0 0 2px rgba(255, 255, 255, 0.2), 2px 2px 4px rgba(0, 0, 0, 0.15)"
            >
              札
            </Box>
            <Heading
              as="h1"
              fontSize={{ base: '2.5rem', md: '3.5rem' }}
              fontFamily="'Noto Serif JP', serif"
              fontWeight="700"
              color={colors.sumiBlack}
              letterSpacing="0.1em"
            >
              札分け
            </Heading>
          </Flex>
          <Text
            mt={2}
            fontSize="sm"
            color={colors.haiGray}
            fontFamily="'Noto Sans JP', sans-serif"
          >
            競技かるた練習用ルール生成
          </Text>
        </MotionBox>

        {/* ルール選択カード */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          bg="linear-gradient(145deg, #faf8f3 0%, #f5f0e6 50%, rgba(201, 162, 39, 0.05) 100%)"
          border="1px solid rgba(26, 26, 26, 0.1)"
          borderRadius="12px"
          boxShadow="0 4px 6px rgba(26, 26, 26, 0.08), 0 1px 3px rgba(26, 26, 26, 0.1)"
          p={{ base: 5, md: 8 }}
          mb={6}
        >
          <Heading
            as="h2"
            size="md"
            mb={5}
            fontFamily="'Noto Serif JP', serif"
            color={colors.sumiBlack}
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Box
              as="span"
              w="4px"
              h="1.2em"
              bg={colors.shuRed}
              borderRadius="2px"
            />
            使用するルール
          </Heading>

          <VStack spacing={3} align="stretch" mb={6}>
            {RULE_POSITIONS.map((position, index) => (
              <MotionBox
                key={position.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <Checkbox
                  isChecked={selectedPositions[position.key]}
                  onChange={() => handlePositionChange(position.key)}
                  colorScheme="red"
                  size="lg"
                  sx={{
                    '.chakra-checkbox__control': {
                      borderColor: colors.haiGray,
                      borderWidth: '2px',
                      borderRadius: '4px',
                      _checked: {
                        bg: colors.shuRed,
                        borderColor: colors.shuRed,
                      },
                    },
                    '.chakra-checkbox__label': {
                      fontFamily: "'Noto Sans JP', sans-serif",
                      fontSize: { base: 'sm', md: 'md' },
                      color: colors.sumiBlack,
                    },
                  }}
                >
                  {position.label}
                </Checkbox>
              </MotionBox>
            ))}
          </VStack>

          <Button
            onClick={generateRandomRule}
            isDisabled={Object.values(selectedPositions).every((v) => !v)}
            isLoading={isGenerating}
            loadingText="生成中..."
            w="100%"
            h="56px"
            bg={`linear-gradient(180deg, ${colors.shuRedLight} 0%, ${colors.shuRed} 50%, ${colors.shuRedDark} 100%)`}
            color="white"
            fontFamily="'Noto Serif JP', serif"
            fontWeight="700"
            fontSize={{ base: 'md', md: 'lg' }}
            letterSpacing="0.1em"
            borderRadius="8px"
            boxShadow="0 4px 12px rgba(196, 30, 58, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
            _hover={{
              bg: `linear-gradient(180deg, ${colors.kinGoldLight} 0%, ${colors.kinGold} 50%, #b8941f 100%)`,
              boxShadow: '0 6px 16px rgba(201, 162, 39, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              transform: 'translateY(-2px)',
            }}
            _active={{
              transform: 'translateY(0)',
            }}
            _disabled={{
              bg: colors.haiGray,
              opacity: 0.6,
              cursor: 'not-allowed',
              _hover: {
                transform: 'none',
              },
            }}
            transition="all 0.3s ease"
          >
            札分けを決める！
          </Button>
        </MotionBox>

        {/* 結果表示 */}
        <AnimatePresence mode="wait">
          {ruleDescription.length > 0 && (
            <MotionBox
              key={ruleDescription.join('')}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              bg="linear-gradient(145deg, #faf8f3 0%, #f5f0e6 50%, rgba(201, 162, 39, 0.08) 100%)"
              border="2px solid"
              borderColor={colors.shuRed}
              borderRadius="12px"
              p={{ base: 5, md: 8 }}
              mb={6}
              position="relative"
              overflow="hidden"
            >
              {/* 装飾的な角 */}
              <Box
                position="absolute"
                top="0"
                left="0"
                w="20px"
                h="20px"
                borderTop="3px solid"
                borderLeft="3px solid"
                borderColor={colors.kinGold}
                borderRadius="4px 0 0 0"
              />
              <Box
                position="absolute"
                top="0"
                right="0"
                w="20px"
                h="20px"
                borderTop="3px solid"
                borderRight="3px solid"
                borderColor={colors.kinGold}
                borderRadius="0 4px 0 0"
              />
              <Box
                position="absolute"
                bottom="0"
                left="0"
                w="20px"
                h="20px"
                borderBottom="3px solid"
                borderLeft="3px solid"
                borderColor={colors.kinGold}
                borderRadius="0 0 0 4px"
              />
              <Box
                position="absolute"
                bottom="0"
                right="0"
                w="20px"
                h="20px"
                borderBottom="3px solid"
                borderRight="3px solid"
                borderColor={colors.kinGold}
                borderRadius="0 0 4px 0"
              />

              <Text
                fontSize="xs"
                color={colors.shuRed}
                fontFamily="'Noto Sans JP', sans-serif"
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="0.15em"
                mb={2}
              >
                現在のルール
              </Text>
              {ruleDescription.map((line, index) => (
                <Text
                  key={index}
                  fontSize={{ base: 'xl', md: '2xl' }}
                  fontFamily="'Noto Serif JP', serif"
                  fontWeight="700"
                  color={colors.sumiBlack}
                  lineHeight="1.6"
                >
                  {line}
                </Text>
              ))}
            </MotionBox>
          )}
        </AnimatePresence>

        {/* 生成履歴 */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Heading
            as="h2"
            size="md"
            mb={4}
            fontFamily="'Noto Serif JP', serif"
            color={colors.sumiBlack}
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Box
              as="span"
              w="4px"
              h="1.2em"
              bg={colors.kinGold}
              borderRadius="2px"
            />
            生成履歴
          </Heading>

          <VStack spacing={3} align="stretch">
            <AnimatePresence>
              {history.map((item, index) => (
                <MotionBox
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  layout
                >
                  <HStack
                    justify="space-between"
                    align="flex-start"
                    p={4}
                    bg={colors.washiLight}
                    border="1px solid rgba(26, 26, 26, 0.08)"
                    borderRadius="8px"
                    _hover={{
                      boxShadow: '0 2px 8px rgba(26, 26, 26, 0.1)',
                    }}
                    transition="box-shadow 0.2s ease"
                  >
                    <HStack align="flex-start" spacing={3}>
                      <Box
                        display="inline-flex"
                        alignItems="center"
                        justifyContent="center"
                        minW="1.75rem"
                        h="1.75rem"
                        bg={colors.shuRed}
                        color={colors.washiCream}
                        borderRadius="4px"
                        fontFamily="'Noto Serif JP', serif"
                        fontSize="xs"
                        fontWeight="700"
                        transform="rotate(-2deg)"
                        boxShadow="1px 1px 2px rgba(0, 0, 0, 0.1)"
                      >
                        {history.length - index}
                      </Box>
                      <VStack align="start" spacing={0}>
                        {item.description.map((line, lineIndex) => (
                          <Text
                            key={lineIndex}
                            fontSize="sm"
                            fontFamily="'Noto Sans JP', sans-serif"
                            color={colors.sumiBlack}
                          >
                            {line}
                          </Text>
                        ))}
                      </VStack>
                    </HStack>
                    <IconButton
                      aria-label="履歴を削除"
                      icon={<DeleteIcon />}
                      onClick={() => deleteHistoryItem(item.id)}
                      size="sm"
                      variant="ghost"
                      color={colors.haiGray}
                      _hover={{
                        color: colors.shuRed,
                        bg: 'rgba(196, 30, 58, 0.1)',
                      }}
                    />
                  </HStack>
                </MotionBox>
              ))}
            </AnimatePresence>

            {history.length === 0 && (
              <Box
                textAlign="center"
                py={8}
                color={colors.haiGray}
                fontFamily="'Noto Sans JP', sans-serif"
                fontSize="sm"
              >
                まだ履歴がありません
              </Box>
            )}
          </VStack>
        </MotionBox>
      </Container>
      <Footer />
    </Box>
  );
}
