import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type School = {
  id: string;
  name: string;
  zone: string;
  principal: string;
  teachers: number;
  students: number;
  classes: number;
  avgScore: number;
  trend: "up" | "down";
  exams: number;
  scoreHistory: { mes: string; score: number }[];
  skillScores: Record<string, number>;
};

export function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [selected, setSelected] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);

  /* 🔥 FETCH BACKEND */
  useEffect(() => {
    fetch("http://localhost:3000/api/escolas")
      .then((res) => res.json())
      .then((data) => setSchools(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando escolas...</div>;

  const comparisonData = schools.map((s) => ({
    escola: s.name,
    media: s.avgScore,
  }));

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-bold">Escolas</h1>
        <p className="text-sm text-gray-500">
          {schools.length} escolas cadastradas
        </p>
      </div>

      {/* CHART */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Comparativo</h3>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="escola" />
            <YAxis domain={[50, 100]} />
            <Tooltip formatter={(v: number) => `${v}%`} />
            <Bar dataKey="media" fill="#2563EB" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* LISTA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-2">
          {schools.map((school) => (
            <div
              key={school.id}
              onClick={() =>
                setSelected(selected?.id === school.id ? null : school)
              }
              className={`p-4 border rounded cursor-pointer ${
                selected?.id === school.id
                  ? "border-blue-500"
                  : "hover:border-gray-300"
              }`}
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{school.name}</p>
                  <p className="text-xs text-gray-500">
                    {school.zone} • Dir. {school.principal}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <span
                    className={`font-bold ${
                      school.avgScore >= 75
                        ? "text-green-600"
                        : school.avgScore >= 60
                          ? "text-yellow-500"
                          : "text-red-500"
                    }`}
                  >
                    {school.avgScore}%
                  </span>

                  {school.trend === "up" ? (
                    <TrendingUp size={14} />
                  ) : (
                    <TrendingDown size={14} />
                  )}
                </div>
              </div>

              <div className="mt-2 text-xs text-gray-500 flex gap-3">
                <span>{school.students} alunos</span>
                <span>{school.classes} turmas</span>
                <span>{school.exams} provas</span>
              </div>
            </div>
          ))}
        </div>

        {/* DETALHE */}
        {selected && (
          <div className="bg-white p-4 rounded shadow space-y-4">
            <div>
              <h2 className="font-bold">{selected.name}</h2>
              <p className="text-xs text-gray-500">{selected.zone}</p>
            </div>

            {/* TREND */}
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={selected.scoreHistory}>
                <XAxis dataKey="mes" />
                <YAxis domain={[50, 100]} />
                <Tooltip formatter={(v: number) => `${v}%`} />
                <Bar dataKey="score" fill="#2563EB" />
              </BarChart>
            </ResponsiveContainer>

            {/* SKILLS */}
            <div className="space-y-2">
              {Object.entries(selected.skillScores).map(([skill, score]) => (
                <div key={skill}>
                  <div className="flex justify-between text-xs">
                    <span>{skill}</span>
                    <span>{score}%</span>
                  </div>

                  <div className="bg-gray-200 h-2 rounded">
                    <div
                      className="h-2 rounded"
                      style={{
                        width: `${score}%`,
                        backgroundColor:
                          score >= 75
                            ? "#10B981"
                            : score >= 60
                              ? "#F59E0B"
                              : "#EF4444",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 text-center pt-2 border-t">
              <div>
                <p className="font-bold">{selected.teachers}</p>
                <p className="text-xs text-gray-500">Prof.</p>
              </div>
              <div>
                <p className="font-bold">{selected.students}</p>
                <p className="text-xs text-gray-500">Alunos</p>
              </div>
              <div>
                <p className="font-bold">{selected.classes}</p>
                <p className="text-xs text-gray-500">Turmas</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
