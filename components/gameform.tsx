'use client';

import { useState, useEffect } from 'react';
import { Game, GameFormData } from '@/types/games';

interface GameFormProps {
  editingGame: Game | null;
  onSubmit: (data: GameFormData) => void;
  onCancel: () => void;
}

export default function GameForm({
  editingGame,
  onSubmit,
  onCancel,
}: GameFormProps) {
  // ข้อ 18: เก็บทุกฟิลด์ไว้ใน State ก้อนเดียว
  const [formData, setFormData] = useState<GameFormData>({
    title: '',
    platform: '',
    expectedHours: '',
    status: 'ยังไม่เริ่ม',
  });

  // ข้อ 20: ข้อความแจ้งเตือนใต้ฟิลด์ที่ไม่ผ่านการตรวจสอบ
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // ข้อ 21: เมื่อมีการกดแก้ไข นำค่าเดิมกลับเข้าฟอร์ม
  useEffect(() => {
    if (editingGame) {
      setFormData({
        title: editingGame.title,
        platform: editingGame.platform,
        expectedHours: editingGame.expectedHours.toString(),
        status: editingGame.status,
      });
      setErrors({});
    } else {
      setFormData({
        title: '',
        platform: '',
        expectedHours: '',
        status: 'ยังไม่เริ่ม',
      });
      setErrors({});
    }
  }, [editingGame]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ข้อ 19: ตรวจสอบความถูกต้องก่อนบันทึก
  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = 'กรุณากรอกชื่อเกม';
    }

    if (!formData.platform.trim()) {
      newErrors.platform = 'กรุณาเลือกแพลตฟอร์ม';
    }

    const hours = Number(formData.expectedHours);
    if (
      !formData.expectedHours ||
      isNaN(hours) ||
      hours <= 0 ||
      !Number.isInteger(hours)
    ) {
      newErrors.expectedHours = 'จำนวนชั่วโมงต้องเป็นจำนวนเต็มบวก';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit(formData);

    // รีเซ็ตฟอร์มหลังบันทึก
    setFormData({
      title: '',
      platform: '',
      expectedHours: '',
      status: 'ยังไม่เริ่ม',
    });
    setErrors({});
  };

  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        marginBottom: '32px',
      }}
    >
      <h2 style={{ marginTop: 0 }}>
        {editingGame ? 'แก้ไขข้อมูลเกม' : 'เพิ่มเกมใหม่'}
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        {/* ชื่อเกม */}
        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>
            ชื่อเกม:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          {errors.title && (
            <p style={{ color: 'red', margin: '4px 0 0', fontSize: '0.9rem' }}>
              {errors.title}
            </p>
          )}
        </div>

        {/* แพลตฟอร์ม */}
        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>
            แพลตฟอร์ม:
          </label>
          <select
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          >
            <option value="">-- เลือกแพลตฟอร์ม --</option>
            <option value="PC">PC</option>
            <option value="PlayStation 5">PlayStation 5</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
            <option value="Xbox Series X">Xbox Series X</option>
          </select>
          {errors.platform && (
            <p style={{ color: 'red', margin: '4px 0 0', fontSize: '0.9rem' }}>
              {errors.platform}
            </p>
          )}
        </div>

        {/* จำนวนชั่วโมง */}
        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>
            จำนวนชั่วโมงที่คาดว่าจะใช้เล่น:
          </label>
          <input
            type="number"
            name="expectedHours"
            value={formData.expectedHours}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          {errors.expectedHours && (
            <p style={{ color: 'red', margin: '4px 0 0', fontSize: '0.9rem' }}>
              {errors.expectedHours}
            </p>
          )}
        </div>

        {/* สถานะ */}
        <div>
          <label style={{ display: 'block', marginBottom: '4px' }}>
            สถานะ:
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          >
            <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
            <option value="กำลังเล่น">กำลังเล่น</option>
            <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
          </select>
        </div>

        {/* ปุ่ม Submit/Cancel */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="submit"
            style={{
              padding: '10px 16px',
              backgroundColor: editingGame ? '#ffc107' : '#28a745',
              color: editingGame ? '#000' : '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            {editingGame ? 'บันทึกการแก้ไข' : 'เพิ่มเกม'}
          </button>

          {editingGame && (
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: '10px 16px',
                backgroundColor: '#6c757d',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              ยกเลิก
            </button>
          )}
        </div>
      </form>
    </div>
  );
}