export interface RulePosition {
  label: string;
  key: string;
  type:
    | 'position'
    | 'threeNumbers'
    | 'threeFromEach'
    | 'fourTwoSplit'
    | 'twoFourSplit';
}

export interface SelectedPositions {
  [key: string]: boolean;
}

export interface ThreeNumbersRule {
  numbers: number[];
  excluded: number;
}

export interface ThreeFromEachRule {
  ones: number[];
  tens: number[];
  excluded: number;
}

export interface SplitRule {
  ones: number[];
  tens: number[];
  excluded: number[];
}

export const RULE_POSITIONS: RulePosition[] = [
  { label: '一の位', key: 'ones', type: 'position' },
  { label: '十の位', key: 'tens', type: 'position' },
  { label: '数字3つ', key: 'threeNumbers', type: 'threeNumbers' },
  {
    label: '一の位から3つ、十の位から3つ',
    key: 'threeFromEach',
    type: 'threeFromEach',
  },
  {
    label: '一の位から4つ、十の位から2つ',
    key: 'fourTwoSplit',
    type: 'fourTwoSplit',
  },
  {
    label: '一の位から2つ、十の位から4つ',
    key: 'twoFourSplit',
    type: 'twoFourSplit',
  },
];

export interface HistoryItem {
  id: string;
  description: string[];
}
