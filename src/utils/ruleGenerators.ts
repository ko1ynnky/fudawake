// src/utils/ruleGenerators.ts

import { getRandomNumbers, getPotentialCards } from './helperFunctions';
import { ThreeNumbersRule, ThreeFromEachRule, SplitRule } from '@/types';
import { KIMARIJI_MAP } from './kimarijiMap'; // 追加

export const generatePositionRule = (): string[] => {
  const numbers = Array.from({ length: 10 }, (_, i) => i);
  const selectedNumbers = getRandomNumbers(numbers, 5);
  return [`${selectedNumbers.join(', ')} `];
};

export const generateThreeNumbersRule = (
  setThreeNumbersRule: (rule: ThreeNumbersRule) => void
): string[] => {
  const numbers = Array.from({ length: 10 }, (_, i) => i);
  const selectedNumbers = getRandomNumbers(numbers, 3);

  const potentialCards = getPotentialCards(selectedNumbers);
  const excludedNumber =
    potentialCards[Math.floor(Math.random() * potentialCards.length)];

  setThreeNumbersRule({ numbers: selectedNumbers, excluded: excludedNumber });
  return [
    `数字: ${selectedNumbers.join(', ')}`,
    `除外: ${excludedNumber}（${KIMARIJI_MAP[excludedNumber]}）`,
  ];
};

export const generateThreeFromEachRule = (
  setThreeFromEachRule: (rule: ThreeFromEachRule) => void
): string[] => {
  const numbers = Array.from({ length: 10 }, (_, i) => i);
  const selectedOnes = getRandomNumbers(numbers, 3);
  const selectedTens = getRandomNumbers(numbers, 3);

  const potentialCards = getPotentialCards(selectedOnes, selectedTens);
  const excludedNumber =
    potentialCards[Math.floor(Math.random() * potentialCards.length)];

  setThreeFromEachRule({
    ones: selectedOnes,
    tens: selectedTens,
    excluded: excludedNumber,
  });
  return [
    `一の位: ${selectedOnes.join(', ')}`,
    `十の位: ${selectedTens.join(', ')}`,
    `除外: ${excludedNumber}（${KIMARIJI_MAP[excludedNumber]}）`,
  ];
};

export const generateSplitRule = (
  onesCount: number,
  tensCount: number,
  setSplitRule: (rule: SplitRule) => void
): string[] => {
  const numbers = Array.from({ length: 10 }, (_, i) => i);
  const selectedOnes = getRandomNumbers(numbers, onesCount);
  const selectedTens = getRandomNumbers(numbers, tensCount);

  const potentialCards = getPotentialCards(selectedOnes, selectedTens);
  const excludedNumbers = getRandomNumbers(potentialCards, 2);

  setSplitRule({
    ones: selectedOnes,
    tens: selectedTens,
    excluded: excludedNumbers,
  });
  return [
    `一の位: ${selectedOnes.join(', ')}`,
    `十の位: ${selectedTens.join(', ')}`,
    `除外: ${excludedNumbers.map(num => `${num}（${KIMARIJI_MAP[num]}）`).join(', ')}`,
  ];
};
