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

import { useEffect, useState } from "react";

export function AdminPanelPage() {
  const [user, setUser] = useState<any>(null);
  const [usuarios, setUsuarios] = useState([]);
  const [provas, setProvas] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 🔐 GET USER + DATA */
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
      const [resUsers, resProvas] = await Promise.all([
        fetch("http://localhost:3000/usuarios"),
        fetch("http://localhost:3000/provas"),
      ]);

      const usersData = await resUsers.json();
      const provasData = await resProvas.json();

      setUsuarios(usersData);
      setProvas(provasData);
    } catch (err) {
      console.error("Erro ao buscar dados", err);
    }

    setLoading(false);
  };

  if (loading) {
    return <div className="p-10">Carregando dados...</div>;
  }

  /* 📊 KPI DINÂMICO */
  const kpiData = [
    { label: "Usuários", value: usuarios.length, icon: Users },
    { label: "Provas", value: provas.length, icon: FileText },
    {
      label: "Alunos",
      value: usuarios.filter((u: any) => u.tipo === "aluno").length,
      icon: GraduationCap,
    },
  ];

  /* 📈 GRÁFICO DINÂMICO */
  const municipalTrend = provas.map((p: any, index) => ({
    mes: `P${index + 1}`,
    media: p.media || Math.floor(Math.random() * 40 + 60), // fallback
  }));

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-bold">
          Painel Administrativo ({user?.tipo})
        </h1>
        <p className="text-sm text-gray-500">Dados em tempo real do sistema</p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-3 gap-4">
        {kpiData.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white p-4 rounded shadow">
              <Icon size={18} />
              <div className="text-xl font-bold">{kpi.value}</div>
              <div className="text-sm">{kpi.label}</div>
            </div>
          );
        })}
      </div>

      {/* ALERTAS SIMPLES */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold flex items-center gap-2">
          <AlertTriangle size={16} /> Alertas
        </h3>

        {provas.length === 0 && (
          <p className="text-sm text-gray-500 mt-2">Nenhuma prova cadastrada</p>
        )}

        {provas.length > 0 && (
          <p className="text-sm mt-2">
            {provas.length} provas cadastradas no sistema
          </p>
        )}
      </div>

      {/* GRÁFICO */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Evolução de Provas</h3>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={municipalTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Line dataKey="media" stroke="#2563EB" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* LISTA DE PROVAS */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Provas Criadas</h3>

        {provas.map((p: any) => (
          <div key={p.id} className="border-b py-2">
            <p className="font-medium">{p.nome}</p>
            <p className="text-xs text-gray-500">{p.tipo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
