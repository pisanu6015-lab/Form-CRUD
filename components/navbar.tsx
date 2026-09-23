import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="siteHeader">
      <div className="navbar">
        <ul className="navList">
          <li><Link href="/" className="navLink">หน้าแรก</Link></li>
          <li><Link href="/course" className="navLink">หลักสูตร</Link></li>
          <li><Link href="/about" className="navLink">เกี่ยวกับเรา</Link></li>
          <li><Link href="/game" className="navLink">เกม</Link></li>
        </ul>
      </div>
    </nav>
  );
}
