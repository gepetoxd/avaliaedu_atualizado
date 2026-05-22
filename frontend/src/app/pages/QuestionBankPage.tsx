import { useEffect, useState } from "react";
import {
  Plus,
  Upload,
  Search,
  Filter,
  Eye,
  Edit3,
  Archive,
  MoreHorizontal,
} from "lucide-react";

export function QuestionBankPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    text: "",
    subject: "Matemática",
    grade: "6º Ano",
    skill: "",
    difficulty: "Fácil",
    alternativas: ["", "", "", ""],
    correta: "A",
  });

  /* 🔄 FETCH */
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await fetch("http://localhost:3000/questoes");
      const data = await res.json();
      setQuestions(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  /* 🔍 FILTRO */
  const filtered = questions.filter(
    (q) =>
      q.text?.toLowerCase().includes(search.toLowerCase()) ||
      q.skill?.toLowerCase().includes(search.toLowerCase()),
  );

  /* ✔ SELECT */
  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  /* ➕ CRIAR QUESTÃO */
  const handleCreate = async () => {
    try {
      await fetch("http://localhost:3000/questoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setShowModal(false);
      fetchQuestions();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-10">Carregando...</div>;

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold">Banco de Questões</h1>
          <p className="text-sm text-gray-500">{questions.length} questões</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          <Plus size={15} />
          Nova Questão
        </button>
      </div>

      {/* SEARCH */}
      <div className="flex gap-3">
        <div className="relative w-full max-w-sm">
          <Search size={15} className="absolute left-3 top-2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
            className="w-full pl-9 pr-4 py-2 border rounded"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th></th>
              <th className="text-left p-3">Questão</th>
              <th>Disciplina</th>
              <th>Ano</th>
              <th>Habilidade</th>
              <th>Dificuldade</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((q) => (
              <tr key={q.id} className="border-t">
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
                <td>{q.difficulty}</td>

                <td>
                  <div className="flex gap-1">
                    <Eye size={14} />
                    <Edit3 size={14} />
                    <Archive size={14} />
                    <MoreHorizontal size={14} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white p-6 rounded w-[500px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-bold mb-4">Nova Questão</h2>

            <textarea
              placeholder="Enunciado"
              className="w-full border p-2 mb-3"
              onChange={(e) => setForm({ ...form, text: e.target.value })}
            />

            <input
              placeholder="Habilidade"
              className="w-full border p-2 mb-3"
              onChange={(e) => setForm({ ...form, skill: e.target.value })}
            />

            {/* alternativas */}
            {form.alternativas.map((alt, i) => (
              <input
                key={i}
                placeholder={`Alternativa ${String.fromCharCode(65 + i)}`}
                className="w-full border p-2 mb-2"
                onChange={(e) => {
                  const arr = [...form.alternativas];
                  arr[i] = e.target.value;
                  setForm({ ...form, alternativas: arr });
                }}
              />
            ))}

            <select
              onChange={(e) => setForm({ ...form, correta: e.target.value })}
              className="w-full border p-2 mb-4"
            >
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border py-2"
              >
                Cancelar
              </button>

              <button
                onClick={handleCreate}
                className="flex-1 bg-blue-600 text-white py-2"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
