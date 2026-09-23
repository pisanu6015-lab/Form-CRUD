'use client';

import Link from 'next/link';
import { Game } from '@/types/games';

interface GameCardProps {
  game: Game;
  onEdit: (game: Game) => void;
  onDelete: (id: string) => void;
}

export default function GameCard({ game, onEdit, onDelete }: GameCardProps) {
  return (
    <div
      style={{
        border: '1px solid #e2e8f0',
        borderRadius: '14px',
        padding: '20px 22px',
        marginBottom: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        gap: '20px',
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.07)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      <div style={{ minWidth: 0 }}>
        <h3 style={{ margin: '0 0 12px', fontSize: '1.2rem', fontWeight: 700 }}>
          <Link
            href={`/games/${game.id}`}
            style={{ color: '#1d4ed8', textDecoration: 'none' }}
          >
            {game.title}
          </Link>
        </h3>
        <p style={{ margin: '6px 0', color: '#475569', fontSize: '0.95rem' }}>
          <strong style={{ color: '#1e293b' }}>แพลตฟอร์ม:</strong> {game.platform}
        </p>
        <p style={{ margin: '6px 0', color: '#475569', fontSize: '0.95rem' }}>
          <strong style={{ color: '#1e293b' }}>เวลาที่คาดว่าจะใช้:</strong>{' '}
          {game.expectedHours} ชั่วโมง
        </p>
        <p style={{ margin: '10px 0 0', color: '#475569', fontSize: '0.95rem' }}>
          <strong style={{ color: '#1e293b' }}>สถานะ:</strong>{' '}
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '999px',
              fontSize: '0.85rem',
              fontWeight: 600,
              border: '1px solid',
              boxShadow: '0 2px 5px rgba(15, 23, 42, 0.08)',
              backgroundColor:
                game.status === 'เล่นจบแล้ว'
                  ? '#e6fffa'
                  : game.status === 'กำลังเล่น'
                  ? '#fff7ed'
                  : '#f8fafc',
              color:
                game.status === 'เล่นจบแล้ว'
                  ? '#234e52'
                  : game.status === 'กำลังเล่น'
                  ? '#744210'
                  : '#2d3748',
              borderColor:
                game.status === 'เล่นจบแล้ว'
                  ? '#81e6d9'
                  : game.status === 'กำลังเล่น'
                  ? '#fdba74'
                  : '#cbd5e1',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor:
                  game.status === 'เล่นจบแล้ว'
                    ? '#38b2ac'
                    : game.status === 'กำลังเล่น'
                    ? '#f97316'
                    : '#94a3b8',
                boxShadow: '0 0 0 3px rgba(148,163,184,0.15)',
              }}
            />
            {game.status}
          </span>
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
        <button
          onClick={() => onEdit(game)}
          style={{
            padding: '9px 16px',
            backgroundColor: '#f59e0b',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 600,
            boxShadow: '0 3px 8px rgba(245, 158, 11, 0.25)',
          }}
        >
          แก้ไข
        </button>
        <button
          onClick={() => onDelete(game.id)}
          style={{
            padding: '9px 16px',
            backgroundColor: '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 600,
            boxShadow: '0 3px 8px rgba(239, 68, 68, 0.25)',
          }}
        >
          ลบ
        </button>
      </div>
    </div>
  );
}