import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Upload,
  ScanLine,
  CheckCircle2,
  AlertCircle,
  FileImage,
  X,
  RefreshCw,
} from "lucide-react";

export function ScanExamsPage() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<any[]>([]);
  const [dragging, setDragging] = useState(false);
  const [scanning, setScanning] = useState(false);

  const [selectedExam, setSelectedExam] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  /* 🔄 BUSCAR PROVAS E TURMAS */
  const [exams, setExams] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/exams")
      .then((res) => res.json())
      .then(setExams);

    fetch("http://localhost:3000/classes")
      .then((res) => res.json())
      .then(setClasses);
  }, []);

  /* 📥 UPLOAD */
  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).map((file) => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + " MB",
      status: "pending",
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  /* 🚀 SCAN REAL */
  const startScanning = async () => {
    setScanning(true);

    for (let file of files) {
      if (file.status !== "pending") continue;

      setFiles((prev) =>
        prev.map((f) => (f.id === file.id ? { ...f, status: "scanning" } : f)),
      );

      const formData = new FormData();
      formData.append("file", file.file);
      formData.append("examId", selectedExam);
      formData.append("classId", selectedClass);

      try {
        const res = await fetch("http://localhost:3000/scan", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id
              ? {
                  ...f,
                  status: "done",
                  student: data.student,
                  score: data.score,
                  accuracy: data.accuracy,
                }
              : f,
          ),
        );
      } catch {
        setFiles((prev) =>
          prev.map((f) => (f.id === file.id ? { ...f, status: "error" } : f)),
        );
      }
    }

    setScanning(false);
  };

  const removeFile = (id: string) =>
    setFiles((prev) => prev.filter((f) => f.id !== id));

  const doneCount = files.filter((f) => f.status === "done").length;

  return (
    <div className="space-y-5 max-w-4xl">
      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold">Escanear Provas</h1>
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
      <div className="bg-white p-5 rounded border grid grid-cols-2 gap-4">
        <select
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
          className="border p-2"
        >
          <option value="">Selecione prova</option>
          {exams.map((e) => (
            <option key={e.id} value={e.id}>
              {e.title}
            </option>
          ))}
        </select>

        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border p-2"
        >
          <option value="">Selecione turma</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* DROP */}
      <div
        className={`border-2 border-dashed p-10 text-center ${
          dragging ? "bg-blue-50" : ""
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
      >
        <input
          ref={fileRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />

        <Upload className="mx-auto mb-3" />
        <p>Arraste ou clique para enviar</p>
      </div>

      {/* LISTA */}
      {files.length > 0 && (
        <div className="bg-white border rounded">
          <div className="p-4 flex justify-between">
            <span>{files.length} arquivos</span>

            <button
              onClick={startScanning}
              disabled={scanning}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {scanning ? "Escaneando..." : "Iniciar"}
            </button>
          </div>

          {files.map((file) => (
            <div key={file.id} className="flex p-4 border-t items-center gap-3">
              <FileImage />

              <div className="flex-1">
                <p>{file.name}</p>
                <span className="text-xs text-gray-400">{file.size}</span>

                {file.status === "done" && (
                  <div className="text-xs text-green-600">
                    {file.student} · {file.score}%
                  </div>
                )}

                {file.status === "error" && (
                  <div className="text-xs text-red-500">erro no scan</div>
                )}

                {file.status === "scanning" && (
                  <div className="text-xs text-yellow-500">escaneando...</div>
                )}
              </div>

              {file.status === "done" && (
                <CheckCircle2 className="text-green-500" />
              )}
              {file.status === "error" && (
                <AlertCircle className="text-red-500" />
              )}
              {file.status === "scanning" && (
                <RefreshCw className="animate-spin" />
              )}

              <button onClick={() => removeFile(file.id)}>
                <X />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
