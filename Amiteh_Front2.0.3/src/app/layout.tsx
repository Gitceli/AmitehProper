// app/layout.tsx
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import NavMenu from '@/assets/myComponents/NavMenuFull';
import Footer from '@/assets/myComponents/Footer';

export default function Layout() {
  return (
    <div className="flex flex-col h-screen">
      {/* permanently on top */}
      <div className="sticky top-0 z-[50] bg-white shadow-md">
        <NavMenu />
      </div>

      {/* everything scrolls here */}
      <div className="flex flex-col  min-h-screen">
      <main className="flex-grow overflow-y-auto min-h-0 electronic-pattern">
        <Outlet />
      <Footer className=" mt-auto" />
      </main>
      </div>

      <style>{`
        .electronic-pattern {
          /* your grid background */
          background-image:
            linear-gradient(to right, rgba(0,128,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,128,255,0.1) 1px, transparent 1px),
            radial-gradient(circle at 4px 4px, rgba(255,0,0,0.15) 2px, transparent 2px),
            linear-gradient(135deg, #0080ff05 25%, transparent 25%),
            linear-gradient(225deg, #0080ff05 25%, transparent 25%);
          background-size:
            20px 20px,
            20px 20px,
            40px 40px,
            40px 40px,
            40px 40px;
          animation: moveBackground 60s linear infinite;
        }
        @keyframes moveBackground {
          to { background-position: 40px 0, 0 40px, 80px 80px, 80px 80px, 80px 80px; }
        }
      `}</style>
    </div>
  );
}
