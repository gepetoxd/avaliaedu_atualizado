import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { School, Users, GraduationCap, FileText, TrendingUp, Award, MapPin, AlertTriangle } from "lucide-react";

const municipalTrend = [
  { mes: "Ago", media: 58 }, { mes: "Set", media: 62 }, { mes: "Out", media: 60 },
  { mes: "Nov", media: 65 }, { mes: "Dez", media: 63 }, { mes: "Jan", media: 70 },
  { mes: "Fev", media: 68 }, { mes: "Mar", media: 74 },
];

const schoolsData = [
  { escola: "Rui Barbosa", media: 78 },
  { escola: "Tiradentes", media: 74 },
  { escola: "Santos Dumont", media: 71 },
  { escola: "Dom Pedro II", media: 68 },
  { escola: "José Alencar", media: 65 },
];

const geoData = [
  { zona: "Zona Norte", schools: 3, avgScore: 76, color: "#10B981", highlight: true },
  { zona: "Zona Sul", schools: 2, avgScore: 72, color: "#2563EB", highlight: false },
  { zona: "Zona Leste", schools: 4, avgScore: 68, color: "#F59E0B", highlight: false },
  { zona: "Zona Oeste", schools: 3, avgScore: 65, color: "#EF4444", highlight: false },
  { zona: "Centro", schools: 2, avgScore: 70, color: "#8B5CF6", highlight: false },
];

const skillMunicipality = [
  { skill: "Números", mat: 82, lp: 74 },
  { skill: "Álgebra", mat: 72, lp: 0 },
  { skill: "Geometria", mat: 52, lp: 0 },
  { skill: "Leitura", mat: 0, lp: 74 },
  { skill: "Escrita", mat: 0, lp: 60 },
  { skill: "Estatística", mat: 68, lp: 0 },
];

const kpiData = [
  { label: "Escolas", value: "14", icon: School, color: "#2563EB", bg: "#EFF6FF", desc: "Ativas no sistema" },
  { label: "Professores", value: "310", icon: Users, color: "#10B981", bg: "#ECFDF5", desc: "Usuários ativos" },
  { label: "Alunos", value: "18.540", icon: GraduationCap, color: "#F59E0B", bg: "#FFFBEB", desc: "Matriculados" },
  { label: "Provas Aplicadas", value: "1.248", icon: FileText, color: "#8B5CF6", bg: "#F5F3FF", desc: "Este ano letivo" },
  { label: "Média Municipal", value: "74%", icon: TrendingUp, color: "#10B981", bg: "#ECFDF5", desc: "Março 2026" },
  { label: "Meta Atingida", value: "67%", icon: Award, color: "#F59E0B", bg: "#FFFBEB", desc: "Das escolas acima de 70%" },
];

const alerts = [
  { type: "critical", text: "E.M. José de Alencar – Média abaixo de 65% em Geometria", time: "Hoje" },
  { type: "warning", text: "4 turmas do 6º ano com menos de 2 provas aplicadas", time: "Esta semana" },
  { type: "info", text: "Novo ciclo de avaliações SAEB começa em 15/03/2026", time: "Em 9 dias" },
];

export function AdminPanelPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A]">Painel Administrativo</h1>
          <p className="text-sm text-slate-500 mt-0.5">Secretaria Municipal de Educação de Fortaleza · Visão geral do município</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-slate-600 focus:outline-none">
            <option>2026 – Ano Letivo Atual</option>
            <option>2025 – Ano Letivo Anterior</option>
          </select>
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {kpiData.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: kpi.bg }}>
                  <Icon size={18} style={{ color: kpi.color }} />
                </div>
              </div>
              <div className="text-2xl font-bold text-[#0F172A]">{kpi.value}</div>
              <div className="text-sm font-medium text-[#0F172A] mt-0.5">{kpi.label}</div>
              <div className="text-xs text-slate-400 mt-0.5">{kpi.desc}</div>
            </div>
          );
        })}
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
          <AlertTriangle size={15} className="text-[#F59E0B]" />
          Alertas do Sistema
        </h3>
        <div className="space-y-3">
          {alerts.map((alert, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 p-3 rounded-xl ${
                alert.type === "critical" ? "bg-red-50 border border-red-100" : alert.type === "warning" ? "bg-yellow-50 border border-yellow-100" : "bg-blue-50 border border-blue-100"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  alert.type === "critical" ? "bg-red-500" : alert.type === "warning" ? "bg-[#F59E0B]" : "bg-[#2563EB]"
                }`}
              />
              <div className="flex-1">
                <p className="text-sm text-[#0F172A]">{alert.text}</p>
                <p className="text-xs text-slate-400 mt-0.5">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Municipal trend */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-[#0F172A] mb-1">Média Municipal – Evolução</h3>
          <p className="text-xs text-slate-400 mb-4">Agosto 2025 – Março 2026</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={municipalTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} domain={[50, 80]} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }} formatter={(v: number) => [`${v}%`, "Média"]} />
              <Line type="monotone" dataKey="media" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 4, fill: "#2563EB", stroke: "white", strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* School comparison */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-[#0F172A] mb-1">Ranking de Escolas</h3>
          <p className="text-xs text-slate-400 mb-4">Média geral · Março 2026</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={schoolsData} layout="vertical" barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} domain={[55, 85]} />
              <YAxis type="category" dataKey="escola" tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} width={90} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }} formatter={(v: number) => [`${v}%`, "Média"]} />
              <Bar dataKey="media" fill="#2563EB" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Geographic heatmap */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-[#0F172A] mb-1 flex items-center gap-2">
          <MapPin size={15} className="text-[#2563EB]" />
          Mapa de Desempenho por Zona
        </h3>
        <p className="text-xs text-slate-400 mb-4">Média geral das escolas por região geográfica</p>
        <div className="grid grid-cols-5 gap-3">
          {geoData.map((zone) => (
            <div
              key={zone.zona}
              className="rounded-xl p-4 text-center border-2 transition-all hover:shadow-md cursor-pointer"
              style={{
                borderColor: zone.color,
                backgroundColor: zone.color + "15",
              }}
            >
              <div className="text-xl font-bold" style={{ color: zone.color }}>{zone.avgScore}%</div>
              <div className="text-xs font-medium text-[#0F172A] mt-1">{zone.zona}</div>
              <div className="text-xs text-slate-400 mt-0.5">{zone.schools} escolas</div>
              <div className="mt-2 w-full bg-white/50 rounded-full h-1.5">
                <div className="h-1.5 rounded-full" style={{ width: `${zone.avgScore}%`, backgroundColor: zone.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skill analysis municipal */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-sm font-semibold text-[#0F172A] mb-4">Domínio de Habilidades – Visão Municipal</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={skillMunicipality} barSize={18} barGap={6}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis dataKey="skill" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }} formatter={(v: number) => v > 0 ? [`${v}%`] : ["N/A"]} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="mat" name="Matemática" fill="#2563EB" radius={[3, 3, 0, 0]} />
            <Bar dataKey="lp" name="L. Portuguesa" fill="#8B5CF6" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
