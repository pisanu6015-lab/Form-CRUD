'use client';

import { useState } from 'react';
import { Game, GameFormData } from '@/types/games';
import { initialGames } from '@/data/gamedata';
import GameForm from '@/components/gameform';
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
    <main
      style={{
        minHeight: '100vh',
        padding: '48px 20px',
        background: '#f3f6fb',
        color: '#172033',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <header
          style={{
            marginBottom: '28px',
            padding: '32px',
            borderRadius: '18px',
            background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
            color: '#fff',
            boxShadow: '0 12px 28px rgba(37, 99, 235, 0.2)',
          }}
        >
          <p
            style={{
              margin: '0 0 8px',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              opacity: 0.8,
            }}
          >
            Personal collection
          </p>
          <h1 style={{ margin: 0, fontSize: 'clamp(28px, 5vw, 40px)', lineHeight: 1.15 }}>
            Game Backlog
          </h1>
          <p style={{ margin: '12px 0 0', fontSize: '15px', opacity: 0.9 }}>
            จัดการเกมที่อยากเล่นและติดตามรายการของคุณได้ในที่เดียว
          </p>
        </header>

        <section
          style={{
            marginBottom: '24px',
            padding: '24px',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            background: '#fff',
            boxShadow: '0 5px 18px rgba(15, 23, 42, 0.06)',
          }}
        >
          <GameForm
            editingGame={editingGame}
            onSubmit={handleFormSubmit}
            onCancel={handleCancelEdit}
          />
        </section>

        <section
          style={{
            padding: '24px',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            background: '#fff',
            boxShadow: '0 5px 18px rgba(15, 23, 42, 0.06)',
          }}
        >
          <GameExplorer
            games={games}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>
      </div>
    </main>
  );
}