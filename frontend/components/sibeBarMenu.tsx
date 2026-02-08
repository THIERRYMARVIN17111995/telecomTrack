'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BadgeEuro,
  Briefcase,
  Building2,
  Calendar,
  Calendar1,
  ChevronDown,
  ChevronRight,
  FileText,
  Hammer,
  Home,
  Landmark,
  MapPin,
  PiggyBank,
  Receipt,
  Settings2,
  UserCog,
  Users,
  Wrench,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const [equipeMenuOpen, setEquipeMenuOpen] = useState(false);
  const [financeOpen, setFinanceOpen] = useState(true);
  const [settingOpen, setSettingOpen] = useState(true);

  // Fonctions pour vérifier si un menu parent doit être actif
  const isFinanceActive =
    pathname.startsWith("/digilogie/expenses") ||
    pathname.startsWith("/digilogie/fund-requests") ||
    pathname.startsWith("/digilogie/budget");

  const isSettingsActive =
    pathname.startsWith("/digilogie/users") ||
    pathname.startsWith("/digilogie/filiale") ||
    pathname.startsWith("/digilogie/society") ||
    pathname.startsWith("/digilogie/clients") ||
    pathname.startsWith("/digilogie/regions") ||
    pathname.startsWith("/digilogie/projet");

  return (
    <nav className="p-4 space-y-2 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 scroll-smooth">
      <style jsx>{`
        nav::-webkit-scrollbar {
          width: 8px;
        }
        nav::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 10px;
        }
        nav::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
          transition: background 0.2s;
        }
        nav::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>

      {/* Dashboard */}
      <Link
        href="/digilogie/dashboard"
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
          pathname === "/digilogie/dashboard"
            ? "bg-blue-50 text-blue-600 font-medium"
            : "text-gray-700 hover:bg-gray-50"
        }`}
      >
        <Home size={20} />
        <span>Dashboard</span>
      </Link>

       {/* Equipments */}
      <Link
        href="/digilogie/planning"
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
          pathname === "/digilogie/planning"
            ? "bg-blue-50 text-blue-600 font-medium"
            : "text-gray-700 hover:bg-gray-50"
        }`}
      >
        <Calendar1 size={20} />
        <span>Planning</span>
      </Link>

      {/* Sites */}
      <Link
        href="/digilogie/sites"
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
          pathname === "/digilogie/sites"
            ? "bg-blue-50 text-blue-600 font-medium"
            : "text-gray-700 hover:bg-gray-50"
        }`}
      >
        <MapPin size={20} />
        <span>Sites</span>
      </Link>

      {/* Teams */}
      <Link
        href="/digilogie/teams"
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
          pathname === "/digilogie/teams"
            ? "bg-blue-50 text-blue-600 font-medium"
            : "text-gray-700 hover:bg-gray-50"
        }`}
      >
        <Users size={20} />
        <span>Teams</span>
      </Link>

      {/* Installation */}
      <Link
        href="/digilogie/installation"
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
          pathname === "/digilogie/installation"
            ? "bg-blue-50 text-blue-600 font-medium"
            : "text-gray-700 hover:bg-gray-50"
        }`}
      >
        <Hammer size={20} />
        <span>Installation</span>
      </Link>

      {/* Equipments */}
      <Link
        href="/digilogie/equipment"
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
          pathname === "/digilogie/equipment"
            ? "bg-blue-50 text-blue-600 font-medium"
            : "text-gray-700 hover:bg-gray-50"
        }`}
      >
        <Wrench size={20} />
        <span>Equipments</span>
      </Link>

      {/* Finance */}
      <div>
        <button
          onClick={() => setFinanceOpen(!financeOpen)}
          className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors ${
            isFinanceActive ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center gap-3">
            <Landmark size={20} />
            <span>Finance</span>
          </div>
          {financeOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {financeOpen && (
          <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-4">
            <Link
              href="/digilogie/expenses"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                pathname === "/digilogie/expenses"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Receipt size={18} />
              <span>Expenses</span>
            </Link>

            <Link
              href="/digilogie/fund-requests"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                pathname === "/digilogie/fund-requests"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <PiggyBank size={18} />
              <span>Fund Requests</span>
            </Link>

            <Link
              href="/digilogie/budget"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                pathname === "/digilogie/budget"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <PiggyBank size={18} />
              <span>Budget</span>
            </Link>
          </div>
        )}
      </div>

      {/* Settings */}
      <div>
        <button
          onClick={() => setSettingOpen(!settingOpen)}
          className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors ${
            isSettingsActive ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center gap-3">
            <Settings2 size={20} />
            <span>Settings</span>
          </div>
          {settingOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {settingOpen && (
          <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-4">
            <Link
              href="/digilogie/users"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                pathname === "/digilogie/users"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Users size={18} />
              <span>Users</span>
            </Link>

            <Link
              href="/digilogie/filiale"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                pathname === "/digilogie/filiale"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <UserCog size={18} />
              <span>Subsidiaries</span>
            </Link>

            <Link
              href="/digilogie/society"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                pathname === "/digilogie/society"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Building2 size={18} />
              <span>Société</span>
            </Link>

            <Link
              href="/digilogie/clients"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                pathname === "/digilogie/clients"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Users size={18} />
              <span>Clients</span>
            </Link>

            <Link
              href="/digilogie/regions"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                pathname === "/digilogie/regions"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <MapPin size={18} />
              <span>Regions</span>
            </Link>

            <Link
              href="/digilogie/projet"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                pathname === "/digilogie/projet"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Briefcase size={18} />
              <span>Projects</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
