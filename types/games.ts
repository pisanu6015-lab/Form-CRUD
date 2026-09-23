export type GameStatus = 'ยังไม่เริ่ม' | 'กำลังเล่น' | 'เล่นจบแล้ว';

export interface Game {
  id: string;
  title: string;
  platform: string;
  expectedHours: number;
  status: GameStatus;
}

export interface GameFormData {
  title: string;
  platform: string;
  expectedHours: string;
  status: GameStatus;
}