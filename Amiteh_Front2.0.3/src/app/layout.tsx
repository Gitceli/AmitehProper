import * as React from 'react'; 
import { Outlet } from 'react-router-dom';
import NavMenu from '@/assets/myComponents/NavMenuFull';
import Footer from '@/assets/myComponents/Footer';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavMenu />
      <main className="flex-grow electronic-pattern overflow-y-auto relative">
        <Outlet />
      </main>
      <Footer />
      <style>{`
        .electronic-pattern {
          background-image: 
            linear-gradient(to right, rgba(0,128,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,128,255,0.1) 1px, transparent 1px),
            radial-gradient(circle at 4px 4px, rgba(255,0,0,0.15) 2px, transparent 2px),
            linear-gradient(to right, rgba(0,255,0,0.05) 2px, transparent 2px),
            linear-gradient(to bottom, rgba(0,255,0,0.05) 2px, transparent 2px),
            linear-gradient(135deg, #0080ff05 25%, transparent 25%),
            linear-gradient(225deg, #0080ff05 25%, transparent 25%),
            linear-gradient(315deg, #0080ff05 25%, transparent 25%),
            linear-gradient(45deg, #0080ff05 25%, transparent 25%);
          background-size: 
            20px 20px,
            20px 20px,
            40px 40px,
            100px 100px,
            100px 100px,
            40px 40px,
            40px 40px,
            40px 40px,
            40px 40px;
          background-position: 
            0 0,
            0 0,
            0 0,
            0 0,
            0 0,
            0 0,
            20px 20px,
            20px 20px,
            0 0;
          animation: moveBackground 60s linear infinite;
          height: 100%; /* Ensure full height for background */
        }

        @keyframes moveBackground {
          0% {
            background-position: 
              0 0,
              0 0,
              0 0,
              0 0,
              0 0,
              0 0,
              20px 20px,
              20px 20px,
              0 0;
          }
          100% {
            background-position: 
              20px 0,
              0 20px,
              40px 40px,
              100px 0,
              0 100px,
              40px 40px,
              60px 60px,
              60px 60px,
              40px 40px;
          }
        }
      `}</style>
    </div>
  );
}
