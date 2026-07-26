import { useState } from "react";
import {
  Bot,
  LogOut,
  Moon,
  Sun,
  Settings,
  UserCircle2,
  X,
  Mic,
  Volume2,
  Save,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const navigate = useNavigate();

  const { darkMode, toggleTheme } = useTheme();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const [showSettings, setShowSettings] =
    useState(false);

  const [settings, setSettings] = useState({
    voiceInput:
      JSON.parse(
        localStorage.getItem("voiceInput")
      ) ?? true,

    voiceOutput:
      JSON.parse(
        localStorage.getItem("voiceOutput")
      ) ?? false,

    saveHistory:
      JSON.parse(
        localStorage.getItem("saveHistory")
      ) ?? true,
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/", {
      replace: true,
    });
  };

  const saveSettings = () => {
    localStorage.setItem(
      "voiceInput",
      JSON.stringify(settings.voiceInput)
    );

    localStorage.setItem(
      "voiceOutput",
      JSON.stringify(settings.voiceOutput)
    );

    localStorage.setItem(
      "saveHistory",
      JSON.stringify(settings.saveHistory)
    );

    setShowSettings(false);
  };

  return (
    <>
      <header
        className={`h-[72px] px-5 border-b transition-all duration-300 ${darkMode
            ? "bg-[#0B1120] border-white/10"
            : "bg-white border-slate-200"
          }`}
      >
        <div
          className={`h-full flex items-center justify-between rounded-2xl px-5 ${darkMode
              ? "bg-white/5 border border-white/10"
              : "bg-slate-50 border border-slate-200"
            }`}
        >
          {/* Logo */}

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-lg">
              <Bot className="text-white w-7 h-7" />
            </div>

            <div>
              <h1
                className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"
                  }`}
              >
                AskPDF AI
              </h1>

              <p
                className={`text-sm ${darkMode
                    ? "text-slate-400"
                    : "text-slate-500"
                  }`}
              >
                Intelligent PDF Assistant
              </p>
            </div>
          </div>

          {/* Right Side */}

          <div className="flex items-center gap-3">

            {/* Theme */}

            <button
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-xl transition ${darkMode
                  ? "bg-white/5 hover:bg-white/10 border border-white/10"
                  : "bg-white hover:bg-slate-100 border border-slate-300"
                }`}
            >
              {darkMode ? (
                <Sun className="mx-auto text-yellow-400 w-5 h-5" />
              ) : (
                <Moon className="mx-auto text-slate-700 w-5 h-5" />
              )}
            </button>

            {/* Settings */}

            <button
              onClick={() => setShowSettings(true)}
              className={`w-10 h-10 rounded-xl transition ${darkMode
                  ? "bg-white/5 hover:bg-white/10 border border-white/10"
                  : "bg-white hover:bg-slate-100 border border-slate-300"
                }`}
            >
              <Settings
                className={`mx-auto w-5 h-5 ${darkMode
                    ? "text-slate-300"
                    : "text-slate-700"
                  }`}
              />
            </button>

            {/* User */}

            <div
              className={`flex items-center gap-3 rounded-xl px-3 py-2 ${darkMode
                  ? "bg-white/5 border border-white/10"
                  : "bg-white border border-slate-300"
                }`}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                {user.name
                  ? user.name.charAt(0).toUpperCase()
                  : <UserCircle2 size={20} />}
              </div>

              <div>
                <p
                  className={`font-semibold leading-none ${darkMode
                      ? "text-white"
                      : "text-slate-900"
                    }`}
                >
                  {user.name || "User"}
                </p>

                <p
                  className={`text-xs ${darkMode
                      ? "text-slate-400"
                      : "text-slate-500"
                    }`}
                >
                  AI Workspace
                </p>
              </div>
            </div>

            {/* Logout */}

            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center gap-2 transition"
            >
              <LogOut size={18} />
              Logout
            </button>

          </div>
        </div>
      </header>

      {/* Settings Modal */}

      {showSettings && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">

          <div
            className={`w-[450px] rounded-3xl p-6 shadow-2xl ${darkMode
                ? "bg-slate-900 border border-white/10"
                : "bg-white"
              }`}
          >
            <div className="flex items-center justify-between mb-6">

              <h2
                className={`text-2xl font-bold ${darkMode
                    ? "text-white"
                    : "text-slate-900"
                  }`}
              >
                Settings
              </h2>

              <button
                onClick={() => setShowSettings(false)}
              >
                <X />
              </button>

            </div>

            <div className="space-y-5">

              {/* Voice Input */}

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">
                  <Mic size={20} />
                  <span>Voice Input</span>
                </div>

                <input
                  type="checkbox"
                  checked={settings.voiceInput}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      voiceInput:
                        e.target.checked,
                    })
                  }
                />

              </div>

              {/* Voice Output */}

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">
                  <Volume2 size={20} />
                  <span>Voice Output</span>
                </div>

                <input
                  type="checkbox"
                  checked={settings.voiceOutput}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      voiceOutput:
                        e.target.checked,
                    })
                  }
                />

              </div>

              {/* Save History */}

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">
                  <Save size={20} />
                  <span>Save Chat History</span>
                </div>

                <input
                  type="checkbox"
                  checked={settings.saveHistory}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      saveHistory:
                        e.target.checked,
                    })
                  }
                />

              </div>

            </div>

            <div className="flex justify-end gap-3 mt-8">

              <button
                onClick={() =>
                  setShowSettings(false)
                }
                className="px-4 py-2 rounded-xl border"
              >
                Cancel
              </button>

              <button
                onClick={saveSettings}
                className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white"
              >
                Save
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}

export default Navbar;