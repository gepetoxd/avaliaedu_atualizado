import { useState, useEffect } from "react";
import { Search, Edit3, Trash2 } from "lucide-react";

export function UserManagementPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("Todos");
  const [showModal, setShowModal] = useState(false);

  /* 🔄 FETCH USERS */
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  /* 🔍 FILTER */
  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchRole = roleFilter === "Todos" || u.role === roleFilter;

    return matchSearch && matchRole;
  });

  /* 📊 STATS */
  const adminCount = users.filter((u) => u.role === "Admin").length;
  const directorCount = users.filter((u) => u.role === "Diretor").length;
  const teacherCount = users.filter((u) => u.role === "Professor").length;
  const activeCount = users.filter((u) => u.status === "Ativo").length;

  /* ➕ CREATE USER */
  const handleCreateUser = async () => {
    const newUser = {
      name: "Novo Usuário",
      email: "novo@sme.ce.gov.br",
      role: "Professor",
      school: "E.M. Rui Barbosa",
      status: "Ativo",
    };

    const res = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const data = await res.json();
    setUsers((prev) => [...prev, data]);
    setShowModal(false);
  };

  /* ❌ DELETE */
  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    });

    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Usuários</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Novo Usuário
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-3">
        <div>Total: {users.length}</div>
        <div>Admins: {adminCount}</div>
        <div>Diretores: {directorCount}</div>
        <div>Ativos: {activeCount}</div>
      </div>

      {/* FILTER */}
      <div className="flex gap-3">
        <input
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option>Todos</option>
          <option>Admin</option>
          <option>Diretor</option>
          <option>Professor</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-gray-500 border-b">
              <th className="p-3">Nome</th>
              <th>Email</th>
              <th>Perfil</th>
              <th>Escola</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.school}</td>
                <td>{user.status}</td>

                <td className="flex gap-2 p-3">
                  <button>
                    <Edit3 size={14} />
                  </button>

                  <button onClick={() => handleDelete(user.id)}>
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded space-y-4 w-96">
            <h2 className="font-bold">Novo Usuário</h2>

            <button
              onClick={handleCreateUser}
              className="bg-blue-600 text-white w-full py-2 rounded"
            >
              Criar usuário fake (teste)
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="border w-full py-2 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
