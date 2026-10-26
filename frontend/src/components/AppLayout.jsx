import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Sidebar from './Sidebar';
import Header from './Header';

export const AppLayout = ({ onRefresh, isRefreshing }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      {/* Mobile backdrop */}
      <div
        className={`sidebar-backdrop ${sidebarOpen ? 'active' : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Main Branded Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Content Area */}
      <div className="app-main-wrapper">
        <Header
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onRefresh={onRefresh}
          isRefreshing={isRefreshing}
        />

        <main className="app-content" id="main-content">
          <Outlet />
        </main>
      </div>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#FFFFFF',
            color: '#1B1E23',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.88rem',
            border: '1px solid var(--charcoal-200)',
            boxShadow: 'var(--shadow-md)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.75rem 1rem',
          },
          success: {
            iconTheme: {
              primary: 'var(--terracotta-500)',
              secondary: '#FFFFFF',
            },
          },
          error: {
            iconTheme: {
              primary: '#BD3838',
              secondary: '#FFFFFF',
            },
          },
        }}
      />
    </div>
  );
};

export default AppLayout;
