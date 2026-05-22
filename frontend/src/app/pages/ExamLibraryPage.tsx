import { useEffect, useState } from "react";
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

export function ExamLibraryPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [provas, setProvas] = useState([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [previewExam, setPreviewExam] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  /* 🔐 USER + FETCH */
  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      window.location.href = "/login";
      return;
    }

    const parsed = JSON.parse(stored);
    setUser(parsed);

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3000/provas");
      const data = await res.json();
      setProvas(data);
    } catch (err) {
      console.error("Erro ao buscar provas", err);
    }

    setLoading(false);
  };

  if (loading) return <div className="p-10">Carregando...</div>;

  /* 🔎 FILTRO */
  const filtered = provas.filter(
    (e: any) =>
      e.titulo?.toLowerCase().includes(search.toLowerCase()) ||
      e.disciplina?.toLowerCase().includes(search.toLowerCase()),
  );

  /* 🎨 STATUS */
  const statusColors: any = {
    Publicado: "bg-emerald-100 text-emerald-700",
    Rascunho: "bg-yellow-100 text-yellow-700",
    Arquivado: "bg-gray-100 text-gray-500",
  };

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold">Biblioteca de Provas</h1>
          <p className="text-sm text-gray-500">
            {provas.length} provas cadastradas
          </p>
        </div>

        <button
          onClick={() => navigate("/app/exam-generator")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          <FileText size={15} />
          Nova Prova
        </button>
      </div>

      {/* BUSCA */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Buscar provas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded"
          />
        </div>

        <div className="flex items-center gap-1 border rounded overflow-hidden">
          <button
            onClick={() => setView("grid")}
            className={
              view === "grid" ? "bg-blue-600 text-white px-3 py-2" : "px-3 py-2"
            }
          >
            ⊞
          </button>

          <button
            onClick={() => setView("list")}
            className={
              view === "list" ? "bg-blue-600 text-white px-3 py-2" : "px-3 py-2"
            }
          >
            ☰
          </button>
        </div>
      </div>

      {/* GRID */}
      {view === "grid" && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((exam: any) => (
            <div key={exam.id} className="bg-white rounded border shadow">
              <div className="p-4">
                <div className="flex justify-between mb-2">
                  <FileText size={18} />
                  <span
                    className={`text-xs px-2 py-1 rounded ${statusColors[exam.status]}`}
                  >
                    {exam.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold">{exam.titulo}</h3>

                <p className="text-xs text-gray-400">
                  {exam.ano} · {exam.questoes} questões
                </p>

                <div className="mt-2 flex flex-wrap gap-1">
                  {(exam.habilidades || []).map((s: string) => (
                    <span key={s} className="text-xs bg-gray-100 px-2 rounded">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 mt-3 text-xs">
                  <button onClick={() => setPreviewExam(exam)}>Ver</button>
                  <button>PDF</button>
                  <button onClick={() => navigate("/app/scan-exams")}>
                    Escanear
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LIST */}
      {view === "list" && (
        <div className="bg-white rounded border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3">Prova</th>
                <th>Disciplina</th>
                <th>Ano</th>
                <th>Questões</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((exam: any) => (
                <tr key={exam.id} className="border-t">
                  <td className="p-3">{exam.titulo}</td>
                  <td>{exam.disciplina}</td>
                  <td>{exam.ano}</td>
                  <td>{exam.questoes}</td>
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
            className="bg-white p-5 rounded w-[600px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-bold mb-2">{previewExam.titulo}</h2>

            <p className="text-sm text-gray-400 mb-4">
              {previewExam.ano} · {previewExam.tipo}
            </p>

            <div className="space-y-3">
              {(previewExam.questoesLista || []).map((q: any, i: number) => (
                <div key={i}>
                  <p className="text-sm font-medium">
                    {i + 1}. {q.pergunta}
                  </p>

                  {q.alternativas?.map((alt: string, j: number) => (
                    <div key={j} className="text-xs ml-3">
                      {alt}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
