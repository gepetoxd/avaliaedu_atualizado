import { useState } from "react";
import { Plus, Upload, Search, Filter, Eye, Edit3, Archive, Star, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";

const questions = [
  {
    id: "Q001",
    text: "Qual é o resultado da expressão 2x + 3 = 11?",
    subject: "Matemática",
    grade: "7º Ano",
    skill: "EF07MA04",
    difficulty: "Médio",
    usage: 34,
    status: "Ativo",
  },
  {
    id: "Q002",
    text: "Identifique o sujeito da oração: 'Os alunos estudaram muito.'",
    subject: "L. Portuguesa",
    grade: "6º Ano",
    skill: "EF06LP01",
    difficulty: "Fácil",
    usage: 67,
    status: "Ativo",
  },
  {
    id: "Q003",
    text: "Calcule a área de um triângulo com base 8cm e altura 5cm.",
    subject: "Matemática",
    grade: "8º Ano",
    skill: "EF08MA12",
    difficulty: "Médio",
    usage: 22,
    status: "Ativo",
  },
  {
    id: "Q004",
    text: "Em relação ao texto lido, qual é a ideia central do segundo parágrafo?",
    subject: "L. Portuguesa",
    grade: "9º Ano",
    skill: "EF09LP08",
    difficulty: "Difícil",
    usage: 15,
    status: "Ativo",
  },
  {
    id: "Q005",
    text: "Qual é o valor de π (pi) utilizado em cálculos de circunferência?",
    subject: "Matemática",
    grade: "6º Ano",
    skill: "EF06MA20",
    difficulty: "Fácil",
    usage: 89,
    status: "Ativo",
  },
  {
    id: "Q006",
    text: "Analise o gráfico e responda: em qual mês houve maior crescimento?",
    subject: "Matemática",
    grade: "8º Ano",
    skill: "EF08MA21",
    difficulty: "Difícil",
    usage: 9,
    status: "Ativo",
  },
  {
    id: "Q007",
    text: "Qual recurso expressivo é usado na frase 'O tempo voa'?",
    subject: "L. Portuguesa",
    grade: "7º Ano",
    skill: "EF07LP16",
    difficulty: "Médio",
    usage: 44,
    status: "Arquivado",
  },
  {
    id: "Q008",
    text: "Resolva o sistema de equações: x+y=5 e x-y=1.",
    subject: "Matemática",
    grade: "9º Ano",
    skill: "EF09MA12",
    difficulty: "Difícil",
    usage: 28,
    status: "Ativo",
  },
];

const difficultyColor: Record<string, string> = {
  Fácil: "bg-green-100 text-green-700",
  Médio: "bg-yellow-100 text-yellow-700",
  Difícil: "bg-red-100 text-red-700",
};

const statusColor: Record<string, string> = {
  Ativo: "bg-emerald-100 text-emerald-700",
  Arquivado: "bg-gray-100 text-gray-500",
};

export function QuestionBankPage() {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("Todas");
  const [grade, setGrade] = useState("Todas");
  const [difficulty, setDifficulty] = useState("Todas");
  const [selected, setSelected] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const filtered = questions.filter((q) => {
    const matchSearch = q.text.toLowerCase().includes(search.toLowerCase()) || q.skill.toLowerCase().includes(search.toLowerCase());
    const matchSubject = subject === "Todas" || q.subject === subject;
    const matchGrade = grade === "Todas" || q.grade === grade;
    const matchDiff = difficulty === "Todas" || q.difficulty === difficulty;
    return matchSearch && matchSubject && matchGrade && matchDiff;
  });

  const toggleSelect = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A]">Banco de Questões</h1>
          <p className="text-sm text-slate-500 mt-0.5">{questions.length} questões cadastradas</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 border border-gray-200 text-slate-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-all"
          >
            <Upload size={15} />
            Importar
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#2563EB] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-sm"
          >
            <Plus size={15} />
            Nova Questão
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-48">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar questões, habilidades..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={15} className="text-slate-400" />
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 bg-white text-slate-600"
            >
              <option>Todas</option>
              <option>Matemática</option>
              <option>L. Portuguesa</option>
            </select>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 bg-white text-slate-600"
            >
              <option>Todas</option>
              <option>6º Ano</option>
              <option>7º Ano</option>
              <option>8º Ano</option>
              <option>9º Ano</option>
            </select>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 bg-white text-slate-600"
            >
              <option>Todas</option>
              <option>Fácil</option>
              <option>Médio</option>
              <option>Difícil</option>
            </select>
          </div>
          {selected.length > 0 && (
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs text-slate-500">{selected.length} selecionadas</span>
              <button className="text-xs text-red-500 hover:underline">Arquivar selecionadas</button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-[#2563EB] rounded"
                  onChange={(e) =>
                    setSelected(e.target.checked ? filtered.map((q) => q.id) : [])
                  }
                  checked={selected.length === filtered.length && filtered.length > 0}
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Questão</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Disciplina</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Ano</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Habilidade</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Dificuldade</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Usos</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((q) => (
              <tr key={q.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#2563EB] rounded"
                    checked={selected.includes(q.id)}
                    onChange={() => toggleSelect(q.id)}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="max-w-xs">
                    <p className="text-sm text-[#0F172A] leading-snug line-clamp-2">{q.text}</p>
                    <span className="text-xs text-slate-400 mt-0.5 block">{q.id}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-md font-medium ${q.subject === "Matemática" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"}`}>
                    {q.subject}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{q.grade}</td>
                <td className="px-4 py-3">
                  <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded font-mono">{q.skill}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-md font-medium ${difficultyColor[q.difficulty]}`}>
                    {q.difficulty}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-[#F59E0B]" />
                    <span className="text-sm text-slate-600">{q.usage}x</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-md font-medium ${statusColor[q.status]}`}>
                    {q.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#2563EB] hover:bg-blue-50 transition-all">
                      <Eye size={14} />
                    </button>
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#F59E0B] hover:bg-yellow-50 transition-all">
                      <Edit3 size={14} />
                    </button>
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all">
                      <Archive size={14} />
                    </button>
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-gray-100 transition-all">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
          <span className="text-xs text-slate-500">Mostrando {filtered.length} de {questions.length} questões</span>
          <div className="flex items-center gap-2">
            <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-slate-400 hover:bg-gray-50">
              <ChevronLeft size={14} />
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={`w-7 h-7 rounded-lg text-xs font-medium transition-all ${
                  p === 1 ? "bg-[#2563EB] text-white" : "border border-gray-200 text-slate-500 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}
            <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-slate-400 hover:bg-gray-50">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Add Question Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-[#0F172A] mb-4">Nova Questão</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Enunciado</label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] resize-none"
                  placeholder="Digite o enunciado da questão..."
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Disciplina</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 bg-white">
                    <option>Matemática</option>
                    <option>Língua Portuguesa</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Ano escolar</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 bg-white">
                    <option>6º Ano</option>
                    <option>7º Ano</option>
                    <option>8º Ano</option>
                    <option>9º Ano</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Habilidade</label>
                  <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30" placeholder="EF07MA04" />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Dificuldade</label>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 bg-white">
                    <option>Fácil</option>
                    <option>Médio</option>
                    <option>Difícil</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {["A", "B", "C", "D"].map((alt) => (
                  <div key={alt}>
                    <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Alternativa {alt}</label>
                    <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30" />
                  </div>
                ))}
              </div>
              <div>
                <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Gabarito</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 bg-white">
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                  <option>D</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-slate-600 hover:bg-gray-50 transition-all">
                Cancelar
              </button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 bg-[#2563EB] text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all">
                Salvar Questão
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
