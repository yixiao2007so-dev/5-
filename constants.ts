import { Word, Accessory } from './types';

export const WORD_LIST: Word[] = [
  { id: '1', english: 'Library', chinese: '图书馆', category: 'school', exampleSentence: 'We read books in the library.' },
  { id: '2', english: 'Playground', chinese: '操场', category: 'school', exampleSentence: 'The playground is fun.' },
  { id: '3', english: 'Teacher', chinese: '老师', category: 'school', exampleSentence: 'My teacher is kind.' },
  { id: '4', english: 'Mountain', chinese: '山', category: 'nature' },
  { id: '5', english: 'River', chinese: '河流', category: 'nature' },
  { id: '6', english: 'Flower', chinese: '花', category: 'nature' },
  { id: '7', english: 'Breakfast', chinese: '早餐', category: 'food' },
  { id: '8', english: 'Delicious', chinese: '美味的', category: 'food' },
  { id: '9', english: 'Vegetable', chinese: '蔬菜', category: 'food' },
  { id: '10', english: 'Parents', chinese: '父母', category: 'family' },
  { id: '11', english: 'Sister', chinese: '姐妹', category: 'family' },
  { id: '12', english: 'Homework', chinese: '家庭作业', category: 'school' },
  { id: '13', english: 'Science', chinese: '科学', category: 'school' },
  { id: '14', english: 'Forest', chinese: '森林', category: 'nature' },
  { id: '15', english: 'Ocean', chinese: '海洋', category: 'nature' },
];

export const ACCESSORIES: Accessory[] = [
  { id: 'hat_cap', name: 'Cool Cap', type: 'hat', price: 50, icon: '🧢' },
  { id: 'hat_crown', name: 'Golden Crown', type: 'hat', price: 200, icon: '👑' },
  { id: 'hat_party', name: 'Party Hat', type: 'hat', price: 20, icon: '🎉' },
  { id: 'glasses_sun', name: 'Sunnies', type: 'glasses', price: 40, icon: '🕶️' },
  { id: 'glasses_geek', name: 'Smart Specs', type: 'glasses', price: 60, icon: '👓' },
  { id: 'item_sword', name: 'Toy Sword', type: 'item', price: 100, icon: '🗡️' },
  { id: 'item_wand', name: 'Magic Wand', type: 'item', price: 150, icon: '🪄' },
  { id: 'item_balloon', name: 'Red Balloon', type: 'item', price: 30, icon: '🎈' },
];