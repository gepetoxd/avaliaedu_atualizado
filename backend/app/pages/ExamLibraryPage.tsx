import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Download, Printer, Edit3, Eye, Copy, Trash2, FileText, Filter, ScanLine } from "lucide-react";

const exams = [
  {
    id: "P001",
    title: "Simulado SAEB – Matemática · 8º Ano",
    subject: "Matemática",
    grade: "8º Ano",
    type: "Simulado SAEB",
    questions: 20,
    created: "04/03/2026",
    applied: 3,
    status: "Publicado",
    skills: ["EF08MA12", "EF07MA04", "EF09MA12"],
  },
  {
    id: "P002",
    title: "Avaliação Diagnóstica LP – 6º Ano",
    subject: "L. Portuguesa",
    grade: "6º Ano",
    type: "Diagnóstica",
    questions: 15,
    created: "02/03/2026",
    applied: 1,
    status: "Publicado",
    skills: ["EF06LP01", "EF06LP02"],
  },
  {
    id: "P003",
    title: "Prova Bimestral Matemática – 9º Ano",
    subject: "Matemática",
    grade: "9º Ano",
    type: "Bimestral",
    questions: 25,
    created: "01/03/2026",
    applied: 0,
    status: "Rascunho",
    skills: ["EF09MA12", "EF09MA13"],
  },
  {
    id: "P004",
    title: "Simulado SPAECE LP – 7º Ano",
    subject: "L. Portuguesa",
    grade: "7º Ano",
    type: "Simulado SPAECE",
    questions: 20,
    created: "28/02/2026",
    applied: 5,
    status: "Publicado",
    skills: ["EF07LP16", "EF07LP17"],
  },
  {
    id: "P005",
    title: "Avaliação de Recuperação – Mat 7º Ano",
    subject: "Matemática",
    grade: "7º Ano",
    type: "Recuperação",
    questions: 10,
    created: "25/02/2026",
    applied: 2,
    status: "Arquivado",
    skills: ["EF07MA04", "EF07MA05"],
  },
];

const statusColors: Record<string, string> = {
  Publicado: "bg-emerald-100 text-emerald-700",
  Rascunho: "bg-yellow-100 text-yellow-700",
  Arquivado: "bg-gray-100 text-gray-500",
};

