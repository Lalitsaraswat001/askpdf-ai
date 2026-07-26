import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Bot,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Moon,
  Sun,
  ArrowRight,
} from "lucide-react";

import { registerUser } from "../services/authService";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await registerUser(
        name,
        email,
        password
      );

      toast.success(
        data.message || "Registration Successful!"
      );

      navigate("/");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Registration Failed"
      );
    }

    setLoading(false);
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${darkMode
          ? "bg-[#0B1120]"
          : "bg-slate-100"
        }`}
    >
      {/* Theme Toggle */}

      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 w-12 h-12 rounded-xl transition ${darkMode
            ? "bg-white/10 text-yellow-300 hover:bg-white/20"
            : "bg-white shadow-lg text-slate-700 hover:bg-slate-100"
          }`}
      >
        {darkMode ? (
          <Sun className="mx-auto" />
        ) : (
          <Moon className="mx-auto" />
        )}
      </button>

      <div className="grid lg:grid-cols-2 min-h-screen">

        {/* LEFT */}

        <div className="hidden lg:flex flex-col justify-center px-20">

          <div className="flex items-center gap-5">

            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 flex items-center justify-center shadow-2xl">

              <Bot className="w-10 h-10 text-white" />

            </div>

            <div>

              <h1
                className={`text-5xl font-extrabold ${darkMode
                    ? "text-white"
                    : "text-slate-900"
                  }`}
              >
                AskPDF AI
              </h1>

              <p className="text-slate-400 mt-2 text-lg">
                Intelligent PDF Assistant
              </p>

            </div>

          </div>

          <div className="mt-20 space-y-8">

            {[
              "🚀 Create your AI workspace",
              "📄 Upload unlimited PDFs",
              "💬 Chat intelligently with documents",
              "🧠 AI summaries & explanations",
              "⚡ Lightning-fast search",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4"
              >
                <div className="w-3 h-3 rounded-full bg-violet-500" />

                <p
                  className={`text-xl ${darkMode
                      ? "text-slate-300"
                      : "text-slate-700"
                    }`}
                >
                  {item}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* Register Card */}

        <div className="flex items-center justify-center px-5 py-10">

          <div
            className={`w-full max-w-md rounded-3xl transition-all duration-500 p-10 ${darkMode
                ? "bg-white/5 border border-white/10 backdrop-blur-xl"
                : "bg-white border border-slate-200 shadow-2xl"
              }`}
          >

            <h2
              className={`text-3xl font-bold text-center ${darkMode
                  ? "text-white"
                  : "text-slate-900"
                }`}
            >
              Create Account 🚀
            </h2>

            <p
              className={`text-center mt-2 ${darkMode
                  ? "text-slate-400"
                  : "text-slate-500"
                }`}
            >
              Join AskPDF AI today
            </p>

            <form
              onSubmit={handleRegister}
              className="mt-10 space-y-6"
            >
              {/* Name */}

              <div>
                <label
                  className={`block mb-2 font-medium ${darkMode ? "text-slate-300" : "text-slate-700"
                    }`}
                >
                  Full Name
                </label>

                <div
                  className={`flex items-center rounded-xl border transition ${darkMode
                      ? "border-white/10 bg-white/5"
                      : "border-slate-300 bg-slate-50"
                    }`}
                >
                  <User
                    className={`ml-4 ${darkMode ? "text-slate-400" : "text-slate-500"
                      }`}
                    size={20}
                  />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className={`flex-1 bg-transparent outline-none p-4 ${darkMode ? "text-white" : "text-slate-900"
                      }`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Email */}

              <div>
                <label
                  className={`block mb-2 font-medium ${darkMode ? "text-slate-300" : "text-slate-700"
                    }`}
                >
                  Email Address
                </label>

                <div
                  className={`flex items-center rounded-xl border transition ${darkMode
                      ? "border-white/10 bg-white/5"
                      : "border-slate-300 bg-slate-50"
                    }`}
                >
                  <Mail
                    className={`ml-4 ${darkMode ? "text-slate-400" : "text-slate-500"
                      }`}
                    size={20}
                  />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`flex-1 bg-transparent outline-none p-4 ${darkMode ? "text-white" : "text-slate-900"
                      }`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password */}

              <div>
                <label
                  className={`block mb-2 font-medium ${darkMode ? "text-slate-300" : "text-slate-700"
                    }`}
                >
                  Password
                </label>

                <div
                  className={`flex items-center rounded-xl border transition ${darkMode
                      ? "border-white/10 bg-white/5"
                      : "border-slate-300 bg-slate-50"
                    }`}
                >
                  <Lock
                    className={`ml-4 ${darkMode ? "text-slate-400" : "text-slate-500"
                      }`}
                    size={20}
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className={`flex-1 bg-transparent outline-none p-4 ${darkMode ? "text-white" : "text-slate-900"
                      }`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="mr-4"
                  >
                    {showPassword ? (
                      <EyeOff
                        size={20}
                        className={
                          darkMode
                            ? "text-slate-400"
                            : "text-slate-500"
                        }
                      />
                    ) : (
                      <Eye
                        size={20}
                        className={
                          darkMode
                            ? "text-slate-400"
                            : "text-slate-500"
                        }
                      />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}

              <label
                className={`flex items-start gap-3 text-sm ${darkMode
                    ? "text-slate-300"
                    : "text-slate-600"
                  }`}
              >
                <input
                  type="checkbox"
                  required
                  className="mt-1"
                />

                <span>
                  I agree to the Terms of Service and Privacy
                  Policy.
                </span>
              </label>

              {/* Register Button */}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white font-semibold shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  "Creating Account..."
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

            </form>

            <div className="mt-8 text-center">

              <p
                className={`${darkMode
                    ? "text-slate-400"
                    : "text-slate-600"
                  }`}
              >
                Already have an account?
              </p>

              <Link
                to="/"
                className="mt-3 inline-block font-semibold text-violet-600 hover:text-violet-700"
              >
                Sign In
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;