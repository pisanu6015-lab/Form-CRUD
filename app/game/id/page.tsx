import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { initialGames } from '@/data/gamedata';

interface Props {
  params: Promise<{ id: string }>;
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const game = initialGames.find((g) => g.id === id);

  if (!game) {
    return { title: 'Game Not Found' };
  }

  return {
    title: game.title,
  };
}


export default async function GameDetailPage({ params }: Props) {
  const { id } = await params;
  const game = initialGames.find((g) => g.id === id);

  
  if (!game) {
    notFound();
  }

  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
      <Link href="/games" style={{ color: '#0070f3', textDecoration: 'none' }}>
        ← กลับหน้า รายการเกม
      </Link>

      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '24px',
          marginTop: '16px',
          backgroundColor: '#fff',
        }}
      >
        <h1 style={{ marginTop: 0 }}>{game.title}</h1>
        <p><strong>แพลตฟอร์ม:</strong> {game.platform}</p>
        <p><strong>เวลาที่คาดว่าจะใช้เล่น:</strong> {game.expectedHours} ชั่วโมง</p>
        <p><strong>สถานะ:</strong> {game.status}</p>
      </div>
    </div>
  );
}