import { useState } from "react";
import { Search, ChevronRight, ChevronDown, BookOpen, Target, Hash } from "lucide-react";

const skillsData = [
  {
    assessment: "SAEB",
    subjects: [
      {
        name: "Matemática",
        grades: [
          {
            grade: "6º Ano",
            competencies: [
              {
                name: "Números e Operações",
                skills: [
                  { code: "EF06MA01", description: "Comparar, ordenar, ler e escrever números naturais e inteiros." },
                  { code: "EF06MA02", description: "Resolver problemas envolvendo as quatro operações com números naturais." },
                  { code: "EF06MA03", description: "Calcular porcentagem e razão em situações cotidianas." },
                ],
              },
              {
                name: "Geometria",
                skills: [
                  { code: "EF06MA20", description: "Reconhecer e nomear polígonos convexos pela quantidade de vértices." },
                  { code: "EF06MA21", description: "Identificar características de figuras planas e espaciais." },
                ],
              },
            ],
          },
          {
            grade: "7º Ano",
            competencies: [
              {
                name: "Álgebra",
                skills: [
                  { code: "EF07MA04", description: "Resolver equações e inequações de 1º grau." },
                  { code: "EF07MA05", description: "Interpretar e resolver problemas com equações do 1º grau." },
                ],
              },
              {
                name: "Estatística",
                skills: [
                  { code: "EF07MA31", description: "Compreender e calcular média aritmética." },
                  { code: "EF07MA32", description: "Interpretar gráficos de barras e setores." },
                ],
              },
            ],
          },
          {
            grade: "8º Ano",
            competencies: [
              {
                name: "Geometria",
                skills: [
                  { code: "EF08MA12", description: "Calcular área de triângulos, quadriláteros e trapézios." },
                  { code: "EF08MA13", description: "Reconhecer e aplicar o teorema de Pitágoras." },
                ],
              },
            ],
          },
          {
            grade: "9º Ano",
            competencies: [
              {
                name: "Álgebra",
                skills: [
                  { code: "EF09MA12", description: "Resolver sistemas de equações lineares com 2 incógnitas." },
                  { code: "EF09MA13", description: "Analisar e interpretar gráficos de funções." },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Língua Portuguesa",
        grades: [
          {
            grade: "6º Ano",
            competencies: [
              {
                name: "Leitura e Compreensão",
                skills: [
                  { code: "EF06LP01", description: "Identificar a ideia central de textos e parágrafos." },
                  { code: "EF06LP02", description: "Distinguir fato de opinião em textos jornalísticos." },
                ],
              },
            ],
          },
          {
            grade: "7º Ano",
            competencies: [
              {
                name: "Linguagem e Análise",
                skills: [
                  { code: "EF07LP16", description: "Identificar e analisar figuras de linguagem em poemas." },
                  { code: "EF07LP17", description: "Reconhecer estrutura narrativa em contos." },
                ],
              },
            ],
          },
          {
            grade: "8º Ano",
            competencies: [
              {
                name: "Produção Textual",
                skills: [
                  { code: "EF08LP03", description: "Produzir textos argumentativos com coerência e coesão." },
                  { code: "EF08LP04", description: "Utilizar operadores argumentativos em redação." },
                ],
              },
            ],
          },
          {
            grade: "9º Ano",
            competencies: [
              {
                name: "Análise Discursiva",
                skills: [
                  { code: "EF09LP08", description: "Analisar posicionamento e argumentação em textos opinativos." },
                  { code: "EF09LP09", description: "Identificar intertextualidade e metalinguagem." },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    assessment: "SPAECE",
    subjects: [
      {
        name: "Matemática",
        grades: [
          {
            grade: "5º Ano",
            competencies: [
              {
                name: "Números",
                skills: [
                  { code: "SP05MA01", description: "Resolver operações com números naturais até 1.000.000." },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export function SkillsPage() {
  const [search, setSearch] = useState("");
  const [openAssessment, setOpenAssessment] = useState<string[]>(["SAEB"]);
  const [openSubject, setOpenSubject] = useState<string[]>(["SAEB-Matemática"]);
  const [openGrade, setOpenGrade] = useState<string[]>(["SAEB-Matemática-6º Ano"]);
  const [openComp, setOpenComp] = useState<string[]>([]);

  const toggle = (set: string[], setter: (v: string[]) => void, key: string) => {
    setter(set.includes(key) ? set.filter((x) => x !== key) : [...set, key]);
  };

  const allSkills = skillsData.flatMap((a) =>
    a.subjects.flatMap((s) => s.grades.flatMap((g) => g.competencies.flatMap((c) => c.skills)))
  );
  const filteredSkills = search
    ? allSkills.filter(
        (sk) =>
          sk.code.toLowerCase().includes(search.toLowerCase()) ||
          sk.description.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A]">Habilidades SAEB / SPAECE</h1>
          <p className="text-sm text-slate-500 mt-0.5">Banco hierárquico de competências e habilidades</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-gray-200 rounded-lg px-3 py-2">
            <Hash size={13} className="text-[#2563EB]" />
            <span>Total: <b className="text-[#0F172A]">{allSkills.length}</b> habilidades</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar por código (ex: EF07MA04) ou descrição..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] shadow-sm"
        />
      </div>

      {/* Search results */}
      {search && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <span className="text-xs font-semibold text-slate-500">{filteredSkills.length} habilidades encontradas para "{search}"</span>
          </div>
          <div className="divide-y divide-gray-50">
            {filteredSkills.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-slate-400">Nenhuma habilidade encontrada.</div>
            ) : (
              filteredSkills.map((sk) => (
                <div key={sk.code} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  <span className="bg-[#2563EB] text-white text-xs px-2 py-0.5 rounded font-mono font-medium flex-shrink-0">{sk.code}</span>
                  <p className="text-sm text-[#0F172A] leading-snug">{sk.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Hierarchical tree */}
      {!search && (
        <div className="space-y-3">
          {skillsData.map((assessment) => {
            const aKey = assessment.assessment;
            const aOpen = openAssessment.includes(aKey);
            return (
              <div key={aKey} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Assessment level */}
                <button
                  onClick={() => toggle(openAssessment, setOpenAssessment, aKey)}
                  className="w-full flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target size={16} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-[#0F172A]">{aKey}</div>
                    <div className="text-xs text-slate-400">
                      {assessment.subjects.length} disciplinas · {assessment.subjects.reduce((acc, s) => acc + s.grades.reduce((a2, g) => a2 + g.competencies.reduce((a3, c) => a3 + c.skills.length, 0), 0), 0)} habilidades
                    </div>
                  </div>
                  {aOpen ? <ChevronDown size={16} className="text-slate-400" /> : <ChevronRight size={16} className="text-slate-400" />}
                </button>

                {aOpen && (
                  <div className="border-t border-gray-100">
                    {assessment.subjects.map((subject) => {
                      const sKey = `${aKey}-${subject.name}`;
                      const sOpen = openSubject.includes(sKey);
                      return (
                        <div key={sKey} className="border-b border-gray-50 last:border-b-0">
                          <button
                            onClick={() => toggle(openSubject, setOpenSubject, sKey)}
                            className="w-full flex items-center gap-3 px-5 py-3 pl-8 hover:bg-gray-50 transition-colors text-left"
                          >
                            <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center flex-shrink-0">
                              <BookOpen size={13} className="text-purple-600" />
                            </div>
                            <span className="text-sm font-semibold text-[#0F172A] flex-1">{subject.name}</span>
                            {sOpen ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />}
                          </button>

                          {sOpen && (
                            <div className="pl-16">
                              {subject.grades.map((grade) => {
                                const gKey = `${sKey}-${grade.grade}`;
                                const gOpen = openGrade.includes(gKey);
                                return (
                                  <div key={gKey} className="border-b border-gray-50 last:border-b-0">
                                    <button
                                      onClick={() => toggle(openGrade, setOpenGrade, gKey)}
                                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                                    >
                                      <span className="text-xs font-semibold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded">{grade.grade}</span>
                                      <span className="text-xs text-slate-400 flex-1">{grade.competencies.length} competências</span>
                                      {gOpen ? <ChevronDown size={13} className="text-slate-400" /> : <ChevronRight size={13} className="text-slate-400" />}
                                    </button>

                                    {gOpen && (
                                      <div className="pl-4">
                                        {grade.competencies.map((comp) => {
                                          const cKey = `${gKey}-${comp.name}`;
                                          const cOpen = openComp.includes(cKey);
                                          return (
                                            <div key={cKey} className="border-b border-gray-50 last:border-b-0">
                                              <button
                                                onClick={() => toggle(openComp, setOpenComp, cKey)}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left"
                                              >
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] flex-shrink-0" />
                                                <span className="text-xs font-semibold text-slate-600 flex-1">{comp.name}</span>
                                                <span className="text-xs text-slate-400">{comp.skills.length} habilidades</span>
                                                {cOpen ? <ChevronDown size={12} className="text-slate-400" /> : <ChevronRight size={12} className="text-slate-400" />}
                                              </button>

                                              {cOpen && (
                                                <div className="pl-6 pb-2 space-y-1">
                                                  {comp.skills.map((sk) => (
                                                    <div key={sk.code} className="flex items-start gap-3 px-4 py-2.5 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer group">
                                                      <span className="bg-[#0F172A] text-white text-xs px-2 py-0.5 rounded font-mono flex-shrink-0 group-hover:bg-[#2563EB] transition-colors">
                                                        {sk.code}
                                                      </span>
                                                      <p className="text-xs text-slate-600 leading-snug">{sk.description}</p>
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
      )}
    </div>
  );
}
