import { useEffect, useState } from "react";
import {
  Users,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Eye,
  Plus,
  ChevronRight,
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
  const [user, setUser] = useState<any>(null);
  const [turmas, setTurmas] = useState([]);
  const [selected, setSelected] = useState<any>(null);
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
      const res = await fetch("http://localhost:3000/turmas");
      const data = await res.json();

      setTurmas(data);
      setSelected(data[0] || null);
    } catch (err) {
      console.error("Erro ao buscar turmas", err);
    }

    setLoading(false);
  };

  if (loading) return <div className="p-10">Carregando...</div>;

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Turmas</h1>
          <p className="text-sm text-gray-500">
            {turmas.length} turmas cadastradas
          </p>
        </div>

        <button className="flex items-center gap-2 bg-[#2563EB] text-white px-4 py-2 rounded-lg text-sm">
          <Plus size={15} />
          Nova Turma
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* LISTA */}
        <div className="space-y-2">
          {turmas.map((cls: any) => (
            <button
              key={cls.id}
              onClick={() => setSelected(cls)}
              className={`w-full text-left p-4 rounded-xl border ${
                selected?.id === cls.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-100 bg-white"
              }`}
            >
              <div className="flex justify-between mb-2">
                <div>
                  <div className="text-sm font-semibold">{cls.nome}</div>
                  <div className="text-xs text-gray-400">{cls.escola}</div>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold">{cls.media || 0}%</span>

                  {cls.trend === "up" ? (
                    <TrendingUp size={13} className="text-green-500" />
                  ) : (
                    <TrendingDown size={13} className="text-red-500" />
                  )}
                </div>
              </div>

              <div className="flex gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Users size={11} />
                  {cls.alunos || 0}
                </span>

                <span className="flex items-center gap-1">
                  <BarChart3 size={11} />
                  {cls.provas || 0}
                </span>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 bg-gray-100 h-1.5 rounded">
                  <div
                    className="h-1.5 bg-blue-500 rounded"
                    style={{ width: `${cls.media || 0}%` }}
                  />
                </div>
                <ChevronRight size={12} />
              </div>
            </button>
          ))}
        </div>

        {/* DETALHE */}
        {selected && (
          <div className="lg:col-span-2 space-y-4">
            {/* CARD PRINCIPAL */}
            <div className="bg-white p-5 rounded shadow">
              <div className="flex justify-between mb-4">
                <div>
                  <h2 className="font-bold text-lg">{selected.nome}</h2>
                  <p className="text-sm text-gray-400">
                    {selected.escola} · {selected.professor}
                  </p>
                </div>

                <button className="text-blue-600 text-xs flex items-center gap-1">
                  <Eye size={13} />
                  Ver alunos
                </button>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div className="text-center">
                  <div className="font-bold">{selected.alunos}</div>
                  <div className="text-xs text-gray-400">Alunos</div>
                </div>

                <div className="text-center">
                  <div className="font-bold">{selected.media}%</div>
                  <div className="text-xs text-gray-400">Média</div>
                </div>

                <div className="text-center">
                  <div className="font-bold">{selected.provas}</div>
                  <div className="text-xs text-gray-400">Provas</div>
                </div>

                <div className="text-center">
                  <div className="font-bold">
                    {selected.trend === "up" ? "↑" : "↓"}
                  </div>
                  <div className="text-xs text-gray-400">Tendência</div>
                </div>
              </div>
            </div>

            {/* GRÁFICO */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold mb-2">Evolução</h3>

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

            {/* HABILIDADES */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold mb-2">Habilidades</h3>

              {(selected.skills || []).map((s: any) => (
                <div key={s.nome} className="flex items-center gap-3 mb-2">
                  <span className="text-xs w-28">{s.nome}</span>

                  <div className="flex-1 bg-gray-100 h-3 rounded">
                    <div
                      className="h-3 rounded"
                      style={{
                        width: `${s.valor}%`,
                        backgroundColor:
                          s.valor >= 75
                            ? "#10B981"
                            : s.valor >= 60
                              ? "#F59E0B"
                              : "#EF4444",
                      }}
                    />
                  </div>

                  <span className="text-xs font-bold">{s.valor}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
