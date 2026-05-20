import { useState } from "react";
import { useNavigate } from "react-router";
import {
  GraduationCap,
  Eye,
  EyeOff,
  BarChart3,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState("professor");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/usuarios");
      const usuarios = await res.json();

      const user = usuarios.find(
        (u: any) =>
          u.email === email && u.senha === password && u.tipo === tipo,
      );

      if (!user) {
        alert("Credenciais inválidas");
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));

      // REDIRECIONAMENTO
      if (user.tipo === "professor") navigate("/dashboard");
      if (user.tipo === "diretor") navigate("/analytics");
      if (user.tipo === "secretaria") navigate("/admin");
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com servidor");
    }

    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "'Inter', sans-serif", background: "#F8FAFC" }}
    >
      {/* LEFT */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[#0F172A] p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25px 25px, white 2px, transparent 0)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#2563EB] rounded-full opacity-10" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#10B981] rounded-full opacity-10" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center">
              <GraduationCap size={22} className="text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">AvaliaEdu</div>
              <div className="text-xs text-blue-300">
                Plataforma Inteligente de Avaliação Educacional
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-4 leading-tight">
            Avaliação educacional
            <br />
            <span className="text-[#2563EB]">inteligente</span> para
            <br />
            municípios brasileiros
          </h1>

          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            Crie provas alinhadas ao SAEB e SPAECE, escaneie gabaritos
            automaticamente e gere relatórios pedagógicos em minutos.
          </p>

          <div className="space-y-4">
            {[
              {
                icon: CheckCircle2,
                text: "Correção automática por visão computacional",
              },
              { icon: BarChart3, text: "Analytics alinhados ao SAEB e SPAECE" },
              {
                icon: BookOpen,
                text: "Banco de questões com habilidades categorizadas",
              },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <f.icon size={18} className="text-[#10B981]" />
                <span className="text-sm text-slate-300">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#0F172A]">
              Bem-vindo de volta
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Entre na sua conta para continuar
            </p>
          </div>

          {/* SELECT ROLE */}
          <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
            {[
              { label: "Professor", value: "professor" },
              { label: "Diretor", value: "diretor" },
              { label: "Secretaria", value: "secretaria" },
            ].map((role) => (
              <button
                key={role.value}
                onClick={() => setTipo(role.value)}
                className={`flex-1 py-1.5 px-3 rounded-md text-xs font-medium transition-all ${
                  tipo === role.value
                    ? "bg-white text-[#2563EB] shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded pr-10"
              />

              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#2563EB] text-white py-3 rounded-lg"
            >
              {loading ? "Entrando..." : "Entrar na Plataforma"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
