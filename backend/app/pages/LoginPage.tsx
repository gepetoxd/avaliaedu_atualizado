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

type User = {
  id: number;
  email: string;
  senha: string;
  tipo: "professor" | "diretor" | "secretaria";
};

export function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState<User["tipo"]>("professor");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  /* 🔐 LOGIN */
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Preencha email e senha");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/usuarios");

      if (!res.ok) throw new Error("Erro na API");

      const usuarios: User[] = await res.json();

      const user = usuarios.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.senha === password &&
          u.tipo === tipo,
      );

      if (!user) {
        alert("Credenciais inválidas");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));

      /* 🔀 REDIRECT */
      const routes = {
        professor: "/app/dashboard",
        diretor: "/app/analytics",
        secretaria: "/app/admin",
      };

      navigate(routes[user.tipo]);
    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* LEFT */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[#0F172A] p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25px 25px, white 2px, transparent 0)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center">
              <GraduationCap size={22} className="text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">AvaliaEdu</div>
              <div className="text-xs text-blue-300">
                Plataforma de Avaliação Educacional
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-4">
            Avaliação educacional
            <br />
            <span className="text-[#2563EB]">inteligente</span>
          </h1>

          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex gap-2 items-center">
              <CheckCircle2 size={16} className="text-green-400" />
              Correção automática
            </div>
            <div className="flex gap-2 items-center">
              <BarChart3 size={16} className="text-green-400" />
              Analytics educacionais
            </div>
            <div className="flex gap-2 items-center">
              <BookOpen size={16} className="text-green-400" />
              Banco de questões
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-1">
            Bem-vindo de volta
          </h2>
          <p className="text-sm text-slate-500 mb-6">Entre na sua conta</p>

          {/* ROLE */}
          <div className="flex gap-2 mb-5 bg-gray-100 p-1 rounded-lg">
            {[
              { label: "Professor", value: "professor" },
              { label: "Diretor", value: "diretor" },
              { label: "Secretaria", value: "secretaria" },
            ].map((r) => (
              <button
                key={r.value}
                onClick={() => setTipo(r.value as User["tipo"])}
                className={`flex-1 py-2 text-xs rounded ${
                  tipo === r.value ? "bg-white text-blue-600" : "text-gray-500"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* FORM */}
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
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
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
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
