import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  FileText,
  Upload,
  Search,
  Loader2,
  PanelLeftClose,
  PanelLeftOpen,
  Trash2,
} from "lucide-react";

import {
  uploadPDF,
  getUserPDFs,
  deletePDF,
} from "../services/pdfService";

import { useTheme } from "../context/ThemeContext";

function Sidebar({
  selectedPdf,
  setSelectedPdf,
  collapsed,
  setCollapsed,
}) {
  const { darkMode } = useTheme();

  const fileInput = useRef(null);

  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchPDFs = async () => {
    try {
      setLoading(true);

      const response = await getUserPDFs();

      if (Array.isArray(response)) {
        setPdfs(response);
      } else if (Array.isArray(response.pdfs)) {
        setPdfs(response.pdfs);
      } else if (Array.isArray(response.data)) {
        setPdfs(response.data);
      } else {
        setPdfs([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load PDFs");
      setPdfs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPDFs();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      toast.loading("Uploading PDF...", {
        toastId: "upload",
      });

      await uploadPDF(file);

      await fetchPDFs();

      toast.update("upload", {
        render: "✅ PDF Uploaded Successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      e.target.value = "";
    } catch (err) {
      toast.update("upload", {
        render:
          err.response?.data?.message ||
          "Upload Failed",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleDelete = async (e, pdfId) => {
    e.stopPropagation();

    const confirmed = window.confirm(
      "Are you sure you want to delete this PDF?"
    );

    if (!confirmed) return;

    try {
      await deletePDF(pdfId);

      setPdfs((prev) =>
        prev.filter((pdf) => pdf._id !== pdfId)
      );

      if (selectedPdf?._id === pdfId) {
        setSelectedPdf(null);
      }

      toast.success("PDF deleted successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete PDF.");
    }
  };

  const filteredPDFs = pdfs.filter((pdf) =>
    (
      pdf.fileName ||
      pdf.filename ||
      pdf.originalName ||
      ""
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div
      className={`h-full flex flex-col transition-colors duration-300 ${darkMode ? "bg-transparent" : "bg-white"
        }`}
    >
      {/* Header */}

      <div
        className={`px-5 pt-5 pb-4 border-b ${darkMode
            ? "border-white/10"
            : "border-slate-200"
          }`}
      >
        <div className="flex items-center justify-between">

          {!collapsed && (
            <div>
              <h2
                className={`text-2xl font-bold ${darkMode
                    ? "text-white"
                    : "text-slate-900"
                  }`}
              >
                My Workspace
              </h2>

              <p
                className={`text-sm mt-1 ${darkMode
                    ? "text-gray-400"
                    : "text-slate-500"
                  }`}
              >
                {pdfs.length} Documents
              </p>
            </div>
          )}

          <button
            onClick={() =>
              setCollapsed(!collapsed)
            }
            className={`w-11 h-11 rounded-xl border transition flex items-center justify-center ${darkMode
                ? "bg-white/5 border-white/10 hover:bg-white/10"
                : "bg-slate-100 border-slate-300 hover:bg-slate-200"
              }`}
          >
            {collapsed ? (
              <PanelLeftOpen
                className={
                  darkMode
                    ? "text-white"
                    : "text-slate-700"
                }
              />
            ) : (
              <PanelLeftClose
                className={
                  darkMode
                    ? "text-white"
                    : "text-slate-700"
                }
              />
            )}
          </button>
        </div>
      </div>

      {/* Search */}

      {!collapsed && (
        <div className="px-6 py-5">
          <div className="relative">

            <Search
              size={18}
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${darkMode
                  ? "text-gray-500"
                  : "text-slate-400"
                }`}
            />

            <input
              type="text"
              placeholder="Search documents..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className={`w-full rounded-2xl border py-3 pl-11 pr-4 outline-none transition ${darkMode
                  ? "bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/40"
                  : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                }`}
            />

          </div>
        </div>
      )}

      {/* PDF List */}

      <div
        className={`flex-1 overflow-y-auto pb-4 space-y-3 ${collapsed ? "px-2" : "px-6"
          }`}
      >
        {loading ? (
          <div
            className={`flex flex-col items-center justify-center h-full ${darkMode
                ? "text-gray-400"
                : "text-slate-500"
              }`}
          >
            <Loader2
              className="animate-spin mb-3"
              size={35}
            />

            {!collapsed && "Loading Documents..."}
          </div>
        ) : filteredPDFs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <FileText
              size={65}
              className={
                darkMode
                  ? "text-gray-600 mb-4"
                  : "text-slate-300 mb-4"
              }
            />

            {!collapsed && (
              <>
                <h3
                  className={`text-lg font-semibold ${darkMode
                      ? "text-white"
                      : "text-slate-900"
                    }`}
                >
                  No Documents
                </h3>

                <p
                  className={`text-center mt-2 ${darkMode
                      ? "text-gray-500"
                      : "text-slate-500"
                    }`}
                >
                  Upload your first PDF to start chatting.
                </p>
              </>
            )}
          </div>
        ) : (
          filteredPDFs.map((pdf) => (
            <div
              key={pdf._id}
              onClick={() => setSelectedPdf(pdf)}
              className={`
                cursor-pointer
                rounded-2xl
                border
                transition-all
                duration-300
                hover:scale-[1.02]
                group

                ${collapsed
                  ? "p-3 flex justify-center"
                  : "p-4"
                }

                ${selectedPdf?._id === pdf._id
                  ? "border-violet-500 bg-violet-500/20 shadow-lg"
                  : darkMode
                    ? "border-white/10 bg-white/5 hover:bg-white/10 hover:border-violet-500/40"
                    : "border-slate-200 bg-white hover:bg-slate-50 hover:border-violet-400 shadow-sm"
                }
              `}
            >
              <div
                className={`flex items-center ${collapsed
                    ? "justify-center"
                    : "gap-4"
                  }`}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow">
                  <FileText
                    className="text-white"
                    size={22}
                  />
                </div>

                {!collapsed && (
                  <div className="flex-1 flex items-center justify-between gap-3 overflow-hidden">

                    <div className="flex-1 overflow-hidden">
                      <p
                        className={`font-semibold truncate ${darkMode
                            ? "text-white"
                            : "text-slate-900"
                          }`}
                      >
                        {pdf.fileName ||
                          pdf.filename ||
                          pdf.originalName ||
                          "Untitled PDF"}
                      </p>

                      <p
                        className={`text-xs mt-1 ${darkMode
                            ? "text-gray-400"
                            : "text-slate-500"
                          }`}
                      >
                        PDF Document
                      </p>
                    </div>

                    <button
                      onClick={(e) =>
                        handleDelete(e, pdf._id)
                      }
                      className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 hover:text-red-600 transition opacity-0 group-hover:opacity-100"
                      title="Delete PDF"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upload */}

      <div
        className={`border-t ${darkMode
            ? "border-white/10"
            : "border-slate-200"
          } ${collapsed ? "p-3" : "p-6"}`}
      >
        <input
          type="file"
          accept=".pdf"
          hidden
          ref={fileInput}
          onChange={handleUpload}
        />

        <button
          onClick={() =>
            fileInput.current.click()
          }
          className="
            w-full
            rounded-2xl
            bg-gradient-to-r
            from-violet-600
            to-blue-600
            hover:from-violet-500
            hover:to-blue-500
            transition-all
            duration-300
            hover:scale-[1.02]
            py-3
            text-white
            font-semibold
            shadow-lg
            flex
            items-center
            justify-center
            gap-2
          "
        >
          <Upload size={20} />
          {!collapsed && "Upload PDF"}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;