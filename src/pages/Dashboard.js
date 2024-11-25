import React from 'react';
import SidebarLeft from '../components/SidebarLeft';
import SidebarRight from '../components/SidebarRight';
import '../';


export default function DashboardPage() {
  return (
    <div className="dashboard-layout">
      {/* Sidebar Kiri */}
      <div className="sidebar-left">
        <SidebarLeft />
      </div>

      {/* Konten Utama */}
      <div className="main-content">
        <div className="dashboard-header">
          <h1>What's Happening Now</h1>
        </div>
        <div className="dashboard-feed">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="feed-card" key={index}>
              <p>by User{index + 1}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Kanan */}
      <div className="sidebar-right">
        <SidebarRight />
      </div>
    </div>
  );
}
