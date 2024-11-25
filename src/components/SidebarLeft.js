import React from "react";

const SidebarLeft = () => {
  return (
    <div className="sidebar-left">
  <ul>
    <li>
      <span className="icon">🏠</span> Home
    </li>
    <li>
      <span className="icon">🔍</span> Search
    </li>
    <li>
      <span className="icon">🔔</span> Notifications
    </li>
    <li>
      <span className="icon">📰</span> News
    </li>
    <li>
      <span className="icon">👤</span> Profile
    </li>
    <li>
      <span className="icon">⚙️</span> Other
    </li>
  </ul>

  <button className="post-button">Post</button>
</div>

  );
};

export default SidebarLeft;
