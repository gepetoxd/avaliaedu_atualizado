import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Upload, ScanLine, CheckCircle2, AlertCircle, FileImage, X, Camera, RefreshCw } from "lucide-react";

type ScanFile = {
  id: string;
  name: string;
  size: string;
  status: "pending" | "scanning" | "done" | "error";
  accuracy?: number;
  student?: string;
  score?: number;
};

const initialFiles: ScanFile[] = [
  { id: "1", name: "gabarito_ana_souza.jpg", size: "1.2 MB", status: "done", accuracy: 98.5, student: "Ana Souza", score: 85 },
  { id: "2", name: "gabarito_carlos_mendes.jpg", size: "1.1 MB", status: "done", accuracy: 96.2, student: "Carlos Mendes", score: 70 },
  { id: "3", name: "gabarito_joao_oliveira.jpg", size: "980 KB", status: "error", accuracy: 0, student: "", score: 0 },
];

export function ScanExamsPage() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<ScanFile[]>(initialFiles);
  const [dragging, setDragging] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [selectedExam, setSelectedExam] = useState("Simulado SAEB – Matemática · 8º Ano");
  const [selectedClass, setSelectedClass] = useState("8º Ano A");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const newFile: ScanFile = {
      id: Date.now().toString(),
      name: "gabarito_novo.jpg",
      size: "1.3 MB",
      status: "pending",
    };
    setFiles((prev) => [...prev, newFile]);
  };

  const startScanning = () => {
    setScanning(true);
    // Simulate scanning
    const pending = files.filter((f) => f.status === "pending");
    pending.forEach((f, i) => {
      setTimeout(() => {
        setFiles((prev) =>
          prev.map((pf) => (pf.id === f.id ? { ...pf, status: "scanning" } : pf))
        );
        setTimeout(() => {
          setFiles((prev) =>
            prev.map((pf) =>
              pf.id === f.id
                ? { ...pf, status: "done", accuracy: 94 + Math.random() * 5, student: "Mariana Santos", score: 75 }
                : pf
            )
          );
          if (i === pending.length - 1) setScanning(false);
        }, 1500);
      }, i * 800);
    });
  };

  const removeFile = (id: string) => setFiles((prev) => prev.filter((f) => f.id !== id));

  const doneCount = files.filter((f) => f.status === "done").length;
  const errorCount = files.filter((f) => f.status === "error").length;
  const pendingCount = files.filter((f) => f.status === "pending" || f.status === "scanning").length;

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A]">Escanear Provas</h1>
          <p className="text-sm text-slate-500 mt-0.5">Upload de gabaritos para correção automática por OMR</p>
        </div>
        {doneCount > 0 && (
          <button
            onClick={() => navigate("/app/correction-results")}
            className="flex items-center gap-2 bg-[#10B981] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-all shadow-sm"
          >
            <CheckCircle2 size={15} />
            Ver Resultados ({doneCount} corrigidos)
          </button>
        )}
      </div>

      {/* Config */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-semibold text-[#0F172A] mb-4">Configuração do Escaneamento</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Prova a ser corrigida</label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 bg-white"
            >
              <option>Simulado SAEB – Matemática · 8º Ano</option>
              <option>Avaliação Diagnóstica LP – 6º Ano</option>
              <option>Simulado SPAECE LP – 7º Ano</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-[#0F172A] block mb-1.5">Turma</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 bg-white"
            >
              <option>8º Ano A</option>
              <option>8º Ano B</option>
              <option>7º Ano A</option>
              <option>6º Ano A</option>
            </select>
          </div>
        </div>
      </div>

      {/* Upload Zone */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
          dragging
            ? "border-[#2563EB] bg-blue-50"
            : "border-gray-200 hover:border-[#2563EB]/50 hover:bg-gray-50/50"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
      >
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/*,.pdf"
          className="hidden"
          onChange={() => {
            const newFile: ScanFile = { id: Date.now().toString(), name: "gabarito_upload.jpg", size: "1.1 MB", status: "pending" };
            setFiles((prev) => [...prev, newFile]);
          }}
        />
        <div className="flex flex-col items-center gap-3">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${dragging ? "bg-[#2563EB]" : "bg-blue-50"}`}>
            <Upload size={28} className={dragging ? "text-white" : "text-[#2563EB]"} />
          </div>
          <div>
            <p className="text-base font-semibold text-[#0F172A]">
              {dragging ? "Solte os arquivos aqui" : "Arraste e solte os gabaritos"}
            </p>
            <p className="text-sm text-slate-400 mt-1">ou clique para selecionar arquivos</p>
          </div>
          <div className="flex items-center gap-3 mt-2">
            {["JPG", "PNG", "PDF"].map((ext) => (
              <span key={ext} className="bg-gray-100 text-slate-600 text-xs px-3 py-1 rounded-lg font-medium">{ext}</span>
            ))}
          </div>
          <p className="text-xs text-slate-400">Tamanho máximo: 10 MB por arquivo · Múltiplos arquivos permitidos</p>
        </div>
      </div>

      {/* Camera option */}
      <div className="flex items-center gap-3">
        <div className="flex-1 border-t border-gray-200" />
        <span className="text-xs text-slate-400">ou</span>
        <div className="flex-1 border-t border-gray-200" />
      </div>
      <button className="w-full flex items-center justify-center gap-3 border-2 border-dashed border-gray-200 rounded-xl py-4 text-slate-500 hover:border-[#2563EB]/50 hover:text-[#2563EB] hover:bg-blue-50/50 transition-all">
        <Camera size={18} />
        <span className="text-sm font-medium">Usar câmera do dispositivo</span>
      </button>

      {/* Files list */}
      {files.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-4">
              <h3 className="text-sm font-semibold text-[#0F172A]">Arquivos ({files.length})</h3>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-[#10B981]"><CheckCircle2 size={12} />{doneCount} prontos</span>
                {errorCount > 0 && <span className="flex items-center gap-1 text-red-500"><AlertCircle size={12} />{errorCount} erro</span>}
                {pendingCount > 0 && <span className="flex items-center gap-1 text-[#F59E0B]"><RefreshCw size={12} />{pendingCount} pendente</span>}
              </div>
            </div>
            {pendingCount > 0 && (
              <button
                onClick={startScanning}
                disabled={scanning}
                className="flex items-center gap-2 bg-[#2563EB] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all disabled:opacity-60"
              >
                {scanning ? <RefreshCw size={14} className="animate-spin" /> : <ScanLine size={14} />}
                {scanning ? "Escaneando..." : "Iniciar Escaneamento"}
              </button>
            )}
          </div>

          <div className="divide-y divide-gray-50">
            {files.map((file) => (
              <div key={file.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  file.status === "done" ? "bg-green-50" : file.status === "error" ? "bg-red-50" : "bg-blue-50"
                }`}>
                  <FileImage size={18} className={
                    file.status === "done" ? "text-[#10B981]" : file.status === "error" ? "text-red-500" : "text-[#2563EB]"
                  } />
                </div>

                {/* File info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#0F172A] truncate">{file.name}</span>
                    {file.student && <span className="text-xs text-slate-400">→ {file.student}</span>}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-400">{file.size}</span>
                    {file.status === "done" && (
                      <>
                        <span className="text-xs text-[#10B981] font-medium">✓ Precisão: {file.accuracy?.toFixed(1)}%</span>
                        <span className="text-xs font-bold text-[#2563EB]">Nota: {file.score}%</span>
                      </>
                    )}
                    {file.status === "error" && (
                      <span className="text-xs text-red-500">⚠ Não foi possível detectar o gabarito</span>
                    )}
                    {file.status === "scanning" && (
                      <span className="text-xs text-[#F59E0B] flex items-center gap-1">
                        <RefreshCw size={10} className="animate-spin" /> Escaneando...
                      </span>
                    )}
                    {file.status === "pending" && (
                      <span className="text-xs text-slate-400">Aguardando...</span>
                    )}
                  </div>
                  {/* Progress bar */}
                  {file.status === "scanning" && (
                    <div className="w-full bg-gray-100 rounded-full h-1 mt-2">
                      <div className="h-1 rounded-full bg-[#2563EB] animate-pulse" style={{ width: "60%" }} />
                    </div>
                  )}
                </div>

                {/* Status badge */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {file.status === "done" && <CheckCircle2 size={18} className="text-[#10B981]" />}
                  {file.status === "error" && <AlertCircle size={18} className="text-red-500" />}
                  {(file.status === "pending" || file.status === "scanning") && (
                    <ScanLine size={18} className="text-[#2563EB]" />
                  )}
                  <button onClick={() => removeFile(file.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* OMR Visualization */}
      {doneCount > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-[#0F172A] mb-4">Visualização OMR – Ana Souza</h3>
          <div className="grid grid-cols-2 gap-6">
            {/* Answer sheet visualization */}
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Gabarito Detectado</p>
              <div className="space-y-2">
                {[
                  { q: 1, detected: "B", correct: "B", ok: true },
                  { q: 2, detected: "A", correct: "A", ok: true },
                  { q: 3, detected: "C", correct: "B", ok: false },
                  { q: 4, detected: "D", correct: "D", ok: true },
                  { q: 5, detected: "A", correct: "C", ok: false },
                ].map((item) => (
                  <div key={item.q} className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 w-6">Q{item.q}</span>
                    <div className="flex gap-1">
                      {["A", "B", "C", "D"].map((alt) => (
                        <div
                          key={alt}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                            item.detected === alt
                              ? item.ok
                                ? "bg-[#10B981] border-[#10B981] text-white"
                                : "bg-red-500 border-red-500 text-white"
                              : "border-gray-300 text-slate-400"
                          }`}
                        >
                          {alt}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs ml-auto">
                      {item.ok ? (
                        <span className="text-[#10B981]">✓</span>
                      ) : (
                        <span className="text-red-500">✗ Correto: {item.correct}</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Stats */}
            <div className="space-y-3">
              <div className="bg-green-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-[#10B981]">85%</div>
                <div className="text-xs text-slate-500">Nota final</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-[#2563EB]">98.5%</div>
                <div className="text-xs text-slate-500">Precisão do OMR</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-2xl font-bold text-[#0F172A]">17/20</div>
                <div className="text-xs text-slate-500">Acertos / Total</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
