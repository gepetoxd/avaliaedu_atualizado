import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  Download,
  Printer,
  Edit3,
  Eye,
  Copy,
  Trash2,
  FileText,
  Filter,
  ScanLine,
} from "lucide-react";

type Exam = {
  id: string;
  title: string;
  subject: string;
  grade: string;
  type: string;
  questions: number;
  created: string;
  applied: number;
  status: string;
  skills: string[];
};

const statusColors: Record<string, string> = {
  Publicado: "bg-emerald-100 text-emerald-700",
  Rascunho: "bg-yellow-100 text-yellow-700",
  Arquivado: "bg-gray-100 text-gray-500",
};

export function ExamLibraryPage() {
  const navigate = useNavigate();

  const [exams, setExams] = useState<Exam[]>([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [previewExam, setPreviewExam] = useState<Exam | null>(null);

  const [loading, setLoading] = useState(true);

  const [subjectFilter, setSubjectFilter] = useState("Todas");
  const [gradeFilter, setGradeFilter] = useState("Todos");
  const [statusFilter, setStatusFilter] = useState("Todos");

  /* 🔄 FETCH BACKEND */
  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/provas");
      const data = await res.json();

      setExams(data || []);
    } catch (err) {
      console.error("Erro ao buscar provas:", err);
    } finally {
      setLoading(false);
    }
  };

  /* 🔍 FILTER */
  const filtered = exams.filter((e) => {
    const matchSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.subject.toLowerCase().includes(search.toLowerCase());

    const matchSubject =
      subjectFilter === "Todas" || e.subject === subjectFilter;

    const matchGrade = gradeFilter === "Todos" || e.grade === gradeFilter;

    const matchStatus = statusFilter === "Todos" || e.status === statusFilter;

    return matchSearch && matchSubject && matchGrade && matchStatus;
  });

  if (loading) return <p className="p-4">Carregando provas...</p>;

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A]">
            Biblioteca de Provas
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {exams.length} provas cadastradas
          </p>
        </div>

        <button
          onClick={() => navigate("/app/exam-generator")}
          className="flex items-center gap-2 bg-[#2563EB] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          <FileText size={15} />
          Criar Nova Prova
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Buscar provas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-slate-400" />

          <select
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="border px-2 py-2 rounded text-sm"
          >
            <option>Todas</option>
            <option>Matemática</option>
            <option>L. Portuguesa</option>
          </select>

          <select
            onChange={(e) => setGradeFilter(e.target.value)}
            className="border px-2 py-2 rounded text-sm"
          >
            <option>Todos</option>
            <option>6º Ano</option>
            <option>7º Ano</option>
            <option>8º Ano</option>
            <option>9º Ano</option>
          </select>

          <select
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-2 py-2 rounded text-sm"
          >
            <option>Todos</option>
            <option>Publicado</option>
            <option>Rascunho</option>
            <option>Arquivado</option>
          </select>
        </div>

        {/* View toggle */}
        <div className="ml-auto flex border rounded overflow-hidden">
          <button
            onClick={() => setView("grid")}
            className={`px-3 py-2 ${view === "grid" ? "bg-blue-600 text-white" : ""}`}
          >
            ⊞
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-3 py-2 ${view === "list" ? "bg-blue-600 text-white" : ""}`}
          >
            ☰
          </button>
        </div>
      </div>

      {/* GRID */}
      {view === "grid" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((exam) => (
            <div
              key={exam.id}
              className="bg-white border rounded-xl p-4 shadow-sm"
            >
              <div className="flex justify-between mb-2">
                <FileText size={18} />
                <span
                  className={`text-xs px-2 py-1 rounded ${statusColors[exam.status]}`}
                >
                  {exam.status}
                </span>
              </div>

              <h3 className="text-sm font-semibold">{exam.title}</h3>

              <p className="text-xs text-gray-400 mt-1">
                {exam.grade} · {exam.questions} questões
              </p>

              <div className="flex gap-2 mt-3 text-xs">
                <button onClick={() => setPreviewExam(exam)}>
                  <Eye size={12} /> Prévia
                </button>
                <button>
                  <Download size={12} /> PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LIST */}
      {view === "list" && (
        <div className="bg-white border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500">
                <th className="p-3 text-left">Prova</th>
                <th>Disciplina</th>
                <th>Ano</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((exam) => (
                <tr key={exam.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{exam.title}</td>
                  <td>{exam.subject}</td>
                  <td>{exam.grade}</td>
                  <td>
                    <span
                      className={`text-xs px-2 py-1 rounded ${statusColors[exam.status]}`}
                    >
                      {exam.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      {previewExam && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center"
          onClick={() => setPreviewExam(null)}
        >
          <div
            className="bg-white p-6 rounded-xl w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-bold mb-2">{previewExam.title}</h2>
            <p className="text-sm text-gray-500">
              {previewExam.grade} · {previewExam.questions} questões
            </p>

            <div className="mt-4">
              <p className="text-sm">Prévia simples da prova...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