export function ExamLibraryPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [previewExam, setPreviewExam] = useState<(typeof exams)[0] | null>(null);

  const filtered = exams.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A]">Biblioteca de Provas</h1>
          <p className="text-sm text-slate-500 mt-0.5">{exams.length} provas cadastradas</p>
        </div>
        <button
          onClick={() => navigate("/app/exam-generator")}
          className="flex items-center gap-2 bg-[#2563EB] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-sm"
        >
          <FileText size={15} />
          Criar Nova Prova
        </button>
      </div>

      {/* Filters bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar provas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] bg-white"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-slate-400" />
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-slate-600 focus:outline-none">
            <option>Todas</option>
            <option>Matemática</option>
            <option>L. Portuguesa</option>
          </select>
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-slate-600 focus:outline-none">
            <option>Todos os anos</option>
            <option>6º Ano</option>
            <option>7º Ano</option>
            <option>8º Ano</option>
            <option>9º Ano</option>
          </select>
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-slate-600 focus:outline-none">
            <option>Todos status</option>
            <option>Publicado</option>
            <option>Rascunho</option>
            <option>Arquivado</option>
          </select>
        </div>
        <div className="ml-auto flex items-center gap-1 border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setView("grid")}
            className={`px-3 py-2 text-sm ${view === "grid" ? "bg-[#2563EB] text-white" : "text-slate-500 hover:bg-gray-50"}`}
          >
            ⊞
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-3 py-2 text-sm ${view === "list" ? "bg-[#2563EB] text-white" : "text-slate-500 hover:bg-gray-50"}`}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((exam) => (
            <div key={exam.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group">
              {/* Color bar */}
              <div className={`h-1.5 ${exam.subject === "Matemática" ? "bg-[#2563EB]" : "bg-purple-500"}`} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                    <FileText size={18} className={exam.subject === "Matemática" ? "text-[#2563EB]" : "text-purple-600"} />
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-md font-medium ${statusColors[exam.status]}`}>
                    {exam.status}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[#0F172A] leading-snug mb-1">{exam.title}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                  <span>{exam.grade}</span>
                  <span>·</span>
                  <span>{exam.questions} questões</span>
                  <span>·</span>
                  <span>{exam.applied}x aplicada</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {exam.skills.map((s) => (
                    <span key={s} className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded font-mono">{s}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setPreviewExam(exam)}
                    className="flex items-center gap-1 text-xs text-[#2563EB] hover:underline"
                  >
                    <Eye size={12} /> Prévia
                  </button>
                  <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700">
                    <Download size={12} /> PDF
                  </button>
                  <button
                    onClick={() => navigate("/app/scan-exams")}
                    className="flex items-center gap-1 text-xs text-[#10B981] hover:underline ml-auto"
                  >
                    <ScanLine size={12} /> Escanear
                  </button>
                </div>
              </div>
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">Criado em {exam.created}</span>
                <div className="flex items-center gap-1">
                  <button className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-[#2563EB] hover:bg-blue-50 transition-all">
                    <Edit3 size={12} />
                  </button>
                  <button className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-gray-100 transition-all">
                    <Copy size={12} />
                  </button>
                  <button className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Prova</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Disciplina</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Ano</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Questões</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Aplicações</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((exam) => (
                <tr key={exam.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-4 py-3">
                    <div className="font-medium text-sm text-[#0F172A]">{exam.title}</div>
                    <div className="text-xs text-slate-400">{exam.id} · {exam.created}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-md ${exam.subject === "Matemática" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"}`}>
                      {exam.subject}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{exam.grade}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{exam.questions}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{exam.applied}x</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-md ${statusColors[exam.status]}`}>{exam.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-7 h-7 rounded flex items-center justify-center text-slate-400 hover:text-[#2563EB] hover:bg-blue-50 transition-all">
                        <Eye size={14} />
                      </button>
                      <button className="w-7 h-7 rounded flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-gray-50 transition-all">
                        <Download size={14} />
                      </button>
                      <button className="w-7 h-7 rounded flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-gray-50 transition-all">
                        <Printer size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Preview Modal */}
      {previewExam && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setPreviewExam(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-[#0F172A] text-sm">{previewExam.title}</h2>
                <p className="text-xs text-slate-400">{previewExam.grade} · {previewExam.questions} questões</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 border border-gray-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs hover:bg-gray-50 transition-all">
                  <Download size={12} /> PDF
                </button>
                <button className="flex items-center gap-2 border border-gray-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs hover:bg-gray-50 transition-all">
                  <Printer size={12} /> Imprimir
                </button>
                <button onClick={() => setPreviewExam(null)} className="text-slate-400 hover:text-slate-600 ml-2">✕</button>
              </div>
            </div>
            <div className="p-6">
              {/* Header */}
              <div className="border-2 border-gray-800 rounded-lg p-5 mb-6">
                <div className="text-center mb-4">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Secretaria Municipal de Educação</p>
                  <h1 className="text-lg font-bold text-[#0F172A]">{previewExam.title}</h1>
                  <p className="text-sm text-slate-500 mt-1">{previewExam.grade} · {previewExam.type}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs border-t border-gray-200 pt-4">
                  <div><span className="text-slate-400">Nome:</span> <span className="border-b border-dashed border-gray-400 block w-full h-5 mt-0.5" /></div>
                  <div><span className="text-slate-400">Turma:</span> <span className="border-b border-dashed border-gray-400 block w-full h-5 mt-0.5" /></div>
                  <div><span className="text-slate-400">Data:</span> <span className="border-b border-dashed border-gray-400 block w-full h-5 mt-0.5" /></div>
                </div>
              </div>

              {/* Sample questions */}
              <div className="space-y-5">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="pb-5 border-b border-gray-100 last:border-b-0">
                    <p className="text-sm text-[#0F172A] mb-3">
                      <span className="font-bold">Questão {num}.</span>{" "}
                      {num === 1
                        ? "Resolva a equação 3x − 7 = 14 e determine o valor de x."
                        : num === 2
                        ? "Calcule a área de um triângulo com base 12cm e altura 8cm."
                        : "Em um sistema de equações x + y = 10 e x − y = 4, qual é o valor de x?"}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {["(A) x = 5", "(B) x = 7", "(C) x = 3", "(D) x = 9"].map((alt, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                          <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex-shrink-0" />
                          {alt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
