import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function DashboardPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [usuarios, setUsuarios] = useState([]);
  const [provas, setProvas] = useState([]);
  const [questoes, setQuestoes] = useState([]);

  const [loading, setLoading] = useState(true);

  /* 🔐 PROTEÇÃO + LOAD USER */
  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      navigate("/login");
      return;
    }

    const parsed = JSON.parse(stored);
    setUser(parsed);

    fetchData();
  }, []);

  /* 🔥 BUSCAR DADOS DO BACKEND */
  const fetchData = async () => {
    try {
      const [u, p, q] = await Promise.all([
        fetch("http://localhost:3000/api/usuarios"),
        fetch("http://localhost:3000/api/provas"),
        fetch("http://localhost:3000/api/questoes"),
      ]);

      const usuariosData = await u.json();
      const provasData = await p.json();
      const questoesData = await q.json();

      setUsuarios(usuariosData);
      setProvas(provasData);
      setQuestoes(questoesData);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    }

    setLoading(false);
  };

  /* 🔄 LOADING */
  if (loading) {
    return <div>Carregando dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold">Dashboard ({user?.tipo})</h1>
          <p className="text-sm text-gray-500">Dados em tempo real</p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
          className="text-red-500"
        >
          Sair
        </button>
      </div>

      {/* CARDS DINÂMICOS */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm text-gray-500">Usuários</h2>
          <p className="text-xl font-bold">{usuarios.length}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm text-gray-500">Provas</h2>
          <p className="text-xl font-bold">{provas.length}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-sm text-gray-500">Questões</h2>
          <p className="text-xl font-bold">{questoes.length}</p>
        </div>
      </div>

      {/* LISTA DE PROVAS */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">Últimas Provas</h2>

        {provas.length === 0 && <p>Nenhuma prova cadastrada</p>}

        {provas.map((p: any) => (
          <div key={p.id} className="border-b py-2">
            <p className="font-medium">{p.nome}</p>
            <p className="text-xs text-gray-500">{p.tipo}</p>
          </div>
        ))}
      </div>

      {/* AÇÕES */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate("/app/exam-generator")}
          className="bg-blue-600 text-white p-3 rounded"
        >
          Gerar Prova
        </button>

        <button
          onClick={() => navigate("/app/question-bank")}
          className="bg-purple-600 text-white p-3 rounded"
        >
          Banco de Questões
        </button>

        {user?.tipo === "secretaria" && (
          <button
            onClick={() => navigate("/app/students")}
            className="bg-green-600 text-white p-3 rounded"
          >
            Gerenciar Usuários
          </button>
        )}
      </div>
    </div>
  );
}
