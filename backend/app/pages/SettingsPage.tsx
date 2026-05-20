import { useState } from "react";
import { Save, Upload, Palette, BookOpen, FileText, Bell, Shield, Globe, ChevronRight } from "lucide-react";

const settingsNav = [
  { id: "general", label: "Configurações Gerais", icon: Globe },
  { id: "assessment", label: "Avaliações", icon: FileText },
  { id: "skills", label: "Biblioteca de Habilidades", icon: BookOpen },
  { id: "brand", label: "Personalização Visual", icon: Palette },
  { id: "notifications", label: "Notificações", icon: Bell },
  { id: "security", label: "Segurança", icon: Shield },
];

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A]">Configurações</h1>
          <p className="text-sm text-slate-500 mt-0.5">Configure o sistema AvaliaEdu para sua instituição</p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm ${
            saved ? "bg-[#10B981] text-white" : "bg-[#2563EB] text-white hover:bg-blue-700"
          }`}
        >
          <Save size={15} />
          {saved ? "Salvo!" : "Salvar Alterações"}
        </button>
      </div>

      <div className="flex gap-5">
        {/* Sidebar nav */}
        <div className="w-56 flex-shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {settingsNav.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-all border-b border-gray-50 last:border-b-0 ${
                    activeTab === item.id
                      ? "bg-blue-50 text-[#2563EB] font-medium"
                      : "text-slate-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={16} className={activeTab === item.id ? "text-[#2563EB]" : "text-slate-400"} />
                  <span className="flex-1">{item.label}</span>
                  <ChevronRight size={13} className="text-slate-300" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-4">
          {/* General */}
          {activeTab === "general" && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h2 className="font-semibold text-[#0F172A]">Configurações Gerais</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Nome da Secretaria</label>
                  <input defaultValue="Secretaria Municipal de Educação de Fortaleza" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]" />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Sigla</label>
                  <input defaultValue="SME-FOR" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]" />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Município</label>
                  <input defaultValue="Fortaleza – CE" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]" />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Ano Letivo Atual</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 bg-white">
                    <option>2026</option>
                    <option>2025</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Fuso Horário</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 bg-white">
                    <option>América/Fortaleza (UTC-3)</option>
                    <option>América/São_Paulo (UTC-3)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Idioma</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 bg-white">
                    <option>Português (Brasil)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Assessment */}
          {activeTab === "assessment" && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h2 className="font-semibold text-[#0F172A]">Configuração de Avaliações</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Tipos de Avaliação Disponíveis</label>
                  <div className="space-y-2">
                    {["Simulado SAEB", "Simulado SPAECE", "Avaliação Diagnóstica", "Prova Bimestral", "Recuperação"].map((type) => (
                      <div key={type} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                        <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#2563EB]" />
                        <span className="text-sm text-[#0F172A]">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Mínimo de questões por prova</label>
                    <input type="number" defaultValue={5} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Máximo de questões por prova</label>
                    <input type="number" defaultValue={50} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Escala de notas</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 bg-white">
                    <option>Percentual (0–100%)</option>
                    <option>Pontos (0–10)</option>
                    <option>Padrão SAEB (0–500)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Meta de proficiência</label>
                  <div className="flex items-center gap-3">
                    <input type="range" min={40} max={90} defaultValue={70} className="flex-1 accent-[#2563EB]" />
                    <span className="text-sm font-bold text-[#2563EB] w-12">70%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Skills Library */}
          {activeTab === "skills" && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h2 className="font-semibold text-[#0F172A]">Biblioteca de Habilidades</h2>
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2563EB]">Banco SAEB/SPAECE atualizado</p>
                  <p className="text-xs text-blue-600/70">Última atualização: 01/03/2026 · Versão 2026.1</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { name: "SAEB – Matemática EF", skills: 48, updated: "01/03/2026" },
                  { name: "SAEB – Língua Portuguesa EF", skills: 52, updated: "01/03/2026" },
                  { name: "SPAECE – Matemática", skills: 32, updated: "01/03/2026" },
                  { name: "SPAECE – Língua Portuguesa", skills: 38, updated: "01/03/2026" },
                ].map((lib) => (
                  <div key={lib.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-all">
                    <div>
                      <div className="text-sm font-medium text-[#0F172A]">{lib.name}</div>
                      <div className="text-xs text-slate-400">{lib.skills} habilidades · Atualizado em {lib.updated}</div>
                    </div>
                    <button className="text-xs text-[#2563EB] hover:underline">Atualizar</button>
                  </div>
                ))}
              </div>
              <button className="flex items-center gap-2 border border-gray-200 text-slate-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-all">
                <Upload size={14} />
                Importar Habilidades Personalizadas (CSV)
              </button>
            </div>
          )}

          {/* Brand */}
          {activeTab === "brand" && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h2 className="font-semibold text-[#0F172A]">Personalização Visual</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-3">Logo da Secretaria</label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-[#2563EB]/50 transition-all cursor-pointer">
                    <Upload size={24} className="text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">Arraste ou clique para fazer upload</p>
                    <p className="text-xs text-slate-400 mt-1">PNG, SVG · Máx 2MB · Recomendado: 200×60px</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-3">Cores da Plataforma</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Cor Primária", color: "#2563EB" },
                      { label: "Cor Secundária", color: "#10B981" },
                      { label: "Cor de Destaque", color: "#F59E0B" },
                    ].map((c) => (
                      <div key={c.label} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                        <div className="w-8 h-8 rounded-lg flex-shrink-0" style={{ backgroundColor: c.color }} />
                        <div>
                          <div className="text-xs font-medium text-[#0F172A]">{c.label}</div>
                          <div className="text-xs text-slate-400 font-mono">{c.color}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Cabeçalho das provas</label>
                  <textarea
                    rows={3}
                    defaultValue="Secretaria Municipal de Educação de Fortaleza&#10;Avaliação Educacional Municipal"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h2 className="font-semibold text-[#0F172A]">Configurações de Notificações</h2>
              <div className="space-y-3">
                {[
                  { label: "Prova corrigida com sucesso", desc: "Quando a OMR finaliza a correção", defaultOn: true },
                  { label: "Erro no escaneamento", desc: "Quando um gabarito não pode ser lido", defaultOn: true },
                  { label: "Novo aluno cadastrado", desc: "Quando um aluno é adicionado ao sistema", defaultOn: false },
                  { label: "Relatório mensal disponível", desc: "Quando o relatório do mês é gerado", defaultOn: true },
                  { label: "Meta de proficiência atingida", desc: "Quando uma turma supera a meta definida", defaultOn: true },
                  { label: "Habilidades críticas detectadas", desc: "Quando uma habilidade cai abaixo de 60%", defaultOn: true },
                ].map((notif, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all">
                    <div>
                      <div className="text-sm font-medium text-[#0F172A]">{notif.label}</div>
                      <div className="text-xs text-slate-400">{notif.desc}</div>
                    </div>
                    <div
                      className={`w-10 h-6 rounded-full relative cursor-pointer transition-all ${notif.defaultOn ? "bg-[#2563EB]" : "bg-gray-200"}`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${notif.defaultOn ? "right-1" : "left-1"}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h2 className="font-semibold text-[#0F172A]">Segurança</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Tempo de sessão (minutos)</label>
                  <input type="number" defaultValue={60} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]" />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Política de senhas</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 bg-white">
                    <option>Forte (mínimo 8 caracteres, letras e números)</option>
                    <option>Média (mínimo 6 caracteres)</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                  <div>
                    <div className="text-sm font-medium text-[#0F172A]">Autenticação em dois fatores (2FA)</div>
                    <div className="text-xs text-slate-400">Obrigatório para administradores</div>
                  </div>
                  <div className="w-10 h-6 bg-[#2563EB] rounded-full relative cursor-pointer">
                    <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white shadow-sm" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                  <div>
                    <div className="text-sm font-medium text-[#0F172A]">Log de auditoria</div>
                    <div className="text-xs text-slate-400">Registrar todas as ações dos usuários</div>
                  </div>
                  <div className="w-10 h-6 bg-[#2563EB] rounded-full relative cursor-pointer">
                    <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white shadow-sm" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
