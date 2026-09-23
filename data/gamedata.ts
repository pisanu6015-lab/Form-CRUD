import { Game } from '../types/games';

export const initialGames: Game[] = [
  { id: '1', title: 'GTA V', platform: 'PC', expectedHours: 100, status: 'เล่นจบแล้ว' },
  { id: '2', title: 'Free fire', platform: 'Mobile', expectedHours: 100, status: 'กำลังเล่น' },
  { id: '3', title: 'A way out', platform: 'PC', expectedHours: 160, status: 'เล่นจบแล้ว' },
  { id: '4', title: 'V Rising', platform: 'PC', expectedHours: 60, status: 'กำลังเล่น' },
  { id: '5', title: 'Counter-Strike 2', platform: 'PC', expectedHours: 180, status: 'กำลังเล่น' },
];