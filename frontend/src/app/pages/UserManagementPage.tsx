import { useState } from "react";
import { Plus, Search, Edit3, Trash2, Shield, User, UserCog, MoreHorizontal, Mail, Building2 } from "lucide-react";

const users = [
  { id: "U001", name: "Maria Silva", email: "maria.silva@sme.ce.gov.br", role: "Professor", school: "E.M. Rui Barbosa", status: "Ativo", lastLogin: "Hoje, 09:12", avatar: "MS" },
  { id: "U002", name: "João Ferreira", email: "joao.ferreira@sme.ce.gov.br", role: "Professor", school: "E.M. Rui Barbosa", status: "Ativo", lastLogin: "Hoje, 08:45", avatar: "JF" },
  { id: "U003", name: "Carlos Alberto", email: "carlos.alberto@sme.ce.gov.br", role: "Diretor", school: "E.M. Rui Barbosa", status: "Ativo", lastLogin: "Ontem", avatar: "CA" },
  { id: "U004", name: "Sandra Moura", email: "sandra.moura@sme.ce.gov.br", role: "Diretor", school: "E.M. Tiradentes", status: "Ativo", lastLogin: "Há 2 dias", avatar: "SM" },
  { id: "U005", name: "Ana Lima", email: "ana.lima@sme.ce.gov.br", role: "Professor", school: "E.M. Tiradentes", status: "Ativo", lastLogin: "Hoje, 10:30", avatar: "AL" },
  { id: "U006", name: "Roberto Carvalho", email: "roberto@sme.ce.gov.br", role: "Admin", school: "Secretaria Municipal", status: "Ativo", lastLogin: "Hoje, 07:55", avatar: "RC" },
  { id: "U007", name: "Fernanda Costa", email: "fernanda.costa@sme.ce.gov.br", role: "Professor", school: "E.M. Dom Pedro II", status: "Inativo", lastLogin: "Há 15 dias", avatar: "FC" },
  { id: "U008", name: "Paulo Lima", email: "paulo.lima@sme.ce.gov.br", role: "Diretor", school: "E.M. Santos Dumont", status: "Ativo", lastLogin: "Há 3 dias", avatar: "PL" },
];

const roleConfig = {
  Admin: { icon: Shield, color: "#EF4444", bg: "#FEF2F2", label: "Administrador" },
  Diretor: { icon: UserCog, color: "#F59E0B", bg: "#FFFBEB", label: "Diretor" },
  Professor: { icon: User, color: "#2563EB", bg: "#EFF6FF", label: "Professor" },
};

const roleColors: Record<string, string> = {
  Admin: "bg-red-100 text-red-700",
  Diretor: "bg-yellow-100 text-yellow-700",
  Professor: "bg-blue-100 text-blue-700",
};

export function UserManagementPage() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Todos");
  const [showModal, setShowModal] = useState(false);

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "Todos" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const adminCount = users.filter((u) => u.role === "Admin").length;
  const directorCount = users.filter((u) => u.role === "Diretor").length;
  const teacherCount = users.filter((u) => u.role === "Professor").length;
  const activeCount = users.filter((u) => u.status === "Ativo").length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A]">Gerenciar Usuários</h1>
          <p className="text-sm text-slate-500 mt-0.5">{users.length} usuários cadastrados</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#2563EB] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-sm"
        >
          <Plus size={15} />
          Novo Usuário
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total de usuários", value: users.length, ...roleConfig.Professor, icon: User },
          { label: "Administradores", value: adminCount, ...roleConfig.Admin },
          { label: "Diretores", value: directorCount, ...roleConfig.Diretor },
          { label: "Usuários ativos", value: activeCount, icon: User, color: "#10B981", bg: "#ECFDF5" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2" style={{ backgroundColor: s.bg }}>
                <Icon size={17} style={{ color: s.color }} />
              </div>
              <div className="text-xl font-bold text-[#0F172A]">{s.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nome ou e-mail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] bg-white"
          />
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {["Todos", "Admin", "Diretor", "Professor"].map((role) => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                roleFilter === role ? "bg-white text-[#2563EB] shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Users table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Usuário</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">E-mail</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Perfil</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Escola</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Último Acesso</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((user) => {
              const config = roleConfig[user.role as keyof typeof roleConfig];
              const RoleIcon = config?.icon || User;
              return (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
                        style={{ backgroundColor: config?.color || "#2563EB" }}
                      >
                        {user.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#0F172A]">{user.name}</div>
                        <div className="text-xs text-slate-400">{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <Mail size={12} className="text-slate-400" />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: config?.bg }}>
                        <RoleIcon size={13} style={{ color: config?.color }} />
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-md font-medium ${roleColors[user.role]}`}>
                        {user.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                      <Building2 size={12} className="text-slate-400" />
                      <span className="truncate max-w-32">{user.school}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${user.status === "Ativo" ? "bg-[#10B981]" : "bg-gray-300"}`} />
                      <span className={`text-xs font-medium ${user.status === "Ativo" ? "text-[#10B981]" : "text-slate-400"}`}>
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">{user.lastLogin}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-7 h-7 rounded flex items-center justify-center text-slate-400 hover:text-[#2563EB] hover:bg-blue-50 transition-all">
                        <Edit3 size={14} />
                      </button>
                      <button className="w-7 h-7 rounded flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all">
                        <Trash2 size={14} />
                      </button>
                      <button className="w-7 h-7 rounded flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-gray-100 transition-all">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal: New User */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-[#0F172A] mb-5">Novo Usuário</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Nome</label>
                  <input className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]" placeholder="Nome completo" />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Sobrenome</label>
                  <input className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-[#0F172A] block mb-1.5">E-mail institucional</label>
                <input type="email" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]" placeholder="usuario@sme.ce.gov.br" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Perfil de Acesso</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 bg-white">
                    <option>Professor</option>
                    <option>Diretor</option>
                    <option>Admin</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Escola</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 bg-white">
                    <option>E.M. Rui Barbosa</option>
                    <option>E.M. Tiradentes</option>
                    <option>E.M. Santos Dumont</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Senha temporária</label>
                <input type="password" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]" placeholder="Mínimo 8 caracteres" />
              </div>
              <div className="flex items-start gap-2 bg-blue-50 p-3 rounded-lg">
                <div className="w-4 h-4 rounded-full bg-[#2563EB] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">i</span>
                </div>
                <p className="text-xs text-[#2563EB]">O usuário receberá um e-mail com instruções de acesso e será solicitado a alterar a senha no primeiro login.</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm text-slate-600 hover:bg-gray-50 transition-all">
                Cancelar
              </button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 bg-[#2563EB] text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all">
                Criar Usuário
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
