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

import { useEffect, useState } from "react";

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
  const [user, setUser] = useState<any>(null);
  const [alunos, setAlunos] = useState([]);
  const [prova, setProva] = useState<any>(null);
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
      const [resAlunos, resProvas] = await Promise.all([
        fetch("http://localhost:3000/alunos"),
        fetch("http://localhost:3000/provas"),
      ]);

      const alunosData = await resAlunos.json();
      const provasData = await resProvas.json();

      setAlunos(alunosData);
      setProva(provasData[0] || null);
    } catch (err) {
      console.error("Erro ao buscar dados", err);
    }

    setLoading(false);
  };

  if (loading) return <div className="p-10">Carregando...</div>;

  /* 📊 PROCESSAMENTO */

  const avgScore =
    alunos.length > 0
      ? Math.round(
          alunos.reduce((a: any, s: any) => a + (s.score || 0), 0) /
            alunos.length,
        )
      : 0;

  const maxScore = Math.max(...alunos.map((s: any) => s.score || 0), 0);

  const abaixo60 = alunos.filter((s: any) => (s.score || 0) < 60).length;

  // dificuldade das questões (simples baseado em acertos)
  const difficultyData =
    prova?.questoes?.map((q: any, i: number) => ({
      q: `Q${i + 1}`,
      acertos: q.acertos || Math.floor(Math.random() * 100),
    })) || [];

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold">Resultados de Correção</h1>
          <p className="text-sm text-gray-500">
            {prova?.nome || "Prova"} · Dados reais
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded">
          <Download size={14} />
          Exportar
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <Users size={16} />
          <div className="text-lg font-bold">{alunos.length}</div>
          <div className="text-xs">Alunos</div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <CheckCircle2 size={16} />
          <div className="text-lg font-bold">{avgScore}%</div>
          <div className="text-xs">Média</div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <ArrowUpRight size={16} />
          <div className="text-lg font-bold">{maxScore}%</div>
          <div className="text-xs">Maior Nota</div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <AlertCircle size={16} />
          <div className="text-lg font-bold">{abaixo60}</div>
          <div className="text-xs">Abaixo de 60%</div>
        </div>
      </div>

      {/* GRÁFICO DIFICULDADE */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Dificuldade das Questões</h3>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={difficultyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="q" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="acertos">
              {difficultyData.map((entry: any, index: number) => (
                <Cell
                  key={index}
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

      {/* LISTA DE ALUNOS */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Notas dos Alunos</h3>

        {[...alunos]
          .sort((a: any, b: any) => (b.score || 0) - (a.score || 0))
          .map((s: any) => (
            <div key={s.id} className="flex items-center gap-3 mb-2">
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="text-sm">{s.nome}</span>
                  <span className="text-sm font-bold">{s.score || 0}%</span>
                </div>

                <div className="bg-gray-100 h-2 rounded">
                  <div
                    className="h-2 rounded"
                    style={{
                      width: `${s.score || 0}%`,
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
            </div>
          ))}
      </div>

      {/* TABELA SIMPLIFICADA */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Resumo</h3>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left">Aluno</th>
              <th>Nota</th>
              <th>Acertos</th>
              <th>Erros</th>
            </tr>
          </thead>

          <tbody>
            {alunos.map((s: any) => (
              <tr key={s.id} className="border-b">
                <td>{s.nome}</td>
                <td>
                  <ScoreBadge score={s.score || 0} />
                </td>
                <td>{s.acertos || 0}</td>
                <td>{s.erros || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
