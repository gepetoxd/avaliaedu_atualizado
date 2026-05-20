import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export function ExamGeneratorPage() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("simulado");
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);

  /* 🔐 PEGAR USUÁRIO LOGADO */
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user.id) {
      navigate("/login");
      return;
    }

    setUsuarioId(user.id);

    fetchUsuarios();
  }, []);

  /* 🔥 BUSCAR USUÁRIOS */
  const fetchUsuarios = async () => {
    const res = await fetch("http://localhost:3000/api/usuarios");
    const data = await res.json();
    setUsuarios(data);
  };

  /* 🚀 CRIAR PROVA */
  const criarProva = async () => {
    if (!nome) {
      alert("Digite o nome da prova");
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

      const data = await res.json();

      alert("Prova criada com sucesso!");

      // redireciona depois de criar
      navigate("/app/dashboard");
    } catch (err) {
      console.error(err);
      alert("Erro ao criar prova");
    }

    setLoading(false);
  };

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-2xl font-bold">Criar Nova Prova</h1>

      {/* INPUT NOME */}
      <div>
        <label className="block mb-1">Nome da Prova</label>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 w-full"
          placeholder="Ex: Prova SPAECE - Matemática"
        />
      </div>

      {/* TIPO */}
      <div>
        <label className="block mb-1">Tipo</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="simulado">Simulado</option>
          <option value="oficial">Oficial</option>
          <option value="diagnostica">Diagnóstica</option>
        </select>
      </div>

      {/* INFO USUÁRIO */}
      <div className="text-sm text-gray-500">
        Criado por usuário ID: {usuarioId}
      </div>

      {/* BOTÕES */}
      <div className="flex gap-3">
        <button
          onClick={criarProva}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Criando..." : "Criar Prova"}
        </button>

        <button
          onClick={() => navigate("/app/dashboard")}
          className="border px-4 py-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
