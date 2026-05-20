import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { CheckCircle2, XCircle, AlertCircle, Download, ArrowUpRight, Users } from "lucide-react";

const students = [
  { name: "Ana Souza", class: "8A", score: 85, answers: ["B","A","C","D","A","B","C","A","D","B","A","C","B","D","A","B","C","D","A","B"], correct: 17, wrong: 3 },
  { name: "Carlos Mendes", class: "8A", score: 70, answers: ["B","C","B","D","A","B","A","A","D","B","C","C","B","D","A","B","C","B","A","B"], correct: 14, wrong: 6 },
  { name: "João Oliveira", class: "8A", score: 90, answers: ["B","A","C","D","A","B","C","A","D","B","A","C","B","D","A","B","C","D","A","C"], correct: 18, wrong: 2 },
  { name: "Mariana Santos", class: "8A", score: 60, answers: ["A","A","C","D","B","B","C","A","C","B","A","C","D","A","A","B","A","D","A","B"], correct: 12, wrong: 8 },
  { name: "Pedro Lima", class: "8A", score: 75, answers: ["B","A","C","D","A","A","C","A","D","A","A","C","B","D","B","B","C","D","A","B"], correct: 15, wrong: 5 },
  { name: "Fernanda Costa", class: "8A", score: 95, answers: ["B","A","C","D","A","B","C","A","D","B","A","C","B","D","A","B","C","D","A","B"], correct: 19, wrong: 1 },
];

const correctAnswers = ["B","A","C","D","A","B","C","A","D","B","A","C","B","D","A","B","C","D","A","B"];

const difficultyData = [
  { q: "Q1", acertos: 95 },
  { q: "Q2", acertos: 88 },
  { q: "Q3", acertos: 72 },
  { q: "Q4", acertos: 91 },
  { q: "Q5", acertos: 65 },
  { q: "Q6", acertos: 45 },
  { q: "Q7", acertos: 82 },
  { q: "Q8", acertos: 78 },
  { q: "Q9", acertos: 55 },
  { q: "Q10", acertos: 88 },
];

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 80 ? "bg-green-100 text-green-700" : score >= 60 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700";
  return <span className={`text-xs px-2 py-1 rounded-md font-bold ${color}`}>{score}%</span>;
}

export function CorrectionResultsPage() {
  const avgScore = Math.round(students.reduce((a, s) => a + s.score, 0) / students.length);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A]">Resultados de Correção</h1>
          <p className="text-sm text-slate-500 mt-0.5">Simulado SAEB – Matemática · 8º Ano A · Março 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 border border-gray-200 text-slate-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-all">
            <Download size={14} />
            Exportar PDF
          </button>
          <button className="flex items-center gap-2 bg-[#2563EB] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all">
            <Users size={14} />
            Ver Relatório da Turma
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Alunos Corrigidos", value: students.length, icon: Users, color: "#2563EB", bg: "#EFF6FF" },
          { label: "Média da Turma", value: `${avgScore}%`, icon: CheckCircle2, color: "#10B981", bg: "#ECFDF5" },
          { label: "Maior Nota", value: `${Math.max(...students.map((s) => s.score))}%`, icon: ArrowUpRight, color: "#F59E0B", bg: "#FFFBEB" },
          { label: "Abaixo de 60%", value: students.filter((s) => s.score < 60).length, icon: AlertCircle, color: "#EF4444", bg: "#FEF2F2" },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: card.bg }}>
                  <Icon size={17} style={{ color: card.color }} />
                </div>
              </div>
              <div className="text-xl font-bold text-[#0F172A]">{card.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{card.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Question difficulty */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-[#0F172A] text-sm mb-4">Dificuldade por Questão</h3>
          <p className="text-xs text-slate-400 mb-3">% de acertos por questão</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={difficultyData} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="q" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0", fontSize: 12 }}
                formatter={(v: number) => [`${v}%`, "Acertos"]}
              />
              <Bar dataKey="acertos" radius={[4, 4, 0, 0]}>
                {difficultyData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.acertos >= 75 ? "#10B981" : entry.acertos >= 50 ? "#F59E0B" : "#EF4444"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Score distribution among students */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-[#0F172A] text-sm mb-4">Notas dos Alunos</h3>
          <div className="space-y-2">
            {[...students].sort((a, b) => b.score - a.score).map((s) => (
              <div key={s.name} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-[#2563EB] flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-white">{s.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-[#0F172A] truncate">{s.name}</span>
                    <span className="text-xs font-bold ml-2" style={{ color: s.score >= 80 ? "#10B981" : s.score >= 60 ? "#F59E0B" : "#EF4444" }}>
                      {s.score}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{
                        width: `${s.score}%`,
                        backgroundColor: s.score >= 80 ? "#10B981" : s.score >= 60 ? "#F59E0B" : "#EF4444",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-[#0F172A] text-sm">Gabarito Detalhado por Aluno</h3>
          <span className="text-xs text-slate-400">{students.length} alunos</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left font-semibold text-slate-500 uppercase tracking-wide sticky left-0 bg-gray-50">Aluno</th>
                {correctAnswers.map((_, i) => (
                  <th key={i} className="px-2 py-3 text-center font-semibold text-slate-500">Q{i + 1}</th>
                ))}
                <th className="px-4 py-3 text-left font-semibold text-slate-500 uppercase tracking-wide">Nota</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {/* Gabarito row */}
              <tr className="bg-blue-50">
                <td className="px-4 py-2.5 font-semibold text-[#2563EB] sticky left-0 bg-blue-50">Gabarito</td>
                {correctAnswers.map((ans, i) => (
                  <td key={i} className="px-2 py-2.5 text-center font-bold text-[#2563EB]">{ans}</td>
                ))}
                <td className="px-4 py-2.5" />
              </tr>
              {students.map((student) => (
                <tr key={student.name} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-2.5 sticky left-0 bg-white hover:bg-gray-50">
                    <div className="font-medium text-[#0F172A]">{student.name}</div>
                    <div className="text-slate-400">Turma {student.class}</div>
                  </td>
                  {student.answers.map((ans, i) => {
                    const isCorrect = ans === correctAnswers[i];
                    return (
                      <td key={i} className="px-2 py-2.5 text-center">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                            isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}
                        >
                          {ans}
                        </span>
                      </td>
                    );
                  })}
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <ScoreBadge score={student.score} />
                      <div className="flex items-center gap-1">
                        <CheckCircle2 size={11} className="text-[#10B981]" />
                        <span className="text-green-600">{student.correct}</span>
                        <XCircle size={11} className="text-red-500 ml-1" />
                        <span className="text-red-500">{student.wrong}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
