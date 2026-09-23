'use client';

import { useState } from 'react';
import { Game, GameFormData } from '@/types/games';
import { initialGames } from '@/data/gamedata';
import GameExplorer from '@/components/gameExplorer';

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [editingGame, setEditingGame] = useState<Game | null>(null);

  const handleFormSubmit = (formData: GameFormData) => {
    if (editingGame) {
      setGames((prev) =>
        prev.map((item) =>
          item.id === editingGame.id
            ? {
                ...formData,
                id: editingGame.id,
                expectedHours: Number(formData.expectedHours),
              }
            : item
        )
      );
      setEditingGame(null);
    } else {
      const newGame: Game = {
        id: Date.now().toString(),
        ...formData,
        expectedHours: Number(formData.expectedHours),
      };
      setGames((prev) => [...prev, newGame]);
    }
  };

  const handleEdit = (game: Game) => {
    setEditingGame(game);
  };

  const handleDelete = (id: string) => {
    setGames((prev) => prev.filter((game) => game.id !== id));
    if (editingGame?.id === id) {
      setEditingGame(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingGame(null);
  };

  return (
    // 🟢 สวมคลาส .page เพื่อคุมหน้ากว้างให้เท่ากับหน้าวิชาเรียน ไม่ลีบแบน
    <div className="page">
      <GameExplorer
        games={games}
        editingGame={editingGame}
        onFormSubmit={handleFormSubmit}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCancelEdit={handleCancelEdit}
      />
    </div>
  );
}
