import { useState } from "react";
import { Users, TrendingUp, TrendingDown, BarChart3, Eye, Plus, ChevronRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const classes = [
  {
    id: "T001",
    name: "8º Ano A",
    school: "E.M. Rui Barbosa",
    teacher: "Maria Silva",
    students: 32,
    avgScore: 79,
    trend: "up",
    examsApplied: 5,
    topSkill: "Números",
    weakSkill: "Geometria",
    scores: [
      { mes: "Jan", media: 72 }, { mes: "Fev", media: 75 }, { mes: "Mar", media: 79 },
    ],
  },
  {
    id: "T002",
    name: "8º Ano B",
    school: "E.M. Rui Barbosa",
    teacher: "João Ferreira",
    students: 30,
    avgScore: 68,
    trend: "down",
    examsApplied: 4,
    topSkill: "Leitura",
    weakSkill: "Álgebra",
    scores: [
      { mes: "Jan", media: 70 }, { mes: "Fev", media: 69 }, { mes: "Mar", media: 68 },
    ],
  },
  {
    id: "T003",
    name: "9º Ano A",
    school: "E.M. Tiradentes",
    teacher: "Ana Lima",
    students: 28,
    avgScore: 82,
    trend: "up",
    examsApplied: 6,
    topSkill: "Álgebra",
    weakSkill: "Estatística",
    scores: [
      { mes: "Jan", media: 78 }, { mes: "Fev", media: 80 }, { mes: "Mar", media: 82 },
    ],
  },
  {
    id: "T004",
    name: "7º Ano A",
    school: "E.M. Santos Dumont",
    teacher: "Carlos Rocha",
    students: 35,
    avgScore: 65,
    trend: "up",
    examsApplied: 3,
    topSkill: "Números",
    weakSkill: "Produção Textual",
    scores: [
      { mes: "Jan", media: 60 }, { mes: "Fev", media: 62 }, { mes: "Mar", media: 65 },
    ],
  },
  {
    id: "T005",
    name: "6º Ano A",
    school: "E.M. Dom Pedro II",
    teacher: "Fernanda Costa",
    students: 33,
    avgScore: 71,
    trend: "up",
    examsApplied: 4,
    topSkill: "Leitura",
    weakSkill: "Geometria",
    scores: [
      { mes: "Jan", media: 66 }, { mes: "Fev", media: 68 }, { mes: "Mar", media: 71 },
    ],
  },
];

// Skill mastery heatmap for the selected class
const classSkillData = [
  { skill: "Álgebra", score: 79 },
  { skill: "Geometria", score: 52 },
  { skill: "Estatística", score: 70 },
  { skill: "Números", score: 88 },
  { skill: "Leitura", score: 76 },
  { skill: "Prod. Textual", score: 62 },
];

const topStudents = [
  { name: "Fernanda Costa", score: 95 },
  { name: "João Oliveira", score: 90 },
  { name: "Ana Souza", score: 85 },
  { name: "Pedro Lima", score: 75 },
];

export function ClassesPage() {
  const [selected, setSelected] = useState<(typeof classes)[0] | null>(classes[0]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A]">Turmas</h1>
          <p className="text-sm text-slate-500 mt-0.5">{classes.length} turmas cadastradas</p>
        </div>
        <button className="flex items-center gap-2 bg-[#2563EB] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-sm">
          <Plus size={15} />
          Nova Turma
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Class list */}
        <div className="space-y-2">
          {classes.map((cls) => (
            <button
              key={cls.id}
              onClick={() => setSelected(cls)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selected?.id === cls.id
                  ? "border-[#2563EB] bg-blue-50 shadow-sm"
                  : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-sm font-semibold text-[#0F172A]">{cls.name}</div>
                  <div className="text-xs text-slate-400">{cls.school}</div>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`text-sm font-bold ${cls.avgScore >= 75 ? "text-[#10B981]" : cls.avgScore >= 60 ? "text-[#F59E0B]" : "text-red-500"}`}>
                    {cls.avgScore}%
                  </span>
                  {cls.trend === "up" ? <TrendingUp size={13} className="text-[#10B981]" /> : <TrendingDown size={13} className="text-red-500" />}
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Users size={11} />{cls.students} alunos</span>
                <span className="flex items-center gap-1"><BarChart3 size={11} />{cls.examsApplied} provas</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full bg-[#2563EB]" style={{ width: `${cls.avgScore}%` }} />
                </div>
                <ChevronRight size={12} className="text-slate-400" />
              </div>
            </button>
          ))}
        </div>

        {/* Class Detail */}
        {selected && (
          <div className="lg:col-span-2 space-y-4">
            {/* Header card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="font-bold text-[#0F172A] text-lg">{selected.name}</h2>
                  <p className="text-sm text-slate-400">{selected.school} · Prof. {selected.teacher}</p>
                </div>
                <button className="flex items-center gap-1 text-xs text-[#2563EB] hover:underline">
                  <Eye size={13} />
                  Ver alunos
                </button>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: "Alunos", value: selected.students, color: "#2563EB" },
                  { label: "Média Geral", value: `${selected.avgScore}%`, color: selected.avgScore >= 75 ? "#10B981" : "#F59E0B" },
                  { label: "Provas Aplicadas", value: selected.examsApplied, color: "#F59E0B" },
                  { label: "Tendência", value: selected.trend === "up" ? "↑ +3,2%" : "↓ -1,5%", color: selected.trend === "up" ? "#10B981" : "#EF4444" },
                ].map((s, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trend chart + Top students */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Evolução da Turma</h3>
                <ResponsiveContainer width="100%" height={140}>
                  <BarChart data={selected.scores} barSize={28}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                    <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} domain={[50, 100]} />
                    <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }} formatter={(v: number) => [`${v}%`, "Média"]} />
                    <Bar dataKey="media" fill="#2563EB" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Top Alunos</h3>
                <div className="space-y-2">
                  {topStudents.map((s, i) => (
                    <div key={s.name} className="flex items-center gap-2">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${i === 0 ? "bg-[#F59E0B] text-white" : i === 1 ? "bg-slate-300 text-slate-700" : "bg-gray-100 text-slate-500"}`}>
                        {i + 1}
                      </span>
                      <span className="text-xs text-[#0F172A] flex-1 truncate">{s.name}</span>
                      <span className="text-xs font-bold text-[#10B981]">{s.score}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skill mastery heatmap */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-[#0F172A]">Domínio de Habilidades</h3>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded bg-green-100 text-green-700">Forte: {selected.topSkill}</span>
                  <span className="px-2 py-0.5 rounded bg-red-100 text-red-700">Crítico: {selected.weakSkill}</span>
                </div>
              </div>
              <div className="space-y-2.5">
                {classSkillData.map((s) => (
                  <div key={s.skill} className="flex items-center gap-3">
                    <span className="text-xs text-slate-600 w-28 flex-shrink-0">{s.skill}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-3 relative">
                      <div
                        className="h-3 rounded-full transition-all"
                        style={{
                          width: `${s.score}%`,
                          backgroundColor: s.score >= 75 ? "#10B981" : s.score >= 60 ? "#F59E0B" : "#EF4444",
                        }}
                      />
                    </div>
                    <span className="text-sm font-bold w-12 text-right" style={{ color: s.score >= 75 ? "#10B981" : s.score >= 60 ? "#F59E0B" : "#EF4444" }}>
                      {s.score}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
