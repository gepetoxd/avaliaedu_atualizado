import { NavLink, useLocation } from "react-router";
import {
  LayoutDashboard,
  BookOpen,
  Target,
  FileText,
  Library,
  ScanLine,
  CheckSquare,
  BarChart3,
  Users,
  School,
  Building2,
  ShieldCheck,
  UserCog,
  Settings,
  ChevronRight,
  GraduationCap,
  LogOut,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/app/dashboard" },
  { label: "Banco de Questões", icon: BookOpen, path: "/app/question-bank" },
  { label: "Habilidades (SAEB/SPAECE)", icon: Target, path: "/app/skills" },
  { label: "Gerador de Provas", icon: FileText, path: "/app/exam-generator" },
  { label: "Biblioteca de Provas", icon: Library, path: "/app/exam-library" },
  { label: "Escanear Provas", icon: ScanLine, path: "/app/scan-exams" },
  { label: "Resultados de Correção", icon: CheckSquare, path: "/app/correction-results" },
  { label: "Relatórios", icon: BarChart3, path: "/app/analytics" },
  { label: "Alunos", icon: Users, path: "/app/students" },
  { label: "Turmas", icon: GraduationCap, path: "/app/classes" },
  { label: "Escolas", icon: School, path: "/app/schools" },
  { label: "Painel Admin", icon: ShieldCheck, path: "/app/admin" },
  { label: "Gerenciar Usuários", icon: UserCog, path: "/app/users" },
  { label: "Configurações", icon: Settings, path: "/app/settings" },
];

export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`flex flex-col bg-[#0F172A] text-white transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } min-h-screen flex-shrink-0`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center flex-shrink-0">
          <GraduationCap size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <div className="text-sm font-bold text-white leading-tight">AvaliaEdu</div>
            <div className="text-xs text-blue-300 leading-tight">Avaliação Educacional</div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-slate-400 hover:text-white transition-colors"
        >
          <ChevronRight
            size={16}
            className={`transition-transform duration-300 ${collapsed ? "" : "rotate-180"}`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto scrollbar-thin">
        <div className="space-y-0.5 px-2">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path === "/app/dashboard" && location.pathname === "/app");
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group ${
                  isActive
                    ? "bg-[#2563EB] text-white"
                    : "text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon size={18} className="flex-shrink-0" />
                {!collapsed && (
                  <span className="truncate leading-tight">{item.label}</span>
                )}
                {isActive && !collapsed && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className="border-t border-white/10 p-3">
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-white">MS</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-white truncate">Maria Silva</div>
              <div className="text-xs text-slate-400 truncate">Professora</div>
            </div>
          )}
          {!collapsed && (
            <NavLink to="/" className="text-slate-400 hover:text-white transition-colors">
              <LogOut size={15} />
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}
