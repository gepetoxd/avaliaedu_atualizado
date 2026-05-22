import { useEffect, useState } from "react";

type User = {
  id: number;
  nome: string;
  email: string;
  tipo: "admin" | "diretor" | "professor";
  escola: string;
  status: "ativo" | "inativo";
  ultimoAcesso: string;
};

export function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("todos");
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  /* 🔥 FETCH BACKEND */
  useEffect(() => {
    fetch("http://localhost:3000/api/usuarios")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* 🔍 FILTRO */
  const filtered = users.filter((u) => {
    const matchSearch =
      u.nome.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchRole = roleFilter === "todos" || u.tipo === roleFilter;

    return matchSearch && matchRole;
  });

  /* ➕ CRIAR USUÁRIO */
  const criarUsuario = async (novo: Partial<User>) => {
    try {
      await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novo),
      });

      setShowModal(false);
      atualizar();
    } catch (err) {
      console.error(err);
    }
  };

  /* 🔄 RELOAD */
  const atualizar = async () => {
    const res = await fetch("http://localhost:3000/api/usuarios");
    const data = await res.json();
    setUsers(data);
  };

  /* ❌ DELETE */
  const deletar = async (id: number) => {
    await fetch(`http://localhost:3000/api/usuarios/${id}`, {
      method: "DELETE",
    });
    atualizar();
  };

  if (loading) return <div>Carregando usuários...</div>;

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold">Usuários</h1>
          <p className="text-sm text-gray-500">{users.length} cadastrados</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Novo Usuário
        </button>
      </div>

      {/* FILTROS */}
      <div className="flex gap-3">
        <input
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-full"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border p-2"
        >
          <option value="todos">Todos</option>
          <option value="admin">Admin</option>
          <option value="diretor">Diretor</option>
          <option value="professor">Professor</option>
        </select>
      </div>

      {/* TABELA */}
      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-sm">
              <th className="p-2 text-left">Nome</th>
              <th className="p-2">Email</th>
              <th className="p-2">Perfil</th>
              <th className="p-2">Escola</th>
              <th className="p-2">Status</th>
              <th className="p-2">Ações</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="p-2">{u.nome}</td>
                <td className="p-2 text-center">{u.email}</td>
                <td className="p-2 text-center capitalize">{u.tipo}</td>
                <td className="p-2 text-center">{u.escola}</td>
                <td className="p-2 text-center">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      u.status === "ativo"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>

                <td className="p-2 text-center">
                  <button
                    onClick={() => deletar(u.id)}
                    className="text-red-500"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <ModalCriar onClose={() => setShowModal(false)} onSave={criarUsuario} />
      )}
    </div>
  );
}

/* 🔥 COMPONENTE MODAL */
function ModalCriar({ onClose, onSave }: any) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [tipo, setTipo] = useState("professor");
  const [escola, setEscola] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded space-y-4 w-96">
        <h2 className="font-bold text-lg">Novo Usuário</h2>

        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
        />

        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="professor">Professor</option>
          <option value="diretor">Diretor</option>
          <option value="admin">Admin</option>
        </select>

        <input
          placeholder="Escola"
          value={escola}
          onChange={(e) => setEscola(e.target.value)}
          className="border p-2 w-full"
        />

        <div className="flex gap-2">
          <button onClick={onClose} className="border px-3 py-2 w-full">
            Cancelar
          </button>

          <button
            onClick={() => onSave({ nome, email, tipo, escola })}
            className="bg-blue-600 text-white px-3 py-2 w-full"
          >
            Criar
          </button>
        </div>
      </div>
    </div>
  );
}
