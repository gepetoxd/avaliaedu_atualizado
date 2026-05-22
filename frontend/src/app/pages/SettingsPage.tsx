import { useState, useEffect } from "react";
import {
  Save,
  Globe,
  FileText,
  BookOpen,
  Palette,
  Bell,
  Shield,
} from "lucide-react";

export function SettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(true);

  /* 🔄 BUSCAR CONFIGURAÇÕES */
  useEffect(() => {
    fetch("http://localhost:3000/settings")
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  /* 💾 SALVAR */
  const handleSave = async () => {
    await fetch("http://localhost:3000/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    alert("Configurações salvas!");
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold">Configurações</h1>
        </div>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Save size={14} />
          Salvar
        </button>
      </div>

      <div className="flex gap-5">
        {/* MENU */}
        <div className="w-56 space-y-2">
          {[
            ["general", "Geral", Globe],
            ["assessment", "Avaliações", FileText],
            ["skills", "Habilidades", BookOpen],
            ["brand", "Visual", Palette],
            ["notifications", "Notificações", Bell],
            ["security", "Segurança", Shield],
          ].map(([id, label, Icon]: any) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex gap-2 p-3 rounded ${
                activeTab === id ? "bg-blue-100" : ""
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* CONTEÚDO */}
        <div className="flex-1 space-y-4">
          {/* GERAL */}
          {activeTab === "general" && (
            <div className="bg-white p-5 rounded border space-y-3">
              <input
                value={settings.name}
                onChange={(e) =>
                  setSettings({ ...settings, name: e.target.value })
                }
                placeholder="Nome da secretaria"
                className="border p-2 w-full"
              />

              <input
                value={settings.sigla}
                onChange={(e) =>
                  setSettings({ ...settings, sigla: e.target.value })
                }
                placeholder="Sigla"
                className="border p-2 w-full"
              />

              <input
                value={settings.city}
                onChange={(e) =>
                  setSettings({ ...settings, city: e.target.value })
                }
                placeholder="Município"
                className="border p-2 w-full"
              />

              <select
                value={settings.year}
                onChange={(e) =>
                  setSettings({ ...settings, year: e.target.value })
                }
                className="border p-2 w-full"
              >
                <option>2026</option>
                <option>2025</option>
              </select>
            </div>
          )}

          {/* AVALIAÇÕES */}
          {activeTab === "assessment" && (
            <div className="bg-white p-5 rounded border space-y-3">
              <input
                type="number"
                value={settings.minQuestions}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    minQuestions: Number(e.target.value),
                  })
                }
                placeholder="Mínimo de questões"
                className="border p-2 w-full"
              />

              <input
                type="number"
                value={settings.maxQuestions}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maxQuestions: Number(e.target.value),
                  })
                }
                placeholder="Máximo de questões"
                className="border p-2 w-full"
              />

              <select
                value={settings.scale}
                onChange={(e) =>
                  setSettings({ ...settings, scale: e.target.value })
                }
                className="border p-2 w-full"
              >
                <option value="percent">0–100%</option>
                <option value="points">0–10</option>
              </select>
            </div>
          )}

          {/* HABILIDADES */}
          {activeTab === "skills" && (
            <div className="bg-white p-5 rounded border">
              <p>Banco de habilidades vindo do backend</p>

              {settings.skills?.map((s: any) => (
                <div key={s.id} className="border p-2 mb-2">
                  {s.name}
                </div>
              ))}
            </div>
          )}

          {/* VISUAL */}
          {activeTab === "brand" && (
            <div className="bg-white p-5 rounded border space-y-3">
              <input
                value={settings.primaryColor}
                onChange={(e) =>
                  setSettings({ ...settings, primaryColor: e.target.value })
                }
                placeholder="Cor primária"
                className="border p-2 w-full"
              />

              <input
                value={settings.secondaryColor}
                onChange={(e) =>
                  setSettings({ ...settings, secondaryColor: e.target.value })
                }
                placeholder="Cor secundária"
                className="border p-2 w-full"
              />
            </div>
          )}

          {/* NOTIFICAÇÕES */}
          {activeTab === "notifications" && (
            <div className="bg-white p-5 rounded border space-y-3">
              {settings.notifications?.map((n: any, i: number) => (
                <div key={i} className="flex justify-between">
                  <span>{n.label}</span>

                  <input
                    type="checkbox"
                    checked={n.enabled}
                    onChange={() => {
                      const updated = [...settings.notifications];
                      updated[i].enabled = !updated[i].enabled;
                      setSettings({ ...settings, notifications: updated });
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* SEGURANÇA */}
          {activeTab === "security" && (
            <div className="bg-white p-5 rounded border space-y-3">
              <input
                type="number"
                value={settings.sessionTime}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    sessionTime: Number(e.target.value),
                  })
                }
                placeholder="Tempo de sessão"
                className="border p-2 w-full"
              />

              <select
                value={settings.passwordPolicy}
                onChange={(e) =>
                  setSettings({ ...settings, passwordPolicy: e.target.value })
                }
                className="border p-2 w-full"
              >
                <option value="strong">Forte</option>
                <option value="medium">Médio</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
