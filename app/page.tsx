import React from 'react';

export default function HomePage() {
  return (
    <div className="page">
      <h1>CSMJU Website</h1>
      <p>สถานะระบบ: เปิดใช้งาน</p>
      
      <div className="badge-group">
        <span className="badge">HTML</span>
        <span className="badge">CSS</span>
        <span className="badge">TypeScript</span>
        <span className="badge">Next.js</span>
      </div>
    </div>
  );
}
