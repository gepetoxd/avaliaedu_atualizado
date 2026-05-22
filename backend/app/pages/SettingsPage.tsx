import { useEffect, useState } from "react";

type Settings = {
  nomeSecretaria: string;
  sigla: string;
  municipio: string;
  anoLetivo: number;
  escalaNotas: string;
  meta: number;
};

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* 🔥 FETCH CONFIG */
  useEffect(() => {
    fetch("http://localhost:3000/api/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* 💾 SALVAR */
  const handleSave = async () => {
    if (!settings) return;

    setSaving(true);

    try {
      await fetch("http://localhost:3000/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      alert("Configurações salvas!");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar");
    }

    setSaving(false);
  };

  if (loading) return <div>Carregando configurações...</div>;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold">Configurações</h1>
          <p className="text-sm text-gray-500">Gerencie o sistema</p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {saving ? "Salvando..." : "Salvar"}
        </button>
      </div>

      <div className="flex gap-4">
        {/* MENU */}
        <div className="w-56 space-y-2">
          {[
            { id: "general", label: "Geral" },
            { id: "assessment", label: "Avaliações" },
            { id: "security", label: "Segurança" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left p-3 rounded ${
                activeTab === item.id
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CONTEÚDO */}
        <div className="flex-1 space-y-4">
          {/* GERAL */}
          {activeTab === "general" && settings && (
            <div className="bg-white p-4 rounded shadow space-y-4">
              <h2 className="font-bold">Geral</h2>

              <input
                value={settings.nomeSecretaria}
                onChange={(e) =>
                  setSettings({ ...settings, nomeSecretaria: e.target.value })
                }
                className="border p-2 w-full"
                placeholder="Nome da secretaria"
              />

              <input
                value={settings.sigla}
                onChange={(e) =>
                  setSettings({ ...settings, sigla: e.target.value })
                }
                className="border p-2 w-full"
                placeholder="Sigla"
              />

              <input
                value={settings.municipio}
                onChange={(e) =>
                  setSettings({ ...settings, municipio: e.target.value })
                }
                className="border p-2 w-full"
                placeholder="Município"
              />

              <input
                type="number"
                value={settings.anoLetivo}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    anoLetivo: Number(e.target.value),
                  })
                }
                className="border p-2 w-full"
              />
            </div>
          )}

          {/* AVALIAÇÕES */}
          {activeTab === "assessment" && settings && (
            <div className="bg-white p-4 rounded shadow space-y-4">
              <h2 className="font-bold">Avaliações</h2>

              <select
                value={settings.escalaNotas}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    escalaNotas: e.target.value,
                  })
                }
                className="border p-2 w-full"
              >
                <option value="percentual">Percentual</option>
                <option value="0-10">0 a 10</option>
                <option value="saeb">SAEB</option>
              </select>

              <div>
                <label className="text-sm">Meta (%)</label>
                <input
                  type="range"
                  min={40}
                  max={90}
                  value={settings.meta}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      meta: Number(e.target.value),
                    })
                  }
                  className="w-full"
                />
                <p className="text-sm font-bold">{settings.meta}%</p>
              </div>
            </div>
          )}

          {/* SEGURANÇA */}
          {activeTab === "security" && (
            <div className="bg-white p-4 rounded shadow space-y-4">
              <h2 className="font-bold">Segurança</h2>

              <div className="flex justify-between">
                <span>Autenticação 2FA</span>
                <input type="checkbox" defaultChecked />
              </div>

              <div className="flex justify-between">
                <span>Log de auditoria</span>
                <input type="checkbox" defaultChecked />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
