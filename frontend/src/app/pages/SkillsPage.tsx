import { useState, useEffect } from "react";
import { Search, ChevronRight, ChevronDown } from "lucide-react";

export function SkillsPage() {
  const [skillsData, setSkillsData] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState<string[]>([]);

  const toggle = (key: string) => {
    setOpen((prev) =>
      prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key],
    );
  };

  /* 🔄 BUSCAR DO BACKEND */
  useEffect(() => {
    fetch("http://localhost:3000/skills")
      .then((res) => res.json())
      .then((data) => {
        setSkillsData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando habilidades...</p>;

  /* 🔍 FLATTEN PARA BUSCA */
  const allSkills = skillsData.flatMap((a) =>
    a.subjects.flatMap((s: any) =>
      s.grades.flatMap((g: any) =>
        g.competencies.flatMap((c: any) => c.skills),
      ),
    ),
  );

  const filteredSkills = search
    ? allSkills.filter(
        (sk: any) =>
          sk.code.toLowerCase().includes(search.toLowerCase()) ||
          sk.description.toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Habilidades</h1>

        <span className="text-sm">
          Total: <b>{allSkills.length}</b>
        </span>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-3 text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar código ou descrição..."
          className="w-full pl-8 p-2 border rounded"
        />
      </div>

      {/* RESULTADO BUSCA */}
      {search && (
        <div className="bg-white border rounded">
          {filteredSkills.length === 0 ? (
            <p className="p-4 text-gray-400">Nenhum resultado</p>
          ) : (
            filteredSkills.map((sk: any) => (
              <div key={sk.code} className="p-3 border-b">
                <b>{sk.code}</b> — {sk.description}
              </div>
            ))
          )}
        </div>
      )}

      {/* ÁRVORE */}
      {!search &&
        skillsData.map((assessment) => {
          const aKey = assessment.assessment;
          const isOpen = open.includes(aKey);

          return (
            <div key={aKey} className="border rounded bg-white">
              {/* ASSESSMENT */}
              <button
                onClick={() => toggle(aKey)}
                className="w-full p-3 flex justify-between"
              >
                <span>{aKey}</span>
                {isOpen ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </button>

              {isOpen && (
                <div className="pl-4">
                  {assessment.subjects.map((subject: any) => {
                    const sKey = `${aKey}-${subject.name}`;
                    const sOpen = open.includes(sKey);

                    return (
                      <div key={sKey}>
                        {/* SUBJECT */}
                        <button
                          onClick={() => toggle(sKey)}
                          className="w-full p-2 flex justify-between"
                        >
                          {subject.name}
                          {sOpen ? (
                            <ChevronDown size={12} />
                          ) : (
                            <ChevronRight size={12} />
                          )}
                        </button>

                        {sOpen && (
                          <div className="pl-4">
                            {subject.grades.map((grade: any) => {
                              const gKey = `${sKey}-${grade.grade}`;
                              const gOpen = open.includes(gKey);

                              return (
                                <div key={gKey}>
                                  {/* GRADE */}
                                  <button
                                    onClick={() => toggle(gKey)}
                                    className="w-full p-2 flex justify-between"
                                  >
                                    {grade.grade}
                                    {gOpen ? (
                                      <ChevronDown size={12} />
                                    ) : (
                                      <ChevronRight size={12} />
                                    )}
                                  </button>

                                  {gOpen && (
                                    <div className="pl-4">
                                      {grade.competencies.map((comp: any) => {
                                        const cKey = `${gKey}-${comp.name}`;
                                        const cOpen = open.includes(cKey);

                                        return (
                                          <div key={cKey}>
                                            {/* COMPETÊNCIA */}
                                            <button
                                              onClick={() => toggle(cKey)}
                                              className="w-full p-2 flex justify-between text-sm"
                                            >
                                              {comp.name}
                                              {cOpen ? (
                                                <ChevronDown size={10} />
                                              ) : (
                                                <ChevronRight size={10} />
                                              )}
                                            </button>

                                            {cOpen && (
                                              <div className="pl-4">
                                                {comp.skills.map((sk: any) => (
                                                  <div
                                                    key={sk.code}
                                                    className="p-2 text-xs border-b"
                                                  >
                                                    <b>{sk.code}</b> —{" "}
                                                    {sk.description}
                                                  </div>
                                                ))}
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}
