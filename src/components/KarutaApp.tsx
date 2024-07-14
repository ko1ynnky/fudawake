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
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
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
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handlePositionChange = (key: string) => {
    setSelectedPositions((prev) => {
      const newState = {
        ...prev,
        [key]: !prev[key],
      };
      console.log('Updated selectedPositions:', newState);
      return newState;
    });
  };

  const generateRandomRule = useCallback(() => {
    console.log('Current selectedPositions:', selectedPositions);
    const availablePositions = RULE_POSITIONS.filter(
      (position) => selectedPositions[position.key]
    );

    if (availablePositions.length === 0) {
      setRuleDescription(['ルールを選択してください']);
      return;
    }

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

    setRuleDescription(newRuleDescription);

    // 履歴に追加
    setHistory((prevHistory) => {
      const newHistory = [
        { id: Date.now().toString(), description: newRuleDescription },
        ...prevHistory,
      ];
      return newHistory.slice(0, 10); // 最大10件を保持
    });
  }, [selectedPositions]);

  const deleteHistoryItem = (id: string) => {
    setHistory((prevHistory) => prevHistory.filter((item) => item.id !== id));
  };

  useEffect(() => {
    console.log('selectedPositions changed:', selectedPositions);
  }, [selectedPositions]);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box as="main" p={4} flex={1}>
        <VStack spacing={4} align="stretch">
          <Heading as="h1" size="xl">
            札分け
          </Heading>

          <VStack spacing={2} align="stretch">
            <Heading as="h2" size="md" mb={2}>
              使用するルール
            </Heading>

            {RULE_POSITIONS.map((position) => (
              <Checkbox
                key={position.key}
                isChecked={selectedPositions[position.key]}
                onChange={() => handlePositionChange(position.key)}
                colorScheme="green"
              >
                {position.label}
              </Checkbox>
            ))}

            <Button
              onClick={generateRandomRule}
              colorScheme="green"
              mt={4}
              isDisabled={Object.values(selectedPositions).every((v) => !v)}
            >
              札分けを決める！
            </Button>
            {ruleDescription.length > 0 && (
              <VStack align="stretch" mt={2}>
                <Text fontWeight="bold">現在のルール:</Text>
                {ruleDescription.map((line, index) => (
                  <Text key={index}>{line}</Text>
                ))}
              </VStack>
            )}
          </VStack>

          <VStack spacing={2} align="stretch">
            <Heading as="h2" size="md" mb={2}>
              生成履歴
            </Heading>
            {history.map((item, index) => (
              <HStack
                key={item.id}
                justify="space-between"
                p={2}
                bg="gray.100"
                borderRadius="md"
              >
                <VStack align="start" spacing={0}>
                  <Text fontWeight="bold">
                    ルール {history.length - index}:
                  </Text>
                  {item.description.map((line, lineIndex) => (
                    <Text key={lineIndex}>{line}</Text>
                  ))}
                </VStack>
                <IconButton
                  aria-label="履歴を削除"
                  icon={<DeleteIcon />}
                  onClick={() => deleteHistoryItem(item.id)}
                  size="sm"
                />
              </HStack>
            ))}
          </VStack>
        </VStack>
      </Box>
      <Footer />
    </Box>
  );
}
