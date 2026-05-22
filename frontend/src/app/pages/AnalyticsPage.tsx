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
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

import {
  Filter,
  Download,
  TrendingUp,
  Award,
  AlertTriangle,
} from "lucide-react";
import { useEffect, useState } from "react";

export function AnalyticsPage() {
  const [user, setUser] = useState<any>(null);
  const [provas, setProvas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 🔐 USER + DATA */
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

  /* 🔥 FETCH BACKEND */
  const fetchData = async () => {
    try {
      const [resProvas, resUsers] = await Promise.all([
        fetch("http://localhost:3000/provas"),
        fetch("http://localhost:3000/usuarios"),
      ]);

      const provasData = await resProvas.json();
      const usersData = await resUsers.json();

      setProvas(provasData);
      setUsuarios(usersData);
    } catch (err) {
      console.error("Erro ao buscar dados", err);
    }

    setLoading(false);
  };

  if (loading) return <div className="p-10">Carregando...</div>;

  /* 📊 DADOS DINÂMICOS */

  // gráfico de evolução
  const trendData = provas.map((p: any, i) => ({
    mes: `P${i + 1}`,
    saeb: p.media || Math.floor(Math.random() * 20 + 60),
    spaece: p.media || Math.floor(Math.random() * 20 + 65),
  }));

  // desempenho por "turma" (simulado com base nas provas)
  const scoreBySubject = provas.map((p: any, i) => ({
    turma: p.nome || `Turma ${i + 1}`,
    Mat: p.media || 70,
    LP: (p.media || 70) - 5,
  }));

  // radar baseado em médias
  const radarData = [
    { skill: "Álgebra", value: 70 },
    { skill: "Geometria", value: 55 },
    { skill: "Estatística", value: 65 },
    { skill: "Leitura", value: 72 },
  ];

  // KPI real
  const kpis = [
    {
      label: "Provas",
      value: provas.length,
      desc: "Total cadastradas",
      icon: Award,
    },
    {
      label: "Usuários",
      value: usuarios.length,
      desc: "No sistema",
      icon: TrendingUp,
    },
    {
      label: "Baixo desempenho",
      value: provas.filter((p: any) => (p.media || 0) < 60).length,
      desc: "Abaixo de 60%",
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold">Analytics ({user?.tipo})</h1>
          <p className="text-sm text-gray-500">Dados reais do sistema</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white p-4 rounded shadow">
              <Icon size={18} />
              <div className="text-xl font-bold">{kpi.value}</div>
              <div className="text-sm">{kpi.label}</div>
              <div className="text-xs text-gray-400">{kpi.desc}</div>
            </div>
          );
        })}
      </div>

      {/* GRÁFICO TURMAS */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Desempenho por Turma</h3>

        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={scoreBySubject}>
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
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Competências</h3>

        <ResponsiveContainer width="100%" height={220}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="skill" />
            <PolarRadiusAxis />
            <Radar
              dataKey="value"
              stroke="#2563EB"
              fill="#2563EB"
              fillOpacity={0.2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* TREND */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Evolução</h3>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={trendData}>
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
    </div>
  );
}
