'use client';

import { useState } from "react";
import { Menu, X, Bell, RadioTower, LogOut } from "lucide-react";
import { useCurrentUser, useLogout } from "@/hooks/useAuth";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: user } = useCurrentUser();
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    window.location.href = "/login"; // redirection après logout
  };

  return (
    <header className="bg-white shadow-sm h-16 flex items-center px-4 z-10 relative">
      {/* Sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Logo */}
      <h1 className="text-xl font-semibold ml-4 flex gap-2.5">
        <RadioTower /> TelecomTrack
      </h1>

      {/* Right section */}
      <div className="ml-auto flex items-center gap-4 relative">
        {/* Notifications */}
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User info */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                {user.username.slice(0, 2).toUpperCase()}
              </div>
              <span className="font-medium text-gray-700">{user.username}</span>
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-medium">
            ?
          </div>
        )}
      </div>
    </header>
  );
}
