"use client";
import React from "react";
import { Game } from '@/types/games';

interface GameCardProps {
  game: Game;
  onDelete: (id: string) => void;
  onEdit: (game: Game) => void;
}

export default function GameCard({ game, onDelete, onEdit }: GameCardProps) {
  const getStatusColor = (status: Game["status"]) => {
    switch (status) {
      case "เล่นจบแล้ว":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold";
      case "กำลังเล่น":
        return "bg-amber-50 text-amber-700 border-amber-200 font-semibold";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200 font-semibold";
    }
  };

  return (
    // 🟢 1. ลดความสูงของการ์ดจาก 230px เหลือ h-auto (ยืดหดตามเนื้อหาจริง) เพื่อกำจัดพื้นที่ว่างโล่งที่เยอะเกินไปออก
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-blue-400/60 transition-all duration-300 flex flex-col justify-between h-auto min-h-[180px] text-left">
      
      {/* ส่วนบน: ชื่อเกมและสถานะ */}
      <div className="w-full mb-3">
        <div className="flex items-start justify-between gap-3 w-full">
          <h3 className="text-base font-bold text-gray-800 line-clamp-2 leading-snug m-0">
            {game.title}
          </h3>
          <span className={`px-2 py-0.5 rounded-full text-[10px] border flex-shrink-0 ${getStatusColor(game.status)}`}>
            ● {game.status}
          </span>
        </div>
      </div>

      {/* 🟢 2. ส่วนกลาง: ลบการล็อกความกว้าง (w-[85px]) ออก เพื่อแก้ปัญหาตัวหนังสือไทยหลุดกรอบ 
          และปรับใช้ gap-1 เพื่อให้ข้อความแต่ละบรรทัดอยู่ชิดกัน ไม่ห่างกันจนเกินไป */}
      <div className="border-t border-b border-gray-100 py-3 my-2 flex-1 flex flex-col justify-start items-start text-left w-full gap-1.5">
        
        {/* แพลตฟอร์ม - ตัวหนังสือภาษาไทยเรียงตามธรรมชาติ ไม่โดนบีบหลุดขอบ */}
        <div className="text-xs md:text-sm text-gray-600 m-0 p-0 flex items-center justify-start text-left gap-2 w-full">
          <span className="font-semibold text-gray-400 flex-shrink-0">แพลตฟอร์ม:</span> 
          <span className="bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-md text-[11px] font-bold inline-block">
            {game.platform}
          </span>
        </div>
        
        {/* เวลาที่คาดไว้ - เรียงชิดขัดเจนอยู่ข้างๆ กันอย่างสมส่วน */}
        <div className="text-xs md:text-sm text-gray-600 m-0 p-0 flex items-center justify-start text-left gap-2 w-full">
          <span className="font-semibold text-gray-400 flex-shrink-0">เวลาที่คาดไว้:</span> 
          <span className="text-gray-800 font-extrabold inline-block">
            {game.expectedHours} <span className="text-gray-400 font-normal text-xs">ชั่วโมง</span>
          </span>
        </div>
        
      </div>

      {/* 🟢 3. ส่วนล่าง: ปรับปุ่มให้ลอยตัวและมี Padding บน-ล่างพอเหมาะ กระชับเข้าคู่กับการ์ดรูปแบบใหม่ */}
      <div className="flex gap-2 pt-1 w-full mt-2">
        <button
          onClick={() => onEdit(game)}
          className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-1.5 rounded-xl text-xs shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1 border-none transform active:scale-95"
        >
          <svg xmlns="http://w3.org" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
            <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10a.75.75 0 000-1.5H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75 7.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
          </svg>
          แก้ไข
        </button>
        
        <button
          onClick={() => onDelete(game.id)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-1.5 rounded-xl text-xs shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1 border-none transform active:scale-95"
        >
          <svg xmlns="http://w3.org" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
            <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM7.5 3.75A1.25 1.25 0 018.75 2.5h2.5A1.25 1.25 0 0112.5 3.75v.4c-.833-.042-1.666-.062-2.5-.062s-1.667.02-2.5.062v-.4zm3.5 4a.75.75 0 10-1.5 0v7a.75.75 0 001.5 0v-7zm-3.25.75a.75.75 0 00-.75.75v6a.75.75 0 001.5 0v-6a.75.75 0 00-.75-.75z" clipRule="evenodd" />
          </svg>
          ลบออก
        </button>
      </div>

    </div>
  );
}
