import { useState, useEffect } from "react";
import {
  School,
  Users,
  BarChart3,
  TrendingUp,
  TrendingDown,
  MapPin,
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

export function SchoolsPage() {
  const [schools, setSchools] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);

  /* 🔄 BUSCAR DADOS DO BACKEND */
  useEffect(() => {
    fetch("http://localhost:3000/schools")
      .then((res) => res.json())
      .then(setSchools);
  }, []);

  const comparisonData = schools.map((s) => ({
    escola: s.name.replace("E.M. ", ""),
    media: s.avgScore,
  }));

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-bold">Escolas</h1>
        <p className="text-sm text-slate-500">
          {schools.length} escolas cadastradas
        </p>
      </div>

      {/* CHART */}
      <div className="bg-white p-5 rounded border">
        <h3 className="text-sm font-semibold mb-3">
          Comparativo de Desempenho
        </h3>

        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="escola" />
            <YAxis domain={[50, 100]} />
            <Tooltip />
            <Bar dataKey="media" fill="#2563EB" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* LISTA + DETALHE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* LISTA */}
        <div className="space-y-3">
          {schools.map((school, i) => (
            <div
              key={school.id}
              onClick={() =>
                setSelected(selected?.id === school.id ? null : school)
              }
              className={`p-4 rounded border cursor-pointer ${
                selected?.id === school.id
                  ? "border-blue-500"
                  : "border-gray-200"
              }`}
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">{school.name}</h3>

                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <MapPin size={10} />
                    {school.zone}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <span className="font-bold">{school.avgScore}%</span>

                  {school.trend === "up" ? (
                    <TrendingUp size={14} className="text-green-500" />
                  ) : (
                    <TrendingDown size={14} className="text-red-500" />
                  )}
                </div>
              </div>

              <div className="flex gap-4 text-xs mt-2 text-gray-400">
                <span className="flex items-center gap-1">
                  <Users size={11} /> {school.students}
                </span>
                <span className="flex items-center gap-1">
                  <School size={11} /> {school.classes}
                </span>
                <span className="flex items-center gap-1">
                  <BarChart3 size={11} /> {school.exams}
                </span>
              </div>

              <div className="w-full bg-gray-100 h-1.5 mt-2 rounded">
                <div
                  className="h-1.5 bg-blue-600 rounded"
                  style={{ width: `${school.avgScore}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* DETALHE */}
        {selected && (
          <div className="p-5 border rounded space-y-4">
            <div>
              <h2 className="font-bold">{selected.name}</h2>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <MapPin size={10} />
                {selected.zone}
              </p>
            </div>

            {/* GRÁFICO */}
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={selected.scoreHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis domain={[50, 100]} />
                <Tooltip />
                <Bar dataKey="score" fill="#2563EB" />
              </BarChart>
            </ResponsiveContainer>

            {/* HABILIDADES */}
            <div>
              <h4 className="text-xs font-semibold mb-2">Habilidades</h4>

              {selected.skillScores &&
                Object.entries(selected.skillScores).map(
                  ([skill, score]: any) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 text-xs mb-1"
                    >
                      <span className="w-24">{skill}</span>

                      <div className="flex-1 bg-gray-100 h-2 rounded">
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

                      <span className="w-8 text-right">{score}%</span>
                    </div>
                  ),
                )}
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-3 text-center border-t pt-3">
              <div>
                <p className="font-bold">{selected.teachers}</p>
                <span className="text-xs text-gray-400">Professores</span>
              </div>
              <div>
                <p className="font-bold">{selected.students}</p>
                <span className="text-xs text-gray-400">Alunos</span>
              </div>
              <div>
                <p className="font-bold">{selected.classes}</p>
                <span className="text-xs text-gray-400">Turmas</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
