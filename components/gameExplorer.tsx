'use client';

import { Game } from '@/types/games';
import GameCard from '@/components/gamecard';

interface GameExplorerProps {
  games: Game[];
  onEdit: (game: Game) => void;
  onDelete: (id: string) => void;
}

export default function GameExplorer({
  games,
  onEdit,
  onDelete,
}: GameExplorerProps) {
  return (
    <div>
      <h2>รายการเกมทั้งหมด ({games.length} รายการ)</h2>
      {games.length === 0 ? (
        <p style={{ color: '#888' }}>ไม่มีรายการเกมใน Backlog</p>
      ) : (
        <div>
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}