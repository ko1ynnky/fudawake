// src/utils/helperFunctions.ts

export const getRandomNumbers = (
  numbers: number[],
  count: number
): number[] => {
  const result: number[] = [];
  const tempNumbers = [...numbers];
  while (result.length < count) {
    const index = Math.floor(Math.random() * tempNumbers.length);
    result.push(tempNumbers[index]);
    tempNumbers.splice(index, 1);
  }
  return result.sort((a, b) => a - b);
};

export const getPotentialCards = (
  ones: number[],
  tens?: number[]
): number[] => {
  const TOTAL_CARDS = 100;
  return Array.from({ length: TOTAL_CARDS }, (_, i) => {
    const num = i === 99 ? 0 : i + 1;
    const numOnes = num % 10;
    const numTens = Math.floor(num / 10);
    return ones.includes(numOnes) || (tens && tens.includes(numTens))
      ? num
      : null;
  }).filter((num) => num !== null) as number[];
};
