import { useState, useEffect } from "react";
import {
  Plus,
  Upload,
  Search,
  Filter,
  Eye,
  Edit3,
  Archive,
  Star,
  MoreHorizontal,
} from "lucide-react";

type Question = {
  id: string;
  text: string;
  subject: string;
  grade: string;
  skill: string;
  difficulty: string;
  usage: number;
  status: string;
};

export function QuestionBankPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("Todas");
  const [grade, setGrade] = useState("Todas");
  const [difficulty, setDifficulty] = useState("Todas");
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  /* 🔥 FETCH BACKEND */
  useEffect(() => {
    fetch("http://localhost:3000/api/questoes")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando questões...</p>;

  /* 🔍 FILTER */
  const filtered = questions.filter((q) => {
    const matchSearch =
      q.text?.toLowerCase().includes(search.toLowerCase()) ||
      q.skill?.toLowerCase().includes(search.toLowerCase());

    const matchSubject = subject === "Todas" || q.subject === subject;
    const matchGrade = grade === "Todas" || q.grade === grade;
    const matchDiff = difficulty === "Todas" || q.difficulty === difficulty;

    return matchSearch && matchSubject && matchGrade && matchDiff;
  });

  /* 🔘 SELECT */
  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold">Banco de Questões</h1>
          <p className="text-sm text-gray-500">{questions.length} questões</p>
        </div>

        <div className="flex gap-2">
          <button className="border px-3 py-2 rounded flex gap-2 items-center">
            <Upload size={14} /> Importar
          </button>

          <button className="bg-blue-600 text-white px-3 py-2 rounded flex gap-2 items-center">
            <Plus size={14} /> Nova
          </button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-2">
        <input
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 flex-1 rounded"
        />

        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option>Todas</option>
          <option>Matemática</option>
          <option>L. Portuguesa</option>
        </select>

        <select value={grade} onChange={(e) => setGrade(e.target.value)}>
          <option>Todas</option>
          <option>6º Ano</option>
          <option>7º Ano</option>
          <option>8º Ano</option>
          <option>9º Ano</option>
        </select>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option>Todas</option>
          <option>Fácil</option>
          <option>Médio</option>
          <option>Difícil</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500">
            <tr>
              <th className="p-3">
                <input
                  type="checkbox"
                  checked={
                    selected.length === filtered.length && filtered.length > 0
                  }
                  onChange={(e) =>
                    setSelected(
                      e.target.checked ? filtered.map((q) => q.id) : [],
                    )
                  }
                />
              </th>
              <th className="p-3 text-left">Questão</th>
              <th>Disciplina</th>
              <th>Ano</th>
              <th>Habilidade</th>
              <th>Dificuldade</th>
              <th>Uso</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((q) => (
              <tr key={q.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selected.includes(q.id)}
                    onChange={() => toggleSelect(q.id)}
                  />
                </td>

                <td className="p-3">
                  <p className="font-medium">{q.text}</p>
                  <span className="text-xs text-gray-400">{q.id}</span>
                </td>

                <td>{q.subject}</td>
                <td>{q.grade}</td>
                <td>{q.skill}</td>

                <td>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      q.difficulty === "Fácil"
                        ? "bg-green-100 text-green-700"
                        : q.difficulty === "Médio"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {q.difficulty}
                  </span>
                </td>

                <td>
                  <div className="flex items-center gap-1">
                    <Star size={12} />
                    {q.usage}
                  </div>
                </td>

                <td>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      q.status === "Ativo"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {q.status}
                  </span>
                </td>

                <td>
                  <div className="flex gap-1">
                    <button>
                      <Eye size={14} />
                    </button>
                    <button>
                      <Edit3 size={14} />
                    </button>
                    <button>
                      <Archive size={14} />
                    </button>
                    <button>
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* BULK ACTION */}
      {selected.length > 0 && (
        <div className="text-sm text-gray-500">
          {selected.length} selecionadas
        </div>
      )}
    </div>
  );
}
