'use client';

import { useState } from 'react';
import TravelLogForm from './TravelLogForm';

export default function TravelLogSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSideBar = () => setSidebarOpen(false);

  return (
    <>
      <div className="fixed top-2 right-2 z-[999]">
        <button onClick={() => setSidebarOpen(true)} className="btn btn-info">
          Add Travel Log
        </button>
      </div>
      {sidebarOpen && (
        <div className="fixed h-full top-0 right-0 p-4 w-80 bg-base-100 text-base-content z-[999] overflow-y-auto">
          <TravelLogForm onCancel={closeSideBar} onComplete={closeSideBar} />
        </div>
      )}
    </>
  );
}
