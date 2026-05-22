import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function DashboardPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [provas, setProvas] = useState<any[]>([]);
  const [questoes, setQuestoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* 🔐 AUTH + LOAD */
  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      navigate("/login");
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      fetchData();
    } catch {
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, []);

  /* 🔄 FETCH BACKEND */
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

      setUsuarios(usuariosData || []);
      setProvas(provasData || []);
      setQuestoes(questoesData || []);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    } finally {
      setLoading(false);
    }
  };

  /* 🔄 LOADING */
  if (loading) {
    return <div className="p-4">Carregando dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">
            Dashboard ({user?.tipo || "Usuário"})
          </h1>
          <p className="text-sm text-gray-500">Dados em tempo real</p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
          className="text-red-500 text-sm hover:underline"
        >
          Sair
        </button>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Usuários" value={usuarios.length} />
        <Card title="Provas" value={provas.length} />
        <Card title="Questões" value={questoes.length} />
      </div>

      {/* ÚLTIMAS PROVAS */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-3">Últimas Provas</h2>

        {provas.length === 0 ? (
          <p className="text-sm text-gray-500">Nenhuma prova cadastrada</p>
        ) : (
          provas.slice(0, 5).map((p) => (
            <div key={p.id} className="border-b py-2">
              <p className="font-medium">{p.nome || "Sem nome"}</p>
              <p className="text-xs text-gray-500">{p.tipo}</p>
            </div>
          ))
        )}
      </div>

      {/* AÇÕES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <ActionButton
          label="Gerar Prova"
          color="bg-blue-600"
          onClick={() => navigate("/app/exam-generator")}
        />

        <ActionButton
          label="Banco de Questões"
          color="bg-purple-600"
          onClick={() => navigate("/app/question-bank")}
        />

        {user?.tipo === "secretaria" && (
          <ActionButton
            label="Gerenciar Usuários"
            color="bg-green-600"
            onClick={() => navigate("/app/users")}
          />
        )}
      </div>
    </div>
  );
}

/* 🔹 COMPONENTES AUXILIARES */

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-sm text-gray-500">{title}</h2>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

function ActionButton({
  label,
  onClick,
  color,
}: {
  label: string;
  onClick: () => void;
  color: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`${color} text-white p-3 rounded hover:opacity-90 transition`}
    >
      {label}
    </button>
  );
}
