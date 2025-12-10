export interface Word {
  id: string;
  english: string;
  chinese: string;
  category: 'school' | 'nature' | 'family' | 'food';
  exampleSentence?: string;
}

export interface Accessory {
  id: string;
  name: string;
  type: 'hat' | 'glasses' | 'item';
  price: number;
  icon: string; // Emoji or SVG path identifier
}

export interface UserState {
  coins: number;
  unlockedAccessories: string[];
  equipped: {
    hat?: string;
    glasses?: string;
    item?: string;
  };
  dailyProgress: number; // 0 to 100
  learnedWords: string[];
}

export type ViewState = 'HOME' | 'FACTORY' | 'GAMES' | 'WARDROBE';
export type GameType = 'NONE' | 'ROLLING_QUIZ' | 'SLINGSHOT' | 'ELIMINATION';

export const THEME_COLORS = {
  yellow: 'bg-yellow-400',
  blue: 'bg-cyan-400',
  pink: 'bg-pink-400',
  green: 'bg-lime-400',
  purple: 'bg-purple-400',
};