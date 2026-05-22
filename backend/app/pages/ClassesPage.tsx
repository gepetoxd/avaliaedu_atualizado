import { useEffect, useState } from "react";
import {
  Users,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Eye,
  Plus,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function ClassesPage() {
  const [classes, setClasses] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [skills, setSkills] = useState<any[]>([]);
  const [topStudents, setTopStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* 🔄 FETCH BACKEND */
  useEffect(() => {
    fetch("http://localhost:3000/classes")
      .then((res) => res.json())
      .then((data) => {
        setClasses(data || []);
        setSelected(data?.[0] || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* 🔄 FETCH DETALHES */
  useEffect(() => {
    if (!selected) return;

    Promise.all([
      fetch(`http://localhost:3000/classes/${selected.id}/skills`).then((r) =>
        r.json(),
      ),
      fetch(`http://localhost:3000/classes/${selected.id}/top-students`).then(
        (r) => r.json(),
      ),
    ])
      .then(([skills, top]) => {
        setSkills(skills || []);
        setTopStudents(top || []);
      })
      .catch(() => {});
  }, [selected]);

  if (loading) return <p>Carregando turmas...</p>;

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Turmas</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded">
          <Plus size={14} />
          Nova Turma
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* LISTA */}
        <div className="space-y-2">
          {classes.map((cls) => (
            <button
              key={cls.id}
              onClick={() => setSelected(cls)}
              className={`w-full text-left p-3 border rounded ${
                selected?.id === cls.id ? "bg-blue-50 border-blue-500" : ""
              }`}
            >
              <div className="flex justify-between">
                <span className="font-semibold">{cls.name}</span>

                <div className="flex items-center gap-1">
                  <span>{cls.avgScore}%</span>
                  {cls.trend === "up" ? (
                    <TrendingUp size={12} className="text-green-500" />
                  ) : (
                    <TrendingDown size={12} className="text-red-500" />
                  )}
                </div>
              </div>

              <div className="text-xs text-gray-400">{cls.school}</div>

              <div className="flex gap-2 text-xs mt-1 text-gray-500">
                <span className="flex items-center gap-1">
                  <Users size={10} /> {cls.students}
                </span>
                <span className="flex items-center gap-1">
                  <BarChart3 size={10} /> {cls.examsApplied}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* DETALHE */}
        {selected && (
          <div className="col-span-2 space-y-4">
            {/* INFO */}
            <div className="bg-white border p-4 rounded">
              <h2 className="font-bold text-lg">{selected.name}</h2>
              <p className="text-sm text-gray-500">
                {selected.school} · {selected.teacher}
              </p>

              <div className="grid grid-cols-4 gap-3 mt-3 text-center">
                <div>
                  <p className="font-bold">{selected.students}</p>
                  <span className="text-xs">Alunos</span>
                </div>
                <div>
                  <p className="font-bold">{selected.avgScore}%</p>
                  <span className="text-xs">Média</span>
                </div>
                <div>
                  <p className="font-bold">{selected.examsApplied}</p>
                  <span className="text-xs">Provas</span>
                </div>
                <div>
                  <p className="font-bold">
                    {selected.trend === "up" ? "↑" : "↓"}
                  </p>
                  <span className="text-xs">Tendência</span>
                </div>
              </div>
            </div>

            {/* GRÁFICO */}
            <div className="bg-white border p-4 rounded">
              <h3 className="text-sm mb-2">Evolução</h3>

              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={selected.scores || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="media" fill="#2563EB" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* TOP ALUNOS */}
            <div className="bg-white border p-4 rounded">
              <h3 className="text-sm mb-2">Top Alunos</h3>

              {topStudents.map((s, i) => (
                <div key={s.name} className="flex justify-between text-sm">
                  <span>
                    {i + 1}. {s.name}
                  </span>
                  <span className="font-bold text-green-600">{s.score}%</span>
                </div>
              ))}
            </div>

            {/* SKILLS */}
            <div className="bg-white border p-4 rounded">
              <h3 className="text-sm mb-2">Habilidades</h3>

              {skills.map((s) => (
                <div key={s.skill} className="mb-2">
                  <div className="flex justify-between text-xs">
                    <span>{s.skill}</span>
                    <span>{s.score}%</span>
                  </div>

                  <div className="bg-gray-100 h-2 rounded">
                    <div
                      className="h-2 rounded"
                      style={{
                        width: `${s.score}%`,
                        backgroundColor:
                          s.score >= 75
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
          </div>
        )}
      </div>
    </div>
  );
}
