import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Filter, Download } from "lucide-react";

export function AnalyticsPage() {
  const [score, setScore] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [radar, setRadar] = useState<any[]>([]);
  const [trend, setTrend] = useState<any[]>([]);
  const [heatmap, setHeatmap] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* 🔄 FETCH BACKEND */
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/analytics/score").then((r) => r.json()),
      fetch("http://localhost:3000/analytics/skills").then((r) => r.json()),
      fetch("http://localhost:3000/analytics/radar").then((r) => r.json()),
      fetch("http://localhost:3000/analytics/trend").then((r) => r.json()),
      fetch("http://localhost:3000/analytics/heatmap").then((r) => r.json()),
    ])
      .then(([score, skills, radar, trend, heatmap]) => {
        setScore(score || []);
        setSkills(skills || []);
        setRadar(radar || []);
        setTrend(trend || []);
        setHeatmap(heatmap || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando analytics...</p>;

  const skillKeys = heatmap.length
    ? Object.keys(heatmap[0]).filter((k) => k !== "grade")
    : [];

  function getColor(v: number) {
    if (v >= 80) return "#10B981";
    if (v >= 60) return "#F59E0B";
    return "#EF4444";
  }

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Analytics</h1>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded">
          <Download size={14} />
          Exportar
        </button>
      </div>

      {/* FILTRO */}
      <div className="flex items-center gap-2">
        <Filter size={14} />
        <select className="border p-1 rounded text-sm">
          <option>Março 2026</option>
        </select>
      </div>

      {/* BAR CHART */}
      <div className="bg-white p-4 border rounded">
        <h3 className="text-sm mb-2">Desempenho por Turma</h3>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={score}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="turma" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Mat" fill="#2563EB" />
            <Bar dataKey="LP" fill="#8B5CF6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* RADAR */}
      <div className="bg-white p-4 border rounded">
        <h3 className="text-sm mb-2">Radar de Habilidades</h3>

        <ResponsiveContainer width="100%" height={220}>
          <RadarChart data={radar}>
            <PolarGrid />
            <PolarAngleAxis dataKey="skill" />
            <PolarRadiusAxis domain={[0, 100]} />
            <Radar
              dataKey="value"
              stroke="#2563EB"
              fill="#2563EB"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* TREND */}
      <div className="bg-white p-4 border rounded">
        <h3 className="text-sm mb-2">Evolução</h3>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={trend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="saeb" stroke="#2563EB" />
            <Line dataKey="spaece" stroke="#10B981" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* SKILLS LIST */}
      <div className="bg-white p-4 border rounded">
        <h3 className="text-sm mb-2">Domínio de Habilidades</h3>

        {skills.map((s) => (
          <div key={s.skill} className="mb-2">
            <div className="flex justify-between text-xs">
              <span>{s.skill}</span>
              <span>{s.mastery}%</span>
            </div>

            <div className="bg-gray-100 h-2 rounded">
              <div
                className="h-2 rounded"
                style={{
                  width: `${s.mastery}%`,
                  backgroundColor: getColor(s.mastery),
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* HEATMAP */}
      <div className="bg-white p-4 border rounded overflow-x-auto">
        <h3 className="text-sm mb-2">Heatmap</h3>

        <table className="w-full text-xs">
          <thead>
            <tr>
              <th>Ano</th>
              {skillKeys.map((k) => (
                <th key={k}>{k}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {heatmap.map((row) => (
              <tr key={row.grade}>
                <td>{row.grade}</td>

                {skillKeys.map((k) => (
                  <td key={k} className="text-center">
                    {row[k]}%
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
