import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { Upload, ScanLine, CheckCircle2, AlertCircle, X } from "lucide-react";

type ScanFile = {
  id: string;
  name: string;
  status: "pending" | "scanning" | "done" | "error";
  accuracy?: number;
  student?: string;
  score?: number;
};

export function ScanExamsPage() {
  const navigate = useNavigate();

  const [files, setFiles] = useState<ScanFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const fileRef = useRef<HTMLInputElement>(null);

  /* 🔥 FETCH PROVAS (exemplo real) */
  useEffect(() => {
    fetch("http://localhost:3000/api/provas")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setSelectedExam(data[0].nome);
      })
      .catch(console.error);
  }, []);

  /* 📤 UPLOAD */
  const handleUpload = async (filesList: FileList | null) => {
    if (!filesList) return;

    const newFiles = Array.from(filesList).map((f) => ({
      id: Date.now() + f.name,
      name: f.name,
      status: "pending" as const,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  };

  /* 🔍 SCAN REAL (API) */
  const startScanning = async () => {
    setLoading(true);

    try {
      const pending = files.filter((f) => f.status === "pending");

      for (const file of pending) {
        // marca como scanning
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, status: "scanning" } : f,
          ),
        );

        // 🔥 chamada backend (simulada)
        const res = await fetch("http://localhost:3000/api/scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: file.name,
            prova: selectedExam,
            turma: selectedClass,
          }),
        });

        const data = await res.json();

        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id
              ? {
                  ...f,
                  status: "done",
                  accuracy: data.accuracy,
                  student: data.student,
                  score: data.score,
                }
              : f,
          ),
        );
      }
    } catch (err) {
      console.error(err);

      setFiles((prev) =>
        prev.map((f) =>
          f.status === "scanning" ? { ...f, status: "error" } : f,
        ),
      );
    }

    setLoading(false);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const doneCount = files.filter((f) => f.status === "done").length;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold">Escanear Provas</h1>
          <p className="text-sm text-gray-500">Correção automática (OMR)</p>
        </div>

        {doneCount > 0 && (
          <button
            onClick={() => navigate("/app/correction-results")}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Ver Resultados ({doneCount})
          </button>
        )}
      </div>

      {/* CONFIG */}
      <div className="bg-white p-4 rounded shadow space-y-3">
        <select
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
          className="border p-2 w-full"
        >
          <option>Selecione prova</option>
          <option>SAEB Matemática</option>
        </select>

        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border p-2 w-full"
        >
          <option>Selecione turma</option>
          <option>8º Ano A</option>
        </select>
      </div>

      {/* UPLOAD */}
      <div
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed p-10 text-center rounded cursor-pointer"
      >
        <input
          ref={fileRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />

        <Upload size={30} />
        <p>Clique ou arraste arquivos</p>
      </div>

      {/* LISTA */}
      <div className="bg-white rounded shadow">
        {files.map((f) => (
          <div key={f.id} className="flex justify-between p-3 border-b">
            <div>
              <p className="font-medium">{f.name}</p>

              {f.status === "done" && (
                <p className="text-green-600 text-sm">
                  {f.student} • {f.score}% • {f.accuracy?.toFixed(1)}%
                </p>
              )}

              {f.status === "error" && (
                <p className="text-red-500 text-sm">Erro no processamento</p>
              )}

              {f.status === "scanning" && (
                <p className="text-yellow-500 text-sm">Processando...</p>
              )}
            </div>

            <div className="flex gap-2 items-center">
              {f.status === "done" && <CheckCircle2 />}
              {f.status === "error" && <AlertCircle />}
              <button onClick={() => removeFile(f.id)}>
                <X />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ACTION */}
      {files.some((f) => f.status === "pending") && (
        <button
          onClick={startScanning}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Processando..." : "Iniciar Escaneamento"}
        </button>
      )}
    </div>
  );
}
