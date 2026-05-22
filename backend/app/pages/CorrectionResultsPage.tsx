import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
  ArrowUpRight,
  Users,
} from "lucide-react";

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 80
      ? "bg-green-100 text-green-700"
      : score >= 60
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700";

  return (
    <span className={`text-xs px-2 py-1 rounded-md font-bold ${color}`}>
      {score}%
    </span>
  );
}

export function CorrectionResultsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [difficultyData, setDifficultyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* 🔄 FETCH BACKEND */
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/corrections/students").then((r) => r.json()),
      fetch("http://localhost:3000/corrections/answers").then((r) => r.json()),
      fetch("http://localhost:3000/corrections/difficulty").then((r) =>
        r.json(),
      ),
    ])
      .then(([students, answers, difficulty]) => {
        setStudents(students || []);
        setCorrectAnswers(answers || []);
        setDifficultyData(difficulty || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando resultados...</p>;

  const avgScore =
    students.length > 0
      ? Math.round(students.reduce((a, s) => a + s.score, 0) / students.length)
      : 0;

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold">Resultados de Correção</h1>
          <p className="text-sm text-gray-500">Simulado · Março 2026</p>
        </div>

        <button className="flex items-center gap-2 border px-3 py-2 rounded">
          <Download size={14} />
          Exportar
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 border rounded">
          <Users size={16} />
          <p className="text-lg font-bold">{students.length}</p>
          <span className="text-xs">Alunos</span>
        </div>

        <div className="bg-white p-4 border rounded">
          <CheckCircle2 size={16} />
          <p className="text-lg font-bold">{avgScore}%</p>
          <span className="text-xs">Média</span>
        </div>

        <div className="bg-white p-4 border rounded">
          <ArrowUpRight size={16} />
          <p className="text-lg font-bold">
            {students.length > 0
              ? Math.max(...students.map((s) => s.score))
              : 0}
            %
          </p>
          <span className="text-xs">Maior nota</span>
        </div>

        <div className="bg-white p-4 border rounded">
          <AlertCircle size={16} />
          <p className="text-lg font-bold">
            {students.filter((s) => s.score < 60).length}
          </p>
          <span className="text-xs">Abaixo de 60%</span>
        </div>
      </div>

      {/* GRÁFICO */}
      <div className="bg-white border p-4 rounded">
        <h3 className="text-sm mb-3">Dificuldade por questão</h3>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={difficultyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="q" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="acertos">
              {difficultyData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={
                    entry.acertos >= 75
                      ? "#10B981"
                      : entry.acertos >= 50
                        ? "#F59E0B"
                        : "#EF4444"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* LISTA DE NOTAS */}
      <div className="bg-white border p-4 rounded">
        <h3 className="text-sm mb-3">Notas dos alunos</h3>

        {students
          .sort((a, b) => b.score - a.score)
          .map((s) => (
            <div key={s.id} className="mb-2">
              <div className="flex justify-between text-sm">
                <span>{s.name}</span>
                <span>{s.score}%</span>
              </div>

              <div className="bg-gray-100 h-2 rounded">
                <div
                  className="h-2 rounded"
                  style={{
                    width: `${s.score}%`,
                    backgroundColor:
                      s.score >= 80
                        ? "#10B981"
                        : s.score >= 60
                          ? "#F59E0B"
                          : "#EF4444",
                  }}
                />
              </div>
            </div>
          ))}
      </div>

      {/* TABELA */}
      <div className="bg-white border rounded overflow-auto">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="p-2 text-left">Aluno</th>
              {correctAnswers.map((_, i) => (
                <th key={i}>Q{i + 1}</th>
              ))}
              <th>Nota</th>
            </tr>
          </thead>

          <tbody>
            {/* GABARITO */}
            <tr className="bg-blue-50">
              <td className="p-2 font-bold">Gabarito</td>
              {correctAnswers.map((ans, i) => (
                <td key={i}>{ans}</td>
              ))}
              <td />
            </tr>

            {students.map((student) => (
              <tr key={student.id}>
                <td className="p-2">{student.name}</td>

                {(student.answers || []).map((ans: string, i: number) => {
                  const correct = ans === correctAnswers[i];

                  return (
                    <td key={i}>
                      <span
                        className={`px-1 rounded ${
                          correct
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {ans}
                      </span>
                    </td>
                  );
                })}

                <td>
                  <ScoreBadge score={student.score} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
