import { useEffect, useState } from "react";

type Skill = {
  code: string;
  description: string;
};

type Competency = {
  id: string;
  name: string;
  skills: Skill[];
};

type Grade = {
  id: string;
  name: string;
  competencies: Competency[];
};

type Subject = {
  id: string;
  name: string;
  grades: Grade[];
};

type Assessment = {
  id: string;
  name: string;
  subjects: Subject[];
};

export function SkillsPage() {
  const [data, setData] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string[]>([]);

  /* 🔥 FETCH BACKEND */
  useEffect(() => {
    fetch("http://localhost:3000/api/skills")
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* 🔄 TOGGLE */
  const toggle = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  /* 🔍 FLATTEN PARA BUSCA */
  const allSkills = data.flatMap((a) =>
    a.subjects.flatMap((s) =>
      s.grades.flatMap((g) => g.competencies.flatMap((c) => c.skills)),
    ),
  );

  const filtered = search
    ? allSkills.filter(
        (s) =>
          s.code.toLowerCase().includes(search.toLowerCase()) ||
          s.description.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  if (loading) return <div>Carregando habilidades...</div>;

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold">Habilidades</h1>
          <p className="text-sm text-gray-500">SAEB / SPAECE</p>
        </div>

        <div className="text-sm text-gray-500">
          Total: <b>{allSkills.length}</b>
        </div>
      </div>

      {/* BUSCA */}
      <input
        placeholder="Buscar código ou descrição..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full"
      />

      {/* RESULTADOS */}
      {search ? (
        <div className="bg-white rounded shadow">
          {filtered.length === 0 && (
            <div className="p-4 text-gray-400 text-sm">
              Nenhuma habilidade encontrada
            </div>
          )}

          {filtered.map((s) => (
            <div key={s.code} className="p-3 border-b">
              <span className="font-mono text-xs bg-blue-600 text-white px-2 py-1 rounded mr-2">
                {s.code}
              </span>
              {s.description}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((a) => (
            <div key={a.id} className="border rounded">
              {/* ASSESSMENT */}
              <button
                onClick={() => toggle(a.id)}
                className="w-full p-4 text-left font-bold bg-gray-50"
              >
                {a.name}
              </button>

              {expanded.includes(a.id) && (
                <div className="pl-4">
                  {a.subjects.map((s) => (
                    <div key={s.id}>
                      {/* SUBJECT */}
                      <button
                        onClick={() => toggle(s.id)}
                        className="w-full p-3 text-left font-semibold"
                      >
                        {s.name}
                      </button>

                      {expanded.includes(s.id) && (
                        <div className="pl-4">
                          {s.grades.map((g) => (
                            <div key={g.id}>
                              {/* GRADE */}
                              <button
                                onClick={() => toggle(g.id)}
                                className="w-full p-2 text-left text-sm text-blue-600"
                              >
                                {g.name}
                              </button>

                              {expanded.includes(g.id) && (
                                <div className="pl-4">
                                  {g.competencies.map((c) => (
                                    <div key={c.id}>
                                      {/* COMP */}
                                      <button
                                        onClick={() => toggle(c.id)}
                                        className="w-full p-2 text-left text-xs text-gray-600"
                                      >
                                        {c.name}
                                      </button>

                                      {expanded.includes(c.id) && (
                                        <div className="pl-4 space-y-1">
                                          {c.skills.map((sk) => (
                                            <div
                                              key={sk.code}
                                              className="text-xs bg-gray-50 p-2 rounded"
                                            >
                                              <span className="font-mono mr-2">
                                                {sk.code}
                                              </span>
                                              {sk.description}
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
