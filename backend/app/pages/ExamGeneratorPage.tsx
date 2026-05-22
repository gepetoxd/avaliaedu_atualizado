import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export function ExamGeneratorPage() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("simulado");
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingUsuarios, setLoadingUsuarios] = useState(true);

  /* 🔐 AUTH */
  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(stored);

      if (!user.id) {
        navigate("/login");
        return;
      }

      setUsuarioId(user.id);
      fetchUsuarios();
    } catch {
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, []);

  /* 🔄 FETCH USUÁRIOS */
  const fetchUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/usuarios");
      const data = await res.json();

      setUsuarios(data || []);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    } finally {
      setLoadingUsuarios(false);
    }
  };

  /* 🚀 CRIAR PROVA */
  const criarProva = async () => {
    if (!nome.trim()) {
      alert("Digite o nome da prova");
      return;
    }

    if (!usuarioId) {
      alert("Usuário inválido");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/provas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          tipo,
          usuarioId,
        }),
      });

      if (!res.ok) throw new Error();

      await res.json();

      alert("Prova criada com sucesso!");
      navigate("/app/dashboard");
    } catch (err) {
      console.error(err);
      alert("Erro ao criar prova");
    } finally {
      setLoading(false);
    }
  };

  /* 🔄 LOADING */
  if (loadingUsuarios) {
    return <div className="p-4">Carregando dados...</div>;
  }

  return (
    <div className="p-6 max-w-xl space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Criar Nova Prova</h1>
        <p className="text-sm text-gray-500">Preencha as informações abaixo</p>
      </div>

      {/* NOME */}
      <div>
        <label className="block text-sm mb-1 font-medium">Nome da Prova</label>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 w-full rounded"
          placeholder="Ex: Simulado SPAECE - Matemática"
        />
      </div>

      {/* TIPO */}
      <div>
        <label className="block text-sm mb-1 font-medium">Tipo</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="simulado">Simulado</option>
          <option value="oficial">Oficial</option>
          <option value="diagnostica">Diagnóstica</option>
        </select>
      </div>

      {/* USUÁRIO */}
      <div className="text-sm text-gray-500">
        Criado por usuário ID: <b>{usuarioId}</b>
      </div>

      {/* BOTÕES */}
      <div className="flex gap-3">
        <button
          onClick={criarProva}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Criando..." : "Criar Prova"}
        </button>

        <button
          onClick={() => navigate("/app/dashboard")}
          className="border px-4 py-2 rounded hover:bg-gray-50 transition"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
