import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Sidebar from "../pages/SidebarPage";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-800 transition-colors dark:bg-gray-900 dark:text-gray-100">
      <Header />

      {/* Content layout with sidebar */}
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar />
        <main className="relative flex-1 overflow-hidden bg-[radial-gradient(circle_at_center,_#fbfefb,_#f0fbf0)] bg-fixed p-1 dark:bg-[radial-gradient(circle_at_center,_#1f2937,_#0f172a)]">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}
