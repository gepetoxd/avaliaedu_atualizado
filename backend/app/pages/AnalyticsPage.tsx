import {
  BarChart, Bar, AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line, Cell,
} from "recharts";
import { Filter, Download, TrendingUp, Award, AlertTriangle } from "lucide-react";

const scoreBySubject = [
  { turma: "6A", Mat: 72, LP: 68 },
  { turma: "6B", Mat: 68, LP: 73 },
  { turma: "7A", Mat: 75, LP: 70 },
  { turma: "7B", Mat: 65, LP: 78 },
  { turma: "8A", Mat: 79, LP: 72 },
  { turma: "8B", Mat: 74, LP: 65 },
  { turma: "9A", Mat: 80, LP: 74 },
  { turma: "9B", Mat: 71, LP: 76 },
];

const skillMastery = [
  { skill: "Álgebra", mastery: 72, count: 45 },
  { skill: "Geometria", mastery: 52, count: 38 },
  { skill: "Estatística", mastery: 68, count: 29 },
  { skill: "Números", mastery: 81, count: 52 },
  { skill: "Leitura", mastery: 74, count: 41 },
  { skill: "Produção Textual", mastery: 60, count: 35 },
  { skill: "Análise Linguística", mastery: 65, count: 28 },
];

const radarData = [
  { skill: "Álgebra", value: 72 },
  { skill: "Geometria", value: 52 },
  { skill: "Estatística", value: 68 },
  { skill: "Números", value: 81 },
  { skill: "Leitura", value: 74 },
  { skill: "Produção", value: 60 },
];

const trendData = [
  { mes: "Ago", saeb: 58, spaece: 61 },
  { mes: "Set", saeb: 62, spaece: 63 },
  { mes: "Out", saeb: 60, spaece: 65 },
  { mes: "Nov", saeb: 65, spaece: 67 },
  { mes: "Dez", saeb: 63, spaece: 68 },
  { mes: "Jan", saeb: 70, spaece: 70 },
  { mes: "Fev", saeb: 68, spaece: 72 },
  { mes: "Mar", saeb: 74, spaece: 75 },
];

// Heatmap data: grades vs skills
const heatmapData = [
  { grade: "6º Ano", Álgebra: 70, Geometria: 58, Estatística: 65, Números: 80, Leitura: 72, "Prod. Textual": 62 },
  { grade: "7º Ano", Álgebra: 74, Geometria: 54, Estatística: 68, Números: 78, Leitura: 74, "Prod. Textual": 58 },
  { grade: "8º Ano", Álgebra: 72, Geometria: 50, Estatística: 70, Números: 82, Leitura: 76, "Prod. Textual": 60 },
  { grade: "9º Ano", Álgebra: 68, Geometria: 46, Estatística: 66, Números: 84, Leitura: 75, "Prod. Textual": 63 },
];

const skillKeys = ["Álgebra", "Geometria", "Estatística", "Números", "Leitura", "Prod. Textual"];

function getHeatColor(value: number) {
  if (value >= 80) return { bg: "#DCFCE7", text: "#15803D" };
  if (value >= 70) return { bg: "#D1FAE5", text: "#065F46" };
  if (value >= 60) return { bg: "#FEF9C3", text: "#854D0E" };
  if (value >= 50) return { bg: "#FEF3C7", text: "#92400E" };
  return { bg: "#FEE2E2", text: "#B91C1C" };
}

