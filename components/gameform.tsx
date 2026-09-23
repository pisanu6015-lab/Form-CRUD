"use client";
import React, { useState, useEffect } from "react";
import { Game, GameFormData } from '@/types/games';

interface GameFormProps {
  editingGame: Game | null;
  onSubmit: (formData: GameFormData) => void;
  onCancel: () => void;
}

export default function GameForm({ editingGame, onSubmit, onCancel }: GameFormProps) {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const [expectedHours, setExpectedHours] = useState("");
  const [status, setStatus] = useState<Game["status"]>("ยังไม่เริ่ม");

  useEffect(() => {
    if (editingGame) {
      setTitle(editingGame.title);
      setPlatform(editingGame.platform);
      setExpectedHours(editingGame.expectedHours.toString());
      setStatus(editingGame.status);
    } else {
      setTitle("");
      setPlatform("");
      setExpectedHours("");
      setStatus("ยังไม่เริ่ม");
    }
  }, [editingGame]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !platform || !expectedHours) return;
    
    onSubmit({
      title,
      platform,
      expectedHours: Number(expectedHours),
      status,
    });

    setTitle("");
    setPlatform("");
    setExpectedHours("");
    setStatus("ยังไม่เริ่ม");
  };

  return (
    // 🟢 ปรับโครงสร้างฟอร์มให้ขาวสะอาด ขอบมนนุ่มนวล จัด Grid เรียงช่องไฟพอดีหน้าจอ
    <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm max-w-5xl mx-auto w-full text-left">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1 h-4 bg-blue-600 rounded-full"></span>
        <h2 className="text-sm font-bold text-gray-800 m-0">
          {editingGame ? "📝 แก้ไขข้อมูลเกมในคลัง" : "➕ เพิ่มเกมใหม่เข้าคลัง"}
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">ชื่อเกม</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="เช่น GTA V"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white text-gray-800 text-sm placeholder-gray-400 transition-all"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">แพลตฟอร์ม</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white text-gray-700 text-sm transition-all"
          >
            <option value="">-- เลือกแพลตฟอร์ม --</option>
            <option value="PC">PC</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
            <option value="Mobile">Mobile</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">เวลาที่คาดว่าจะใช้ (ชั่วโมง)</label>
          <input
            type="number"
            value={expectedHours}
            onChange={(e) => setExpectedHours(e.target.value)}
            placeholder="ระบุจำนวนชั่วโมง"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white text-gray-800 text-sm placeholder-gray-400 transition-all"
          />
        </div>

        <div className="flex gap-2">
          {editingGame && (
            <button
              type="button"
              onClick={onCancel}
              className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2.5 px-3 rounded-xl text-xs transition-colors cursor-pointer border-none"
            >
              ยกเลิก
            </button>
          )}
          <button
            type="submit"
            className={`${editingGame ? 'w-2/3' : 'w-full'} bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-sm transition-all cursor-pointer border-none`}
          >
            {editingGame ? "อัปเดตข้อมูล" : "บันทึกข้อมูล"}
          </button>
        </div>
      </form>
    </div>
  );
}
