import { useState, useEffect } from "react";
import { Search, TrendingUp, TrendingDown } from "lucide-react";

/* 🔷 TIPAGEM */
type Student = {
  id: string;
  name: string;
  class: string;
  school: string;
  avgScore: number;
  trend: "up" | "down";
  exams: number;
  skills?: Record<string, number>;
};

export function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  /* 🔄 FETCH BACKEND */
  useEffect(() => {
    fetch("http://localhost:3000/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando alunos...</p>;

  /* 🔍 FILTER */
  const filtered = students.filter(
    (s) =>
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.class?.toLowerCase().includes(search.toLowerCase()) ||
      s.school?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Alunos</h1>
        <span className="text-sm">{students.length} alunos</span>
      </div>

      {/* SEARCH */}
      <input
        placeholder="Buscar aluno..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <div className="grid grid-cols-3 gap-4">
        {/* LISTA */}
        <div className="col-span-2 bg-white border rounded">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b">
                <th className="p-3">Aluno</th>
                <th>Turma</th>
                <th>Escola</th>
                <th>Média</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((student) => (
                <tr
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className="border-b cursor-pointer hover:bg-gray-50"
                >
                  <td className="p-3">{student.name}</td>
                  <td>{student.class}</td>
                  <td>{student.school}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span>{student.avgScore}%</span>

                      {student.trend === "up" ? (
                        <TrendingUp size={12} className="text-green-500" />
                      ) : (
                        <TrendingDown size={12} className="text-red-500" />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* DETALHE */}
        {selectedStudent && (
          <div className="bg-white border rounded p-4">
            <h2 className="font-bold mb-2">{selectedStudent.name}</h2>

            <p className="text-sm text-gray-500">
              {selectedStudent.class} · {selectedStudent.school}
            </p>

            <div className="mt-4 space-y-2">
              <p>
                <b>Média:</b> {selectedStudent.avgScore}%
              </p>
              <p>
                <b>Provas:</b> {selectedStudent.exams}
              </p>
            </div>

            {/* SKILLS */}
            {selectedStudent.skills && (
              <div className="mt-4">
                <p className="text-sm font-semibold mb-2">Habilidades</p>

                {Object.entries(selectedStudent.skills).map(
                  ([skill, value]) => {
                    const safeValue = Number(value) || 0;

                    return (
                      <div key={skill} className="mb-2">
                        <div className="flex justify-between text-xs">
                          <span>{skill}</span>
                          <span>{safeValue}%</span>
                        </div>

                        <div className="bg-gray-100 h-1.5 rounded">
                          <div
                            className="h-1.5 rounded bg-blue-500"
                            style={{ width: `${safeValue}%` }}
                          />
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