export function AnalyticsPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A]">Relatórios & Analytics</h1>
          <p className="text-sm text-slate-500 mt-0.5">Análise pedagógica por habilidade, turma e escola</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-white">
            <Filter size={14} className="text-slate-400" />
            <select className="text-sm bg-transparent text-slate-600 focus:outline-none">
              <option>Março 2026</option>
              <option>Fevereiro 2026</option>
              <option>Janeiro 2026</option>
            </select>
          </div>
          <button className="flex items-center gap-2 bg-[#2563EB] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-sm">
            <Download size={14} />
            Exportar Relatório
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {[
          ["Escola", ["Todas as escolas", "E.M. Rui Barbosa", "E.M. Tiradentes"]],
          ["Turma", ["Todas as turmas", "6º Ano", "7º Ano", "8º Ano", "9º Ano"]],
          ["Avaliação", ["Todas", "Simulado SAEB", "Simulado SPAECE", "Diagnóstica"]],
          ["Disciplina", ["Todas", "Matemática", "Língua Portuguesa"]],
        ].map(([label, options]) => (
          <div key={label as string} className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-3 py-1.5">
            <span className="text-xs font-medium text-slate-500">{label as string}:</span>
            <select className="text-xs bg-transparent text-[#0F172A] focus:outline-none font-medium">
              {(options as string[]).map((opt) => <option key={opt}>{opt}</option>)}
            </select>
          </div>
        ))}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Turmas acima da meta", value: "12/18", pct: "67%", icon: Award, color: "#10B981", bg: "#ECFDF5" },
          { label: "Crescimento vs. mês anterior", value: "+6,2 pp", pct: "Março vs Fev", icon: TrendingUp, color: "#2563EB", bg: "#EFF6FF" },
          { label: "Habilidades críticas", value: "3", pct: "Abaixo de 60%", icon: AlertTriangle, color: "#EF4444", bg: "#FEF2F2" },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: kpi.bg }}>
                  <Icon size={17} style={{ color: kpi.color }} />
                </div>
                <span className="text-xs text-slate-400">{kpi.pct}</span>
              </div>
              <div className="text-2xl font-bold text-[#0F172A]">{kpi.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{kpi.label}</div>
            </div>
          );
        })}
      </div>

      {/* Row 1: Class comparison + Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-[#0F172A] text-sm mb-1">Desempenho por Turma e Disciplina</h3>
          <p className="text-xs text-slate-400 mb-4">Média geral por turma</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={scoreBySubject} barSize={16} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="turma" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} domain={[50, 90]} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }} formatter={(v: number) => [`${v}%`]} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="Mat" name="Matemática" fill="#2563EB" radius={[3, 3, 0, 0]} />
              <Bar dataKey="LP" name="L. Portuguesa" fill="#8B5CF6" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-[#0F172A] text-sm mb-1">Domínio por Competência</h3>
          <p className="text-xs text-slate-400 mb-2">Visão geral do município</p>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#F1F5F9" />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 9, fill: "#64748B" }} />
              <PolarRadiusAxis tick={{ fontSize: 8, fill: "#94A3B8" }} domain={[0, 100]} />
              <Radar name="Domínio" dataKey="value" stroke="#2563EB" fill="#2563EB" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trend chart */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-[#0F172A] text-sm mb-1">Evolução SAEB vs SPAECE</h3>
        <p className="text-xs text-slate-400 mb-4">Média municipal por avaliação</p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} domain={[50, 85]} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }} formatter={(v: number) => [`${v}%`]} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="saeb" name="SAEB" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 4, fill: "#2563EB" }} />
            <Line type="monotone" dataKey="spaece" name="SPAECE" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4, fill: "#10B981" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Skill Mastery Table */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-[#0F172A] text-sm mb-1">Domínio de Habilidades</h3>
        <p className="text-xs text-slate-400 mb-4">Por percentual de alunos com domínio</p>
        <div className="space-y-2">
          {skillMastery.sort((a, b) => b.mastery - a.mastery).map((s) => (
            <div key={s.skill} className="flex items-center gap-4">
              <span className="text-sm text-[#0F172A] w-40 flex-shrink-0">{s.skill}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-3 relative">
                <div
                  className="h-3 rounded-full transition-all"
                  style={{
                    width: `${s.mastery}%`,
                    backgroundColor: s.mastery >= 75 ? "#10B981" : s.mastery >= 60 ? "#F59E0B" : "#EF4444",
                  }}
                />
              </div>
              <span className="text-sm font-bold w-12 text-right" style={{ color: s.mastery >= 75 ? "#10B981" : s.mastery >= 60 ? "#F59E0B" : "#EF4444" }}>
                {s.mastery}%
              </span>
              <span className="text-xs text-slate-400 w-20">{s.count} questões</span>
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-[#0F172A] text-sm mb-1">Mapa de Calor – Domínio por Ano e Habilidade</h3>
        <p className="text-xs text-slate-400 mb-4">Percentual médio de domínio</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="py-2 text-left text-xs font-semibold text-slate-500 w-24">Ano</th>
                {skillKeys.map((sk) => (
                  <th key={sk} className="py-2 text-center text-xs font-semibold text-slate-500 px-2">{sk}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {heatmapData.map((row) => (
                <tr key={row.grade}>
                  <td className="py-2 text-sm font-medium text-[#0F172A]">{row.grade}</td>
                  {skillKeys.map((sk) => {
                    const val = row[sk as keyof typeof row] as number;
                    const { bg, text } = getHeatColor(val);
                    return (
                      <td key={sk} className="py-2 px-2 text-center">
                        <span className="inline-block px-3 py-1.5 rounded-lg text-xs font-bold" style={{ backgroundColor: bg, color: text }}>
                          {val}%
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-4 mt-4">
          <span className="text-xs text-slate-400">Legenda:</span>
          {[
            { label: "≥80% Ótimo", bg: "#DCFCE7", text: "#15803D" },
            { label: "70–79% Bom", bg: "#D1FAE5", text: "#065F46" },
            { label: "60–69% Regular", bg: "#FEF9C3", text: "#854D0E" },
            { label: "<60% Crítico", bg: "#FEE2E2", text: "#B91C1C" },
          ].map((l) => (
            <span key={l.label} className="text-xs px-2 py-1 rounded font-medium" style={{ backgroundColor: l.bg, color: l.text }}>
              {l.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
