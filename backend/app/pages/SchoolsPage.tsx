import { useState } from "react";
import { School, Users, BarChart3, TrendingUp, TrendingDown, MapPin, Eye } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const schools = [
  {
    id: "E001",
    name: "E.M. Rui Barbosa",
    zone: "Zona Norte",
    principal: "Carlos Alberto",
    teachers: 24,
    students: 342,
    classes: 10,
    avgScore: 78,
    trend: "up",
    exams: 15,
    scoreHistory: [
      { mes: "Out", score: 72 }, { mes: "Nov", score: 74 }, { mes: "Dez", score: 73 },
      { mes: "Jan", score: 76 }, { mes: "Fev", score: 77 }, { mes: "Mar", score: 78 },
    ],
    skillScores: { Álgebra: 82, Geometria: 60, Estatística: 78, Números: 85, Leitura: 76, "Prod. Textual": 70 },
  },
  {
    id: "E002",
    name: "E.M. Tiradentes",
    zone: "Zona Sul",
    principal: "Sandra Moura",
    teachers: 20,
    students: 289,
    classes: 8,
    avgScore: 74,
    trend: "up",
    exams: 12,
    scoreHistory: [
      { mes: "Out", score: 68 }, { mes: "Nov", score: 70 }, { mes: "Dez", score: 69 },
      { mes: "Jan", score: 71 }, { mes: "Fev", score: 73 }, { mes: "Mar", score: 74 },
    ],
    skillScores: { Álgebra: 76, Geometria: 55, Estatística: 72, Números: 80, Leitura: 74, "Prod. Textual": 67 },
  },
  {
    id: "E003",
    name: "E.M. Santos Dumont",
    zone: "Zona Leste",
    principal: "Paulo Lima",
    teachers: 28,
    students: 415,
    classes: 12,
    avgScore: 71,
    trend: "down",
    exams: 18,
    scoreHistory: [
      { mes: "Out", score: 73 }, { mes: "Nov", score: 72 }, { mes: "Dez", score: 71 },
      { mes: "Jan", score: 72 }, { mes: "Fev", score: 71 }, { mes: "Mar", score: 71 },
    ],
    skillScores: { Álgebra: 70, Geometria: 52, Estatística: 68, Números: 76, Leitura: 72, "Prod. Textual": 65 },
  },
  {
    id: "E004",
    name: "E.M. Dom Pedro II",
    zone: "Zona Oeste",
    principal: "Beatriz Santos",
    teachers: 22,
    students: 378,
    classes: 11,
    avgScore: 68,
    trend: "up",
    exams: 13,
    scoreHistory: [
      { mes: "Out", score: 62 }, { mes: "Nov", score: 64 }, { mes: "Dez", score: 63 },
      { mes: "Jan", score: 65 }, { mes: "Fev", score: 66 }, { mes: "Mar", score: 68 },
    ],
    skillScores: { Álgebra: 68, Geometria: 50, Estatística: 65, Números: 74, Leitura: 70, "Prod. Textual": 62 },
  },
  {
    id: "E005",
    name: "E.M. José de Alencar",
    zone: "Centro",
    principal: "Marcos Vieira",
    teachers: 16,
    students: 201,
    classes: 6,
    avgScore: 65,
    trend: "down",
    exams: 9,
    scoreHistory: [
      { mes: "Out", score: 67 }, { mes: "Nov", score: 66 }, { mes: "Dez", score: 66 },
      { mes: "Jan", score: 66 }, { mes: "Fev", score: 65 }, { mes: "Mar", score: 65 },
    ],
    skillScores: { Álgebra: 64, Geometria: 48, Estatística: 62, Números: 70, Leitura: 68, "Prod. Textual": 58 },
  },
];

const comparisonData = schools.map((s) => ({ escola: s.name.replace("E.M. ", ""), media: s.avgScore }));

export function SchoolsPage() {
  const [selected, setSelected] = useState<(typeof schools)[0] | null>(null);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A]">Escolas</h1>
          <p className="text-sm text-slate-500 mt-0.5">{schools.length} escolas no município</p>
        </div>
      </div>

      {/* Comparison chart */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-[#0F172A] mb-1">Comparativo de Desempenho</h3>
        <p className="text-xs text-slate-400 mb-4">Média geral por escola · Março 2026</p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={comparisonData} barSize={36}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis dataKey="escola" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} domain={[55, 85]} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }} formatter={(v: number) => [`${v}%`, "Média"]} />
            <Bar dataKey="media" fill="#2563EB" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* School list */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-3">
          {schools.map((school, i) => (
            <div
              key={school.id}
              onClick={() => setSelected(selected?.id === school.id ? null : school)}
              className={`bg-white rounded-xl border transition-all cursor-pointer p-4 ${
                selected?.id === school.id ? "border-[#2563EB] shadow-md" : "border-gray-100 hover:border-gray-200 hover:shadow-sm"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-base font-bold text-white">{i + 1}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-[#0F172A] truncate">{school.name}</h3>
                    <div className="flex items-center gap-1">
                      <span className={`text-sm font-bold ${school.avgScore >= 75 ? "text-[#10B981]" : school.avgScore >= 60 ? "text-[#F59E0B]" : "text-red-500"}`}>
                        {school.avgScore}%
                      </span>
                      {school.trend === "up" ? <TrendingUp size={13} className="text-[#10B981]" /> : <TrendingDown size={13} className="text-red-500" />}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                    <MapPin size={10} />
                    {school.zone} · Dir. {school.principal}
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Users size={11} />{school.students}</span>
                    <span className="flex items-center gap-1"><School size={11} />{school.classes} turmas</span>
                    <span className="flex items-center gap-1"><BarChart3 size={11} />{school.exams} provas</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                    <div className="h-1.5 rounded-full bg-[#2563EB]" style={{ width: `${school.avgScore}%` }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* School detail */}
        {selected && (
          <div className="bg-white rounded-xl border border-[#2563EB] shadow-md p-5 space-y-4 h-fit sticky top-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-bold text-[#0F172A]">{selected.name}</h2>
                <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                  <MapPin size={11} />
                  {selected.zone}
                </div>
              </div>
              <button className="flex items-center gap-1 text-xs text-[#2563EB] hover:underline">
                <Eye size={12} /> Ver detalhes
              </button>
            </div>

            {/* Trend chart */}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Evolução da Média</p>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={selected.scoreHistory} barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="mes" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} domain={[55, 90]} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }} formatter={(v: number) => [`${v}%`, "Média"]} />
                  <Bar dataKey="score" fill="#2563EB" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Skill scores */}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Habilidades</p>
              <div className="space-y-1.5">
                {Object.entries(selected.skillScores).map(([skill, score]) => (
                  <div key={skill} className="flex items-center gap-2">
                    <span className="text-xs text-slate-600 w-24 flex-shrink-0">{skill}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{ width: `${score}%`, backgroundColor: score >= 75 ? "#10B981" : score >= 60 ? "#F59E0B" : "#EF4444" }}
                      />
                    </div>
                    <span className="text-xs font-bold w-8 text-right" style={{ color: score >= 75 ? "#10B981" : score >= 60 ? "#F59E0B" : "#EF4444" }}>
                      {score}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
              {[
                { label: "Professores", value: selected.teachers },
                { label: "Alunos", value: selected.students },
                { label: "Turmas", value: selected.classes },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-lg font-bold text-[#0F172A]">{s.value}</div>
                  <div className="text-xs text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
