import { Bell, Search, HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

export function TopBar() {
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { title: "Prova de Matemática corrigida", time: "há 5 min", type: "success" },
    { title: "3 gabaritos aguardando revisão", time: "há 20 min", type: "warning" },
    { title: "Novo aluno cadastrado: Pedro Lima", time: "há 1h", type: "info" },
    { title: "Relatório mensal gerado", time: "há 2h", type: "success" },
  ];

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center gap-4 z-10 shadow-sm">
      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar provas, alunos, habilidades..."
          className="w-full pl-9 pr-4 py-2 bg-[#F8FAFC] border border-gray-200 rounded-lg text-sm text-slate-600 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all"
        />
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Help */}
        <button className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#2563EB] hover:bg-blue-50 transition-all">
          <HelpCircle size={18} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#2563EB] hover:bg-blue-50 transition-all relative"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#0F172A]">Notificações</span>
                <span className="text-xs text-[#2563EB] cursor-pointer hover:underline">Marcar todas como lidas</span>
              </div>
              <div className="divide-y divide-gray-50">
                {notifications.map((n, i) => (
                  <div key={i} className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                          n.type === "success"
                            ? "bg-[#10B981]"
                            : n.type === "warning"
                            ? "bg-[#F59E0B]"
                            : "bg-[#2563EB]"
                        }`}
                      />
                      <div>
                        <p className="text-xs font-medium text-[#0F172A]">{n.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-gray-100 text-center">
                <span className="text-xs text-[#2563EB] cursor-pointer hover:underline">Ver todas</span>
              </div>
            </div>
          )}
        </div>

        {/* User */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center">
            <span className="text-xs font-bold text-white">MS</span>
          </div>
          <div className="hidden md:block">
            <div className="text-xs font-medium text-[#0F172A] leading-tight">Maria Silva</div>
            <div className="text-xs text-slate-400 leading-tight">Professora</div>
          </div>
          <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
        </div>
      </div>
    </header>
  );
}
