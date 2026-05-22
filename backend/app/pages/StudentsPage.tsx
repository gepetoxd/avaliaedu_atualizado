import { useEffect, useState } from "react";

type Student = {
  id: number;
  nome: string;
  turma: string;
  escola: string;
  media: number;
  provas: number;
  ultimaProva: string;
  habilidades: Record<string, number>;
};

export function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selected, setSelected] = useState<Student | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* 🔥 FETCH BACKEND */
  useEffect(() => {
    fetch("http://localhost:3000/api/alunos")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* 🔍 FILTRO */
  const filtered = students.filter(
    (s) =>
      s.nome.toLowerCase().includes(search.toLowerCase()) ||
      s.turma.toLowerCase().includes(search.toLowerCase()) ||
      s.escola.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <div>Carregando alunos...</div>;

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold">Alunos</h1>
          <p className="text-sm text-gray-500">{students.length} cadastrados</p>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Novo Aluno
        </button>
      </div>

      {/* BUSCA */}
      <input
        placeholder="Buscar aluno, turma ou escola..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full"
      />

      <div className="grid grid-cols-3 gap-4">
        {/* LISTA */}
        <div
          className={`${selected ? "col-span-2" : "col-span-3"} bg-white rounded shadow`}
        >
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-sm">
                <th className="p-2 text-left">Aluno</th>
                <th className="p-2">Turma</th>
                <th className="p-2">Escola</th>
                <th className="p-2">Média</th>
                <th className="p-2">Provas</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => setSelected(s)}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <td className="p-2">{s.nome}</td>
                  <td className="p-2 text-center">{s.turma}</td>
                  <td className="p-2 text-center">{s.escola}</td>
                  <td className="p-2 text-center font-bold">{s.media}%</td>
                  <td className="p-2 text-center">{s.provas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* DETALHE */}
        {selected && (
          <div className="bg-white p-4 rounded shadow space-y-4">
            <div>
              <h2 className="font-bold text-lg">{selected.nome}</h2>
              <p className="text-sm text-gray-500">
                {selected.turma} • {selected.escola}
              </p>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 p-3 rounded text-center">
                <div className="text-xl font-bold">{selected.media}%</div>
                <div className="text-xs text-gray-400">Média</div>
              </div>

              <div className="bg-gray-50 p-3 rounded text-center">
                <div className="text-xl font-bold">{selected.provas}</div>
                <div className="text-xs text-gray-400">Provas</div>
              </div>
            </div>

            {/* HABILIDADES */}
            <div>
              <h3 className="text-sm font-semibold mb-2">Habilidades</h3>

              <div className="space-y-2">
                {Object.entries(selected.habilidades).map(([skill, value]) => (
                  <div key={skill}>
                    <div className="flex justify-between text-xs">
                      <span>{skill}</span>
                      <span>{value}%</span>
                    </div>

                    <div className="w-full bg-gray-200 h-2 rounded">
                      <div
                        className="h-2 rounded"
                        style={{
                          width: `${value}%`,
                          backgroundColor:
                            value >= 75
                              ? "#10B981"
                              : value >= 60
                                ? "#F59E0B"
                                : "#EF4444",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded">
              Exportar Relatório
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
