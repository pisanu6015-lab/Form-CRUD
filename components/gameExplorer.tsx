"use client";
import React from "react";
import GameForm from "./gameform";
import GameCard from "./gamecard";
import { Game, GameFormData } from '@/types/games';

interface GameExplorerProps {
  games: Game[];
  editingGame: Game | null;
  onFormSubmit: (formData: GameFormData) => void;
  onEdit: (game: Game) => void;
  onDelete: (id: string) => void;
  onCancelEdit: () => void;
}

export default function GameExplorer({
  games,
  editingGame,
  onFormSubmit,
  onEdit,
  onDelete,
  onCancelEdit
}: GameExplorerProps) {
  
  // คำนวณสถิติเกมแบบน่ารักๆ เอาไว้แสดงที่แบนเนอร์ใหม่
  const completedGames = games.filter(g => g.status === "เล่นจบแล้ว").length;
  const playingGames = games.filter(g => g.status === "กำลังเล่น").length;

  return (
    <div className="max-w-5xl mx-auto px-4 w-full space-y-8">
      
      {/* 🟢 ดีไซน์แบนเนอร์ใหม่แบบโปร่งตา คลีนมินิมอล มีกล่องสรุปสถิติด้านขวา */}
      <div className="bg-white border border-gray-150 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
        <div className="text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-5 bg-[--primary] rounded-full inline-block"></span>
            <h1 className="text-2xl font-black text-gray-800 m-0 p-0 tracking-tight">Game Backlog</h1>
          </div>
          <p className="text-xs text-gray-400 mt-1 m-0">คลังสะสมและบันทึกข้อมูลเกมน่าเล่นส่วนตัวของคุณ</p>
        </div>

        {/* มินิแดชบอร์ดแสดงผลรวมเกม */}
        <div className="flex gap-3 text-left w-full md:w-auto">
          <div className="bg-slate-50 border border-gray-100 px-4 py-2 rounded-xl flex-1 md:flex-initial min-w-[90px]">
            <p className="text-[10px] font-bold text-gray-400 m-0 uppercase tracking-wider">ทั้งหมด</p>
            <p className="text-lg font-black text-slate-700 m-0 leading-tight">{games.length}</p>
          </div>
          <div className="bg-amber-50/50 border border-amber-100 px-4 py-2 rounded-xl flex-1 md:flex-initial min-w-[90px]">
            <p className="text-[10px] font-bold text-amber-500 m-0 uppercase tracking-wider">กำลังเล่น</p>
            <p className="text-lg font-black text-amber-600 m-0 leading-tight">{playingGames}</p>
          </div>
          <div className="bg-emerald-50/50 border border-emerald-100 px-4 py-2 rounded-xl flex-1 md:flex-initial min-w-[90px]">
            <p className="text-[10px] font-bold text-emerald-500 m-0 uppercase tracking-wider">จบแล้ว</p>
            <p className="text-lg font-black text-emerald-600 m-0 leading-tight">{completedGames}</p>
          </div>
        </div>
      </div>

      {/* ฟอร์มกรอกข้อมูลเพิ่มเกม */}
      <GameForm 
        editingGame={editingGame}
        onSubmit={onFormSubmit}
        onCancel={onCancelEdit}
      />

      {/* ส่วนแสดงรายการเกม */}
      <div className="space-y-4 w-full">
        <div className="px-1 text-left">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            My Collection ({games.length})
          </h2>
        </div>
        
        {/* 🟢 เปลี่ยนระนาบการจัดเรียงจากแนวตั้งแถวยาว เป็นระบบ Grid แผ่ออกซ้าย-ขวาอย่างสวยงาม */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {games.map((game) => (
            <GameCard 
              key={game.id} 
              game={game} 
              onDelete={onDelete} 
              onEdit={onEdit} 
            />
          ))}
        </div>
      </div>

    </div>
  );
}
