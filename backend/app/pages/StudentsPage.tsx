import { useState } from "react";
import { Search, Filter, Plus, Eye, Download, TrendingUp, TrendingDown, ChevronLeft, ChevronRight } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

const students = [
  { id: "AL001", name: "Ana Souza", class: "8º Ano A", school: "E.M. Rui Barbosa", avgScore: 85, trend: "up", exams: 5, lastExam: "04/03/2026", skills: { Álgebra: 88, Geometria: 72, Estatística: 90, Números: 85, Leitura: 78 } },
  { id: "AL002", name: "Carlos Mendes", class: "8º Ano A", school: "E.M. Rui Barbosa", avgScore: 70, trend: "down", exams: 4, lastExam: "04/03/2026", skills: { Álgebra: 65, Geometria: 58, Estatística: 72, Números: 80, Leitura: 75 } },
  { id: "AL003", name: "João Oliveira", class: "9º Ano B", school: "E.M. Tiradentes", avgScore: 90, trend: "up", exams: 6, lastExam: "03/03/2026", skills: { Álgebra: 92, Geometria: 88, Estatística: 90, Números: 95, Leitura: 85 } },
  { id: "AL004", name: "Mariana Santos", class: "6º Ano A", school: "E.M. Santos Dumont", avgScore: 60, trend: "down", exams: 3, lastExam: "02/03/2026", skills: { Álgebra: 55, Geometria: 48, Estatística: 62, Números: 70, Leitura: 65 } },
  { id: "AL005", name: "Pedro Lima", class: "7º Ano B", school: "E.M. Dom Pedro II", avgScore: 75, trend: "up", exams: 5, lastExam: "04/03/2026", skills: { Álgebra: 78, Geometria: 65, Estatística: 74, Números: 80, Leitura: 79 } },
  { id: "AL006", name: "Fernanda Costa", class: "8º Ano A", school: "E.M. Rui Barbosa", avgScore: 95, trend: "up", exams: 6, lastExam: "04/03/2026", skills: { Álgebra: 96, Geometria: 94, Estatística: 98, Números: 97, Leitura: 90 } },
  { id: "AL007", name: "Lucas Ferreira", class: "9º Ano A", school: "E.M. José de Alencar", avgScore: 55, trend: "down", exams: 4, lastExam: "01/03/2026", skills: { Álgebra: 52, Geometria: 45, Estatística: 58, Números: 60, Leitura: 62 } },
  { id: "AL008", name: "Sofia Almeida", class: "7º Ano A", school: "E.M. Tiradentes", avgScore: 82, trend: "up", exams: 5, lastExam: "03/03/2026", skills: { Álgebra: 80, Geometria: 75, Estatística: 85, Números: 88, Leitura: 82 } },
];

export function StudentsPage() {
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<(typeof students)[0] | null>(null);

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.class.toLowerCase().includes(search.toLowerCase()) ||
      s.school.toLowerCase().includes(search.toLowerCase())
  );

  const radarData = selectedStudent
    ? Object.entries(selectedStudent.skills).map(([skill, value]) => ({ skill, value }))
    : [];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A]">Alunos</h1>
          <p className="text-sm text-slate-500 mt-0.5">{students.length} alunos cadastrados</p>
        </div>
        <button className="flex items-center gap-2 bg-[#2563EB] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-sm">
          <Plus size={15} />
          Novo Aluno
        </button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar aluno, turma..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] bg-white"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-slate-400" />
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-slate-600 focus:outline-none">
            <option>Todos os anos</option>
            <option>6º Ano</option>
            <option>7º Ano</option>
            <option>8º Ano</option>
            <option>9º Ano</option>
          </select>
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-slate-600 focus:outline-none">
            <option>Todas as escolas</option>
            <option>E.M. Rui Barbosa</option>
            <option>E.M. Tiradentes</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Table */}
        <div className={`${selectedStudent ? "lg:col-span-2" : "lg:col-span-3"} bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden`}>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Aluno</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Turma</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Escola</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Média</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Provas</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Última Prova</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((student) => (
                <tr
                  key={student.id}
                  className={`hover:bg-gray-50/50 transition-colors cursor-pointer group ${selectedStudent?.id === student.id ? "bg-blue-50" : ""}`}
                  onClick={() => setSelectedStudent(selectedStudent?.id === student.id ? null : student)}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-white">{student.name[0]}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#0F172A]">{student.name}</div>
                        <div className="text-xs text-slate-400">{student.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{student.class}</td>
                  <td className="px-4 py-3 text-sm text-slate-500 truncate max-w-32">{student.school}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-bold ${student.avgScore >= 80 ? "text-[#10B981]" : student.avgScore >= 60 ? "text-[#F59E0B]" : "text-red-500"}`}
                      >
                        {student.avgScore}%
                      </span>
                      {student.trend === "up" ? (
                        <TrendingUp size={13} className="text-[#10B981]" />
                      ) : (
                        <TrendingDown size={13} className="text-red-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{student.exams}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{student.lastExam}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-7 h-7 rounded flex items-center justify-center text-slate-400 hover:text-[#2563EB] hover:bg-blue-50 transition-all">
                        <Eye size={14} />
                      </button>
                      <button className="w-7 h-7 rounded flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-gray-50 transition-all">
                        <Download size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <span className="text-xs text-slate-500">Mostrando {filtered.length} de {students.length} alunos</span>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-slate-400 hover:bg-gray-50"><ChevronLeft size={14} /></button>
              <button className="w-7 h-7 rounded bg-[#2563EB] text-white text-xs">1</button>
              <button className="w-7 h-7 rounded border border-gray-200 text-slate-500 text-xs hover:bg-gray-50">2</button>
              <button className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-slate-400 hover:bg-gray-50"><ChevronRight size={14} /></button>
            </div>
          </div>
        </div>

        {/* Student detail panel */}
        {selectedStudent && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-[#2563EB] flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-white">{selectedStudent.name[0]}</span>
              </div>
              <div>
                <h3 className="font-bold text-[#0F172A]">{selectedStudent.name}</h3>
                <p className="text-xs text-slate-400">{selectedStudent.class} · {selectedStudent.school}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Média", value: `${selectedStudent.avgScore}%`, color: selectedStudent.avgScore >= 80 ? "#10B981" : selectedStudent.avgScore >= 60 ? "#F59E0B" : "#EF4444" },
                { label: "Provas", value: selectedStudent.exams.toString(), color: "#2563EB" },
              ].map((s, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-xs text-slate-400">{s.label}</div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Radar de Habilidades</p>
              <ResponsiveContainer width="100%" height={180}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#F1F5F9" />
                  <PolarAngleAxis dataKey="skill" tick={{ fontSize: 9, fill: "#64748B" }} />
                  <PolarRadiusAxis tick={{ fontSize: 8, fill: "#94A3B8" }} domain={[0, 100]} />
                  <Radar name="Domínio" dataKey="value" stroke="#2563EB" fill="#2563EB" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Por Habilidade</p>
              <div className="space-y-1.5">
                {Object.entries(selectedStudent.skills).map(([skill, value]) => (
                  <div key={skill} className="flex items-center gap-2">
                    <span className="text-xs text-slate-600 w-24 flex-shrink-0">{skill}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full"
                        style={{ width: `${value}%`, backgroundColor: value >= 75 ? "#10B981" : value >= 60 ? "#F59E0B" : "#EF4444" }}
                      />
                    </div>
                    <span className="text-xs font-medium text-[#0F172A] w-8 text-right">{value}%</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 bg-[#2563EB] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all">
              <Download size={14} />
              Exportar Relatório do Aluno
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
