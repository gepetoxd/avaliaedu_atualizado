import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  School,
  Users,
  GraduationCap,
  FileText,
  TrendingUp,
  Award,
  MapPin,
  AlertTriangle,
} from "lucide-react";

export function AdminPanelPage() {
  const [kpis, setKpis] = useState<any[]>([]);
  const [trend, setTrend] = useState<any[]>([]);
  const [schools, setSchools] = useState<any[]>([]);
  const [geo, setGeo] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* 🔄 FETCH BACKEND */
  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3000/admin/kpis").then((r) => r.json()),
      fetch("http://localhost:3000/admin/trend").then((r) => r.json()),
      fetch("http://localhost:3000/admin/schools").then((r) => r.json()),
      fetch("http://localhost:3000/admin/geo").then((r) => r.json()),
      fetch("http://localhost:3000/admin/skills").then((r) => r.json()),
      fetch("http://localhost:3000/admin/alerts").then((r) => r.json()),
    ])
      .then(([kpis, trend, schools, geo, skills, alerts]) => {
        setKpis(kpis || []);
        setTrend(trend || []);
        setSchools(schools || []);
        setGeo(geo || []);
        setSkills(skills || []);
        setAlerts(alerts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando painel...</p>;

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Painel Administrativo</h1>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon || School;
          return (
            <div key={i} className="bg-white p-4 border rounded">
              <Icon size={18} />
              <div className="text-xl font-bold">{kpi.value}</div>
              <div className="text-sm">{kpi.label}</div>
            </div>
          );
        })}
      </div>

      {/* ALERTS */}
      <div className="bg-white p-4 border rounded">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <AlertTriangle size={14} /> Alertas
        </h3>

        {alerts.map((a, i) => (
          <div key={i} className="text-sm mb-2">
            {a.text}
          </div>
        ))}
      </div>

      {/* GRÁFICOS */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Trend */}
        <div className="bg-white p-4 border rounded">
          <h3 className="text-sm mb-2">Evolução Municipal</h3>

          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="media" stroke="#2563EB" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Schools */}
        <div className="bg-white p-4 border rounded">
          <h3 className="text-sm mb-2">Ranking Escolas</h3>

          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={schools}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="escola" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="media" fill="#2563EB" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* GEO */}
      <div className="bg-white p-4 border rounded">
        <h3 className="mb-3 flex items-center gap-2">
          <MapPin size={14} /> Zonas
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {geo.map((z) => (
            <div key={z.zona} className="border p-3 rounded text-center">
              <div className="font-bold">{z.avgScore}%</div>
              <div className="text-xs">{z.zona}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SKILLS */}
      <div className="bg-white p-4 border rounded">
        <h3 className="mb-3">Habilidades</h3>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={skills}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="skill" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="mat" fill="#2563EB" />
            <Bar dataKey="lp" fill="#8B5CF6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
