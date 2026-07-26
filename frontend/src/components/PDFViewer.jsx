import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  FileText,
  Download,
  Maximize2,
  Minimize2,
  RotateCw,
} from "lucide-react";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PDFViewer({ selectedPdf, selectedPage }) {
  const { darkMode } = useTheme();

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setPageNumber(1);
    setScale(1.2);
    setRotation(0);
  }, [selectedPdf]);

  useEffect(() => {
    if (
      selectedPage &&
      selectedPage >= 1 &&
      selectedPage <= numPages
    ) {
      setPageNumber(selectedPage);
    }
  }, [selectedPage, numPages]);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!selectedPdf) {
    return (
      <div
        className={`h-full flex items-center justify-center transition-colors duration-300 ${darkMode ? "bg-transparent" : "bg-white"
          }`}
      >
        <div className="text-center">

          <div className="mx-auto w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-xl">
            <FileText className="text-white" size={46} />
          </div>

          <h2
            className={`mt-6 text-2xl font-bold ${darkMode
              ? "text-white"
              : "text-slate-900"
              }`}
          >
            No PDF Selected
          </h2>

          <p
            className={`mt-2 ${darkMode
              ? "text-slate-400"
              : "text-slate-600"
              }`}
          >
            Select a PDF from the sidebar to preview it.
          </p>

        </div>
      </div>
    );
  }

  const BACKEND_URL =
    import.meta.env.VITE_API_URL.replace("/api", "");

  const pdfUrl = `${BACKEND_URL}/uploads/${selectedPdf.filepath.replace(
    /\\/g,
    "/"
  )}`;

  return (
    <div
      className={`h-full flex flex-col overflow-hidden rounded-3xl transition-colors duration-300 ${darkMode ? "bg-[#0F172A]" : "bg-white"
        }`}
    >
      {/* ---------- Toolbar ---------- */}

      <motion.div
        initial={{
          opacity: 0,
          y: -15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
        }}
        className={`h-20 px-6 border-b flex items-center justify-between transition-colors duration-300 ${darkMode
          ? "bg-[#111827] border-white/10"
          : "bg-slate-50 border-slate-200"
          }`}
      >
        {/* Left */}

        <div className="overflow-hidden">
          <h2
            className={`font-semibold text-lg truncate ${darkMode ? "text-white" : "text-slate-900"
              }`}
          >
            {selectedPdf.filename}
          </h2>

          <p
            className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"
              }`}
          >
            PDF Preview
          </p>
        </div>

        {/* Right */}

        <div className="flex items-center gap-3">
          {/* Zoom Out */}

          <button
            onClick={() =>
              setScale((prev) => Math.max(0.6, prev - 0.1))
            }
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition ${darkMode
              ? "border-white/10 bg-white/5 hover:bg-white/10"
              : "border-slate-300 bg-white hover:bg-slate-100"
              }`}
          >
            <ZoomOut
              size={18}
              className={darkMode ? "text-white" : "text-slate-700"}
            />
          </button>

          <span
            className={`w-14 text-center font-semibold ${darkMode ? "text-white" : "text-slate-900"
              }`}
          >
            {(scale * 100).toFixed(0)}%
          </span>

          {/* Zoom In */}

          <button
            onClick={() =>
              setScale((prev) => Math.min(3, prev + 0.1))
            }
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition ${darkMode
              ? "border-white/10 bg-white/5 hover:bg-white/10"
              : "border-slate-300 bg-white hover:bg-slate-100"
              }`}
          >
            <ZoomIn
              size={18}
              className={darkMode ? "text-white" : "text-slate-700"}
            />
          </button>

          {/* Rotate */}

          <button
            onClick={() =>
              setRotation((r) => (r + 90) % 360)
            }
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition ${darkMode
              ? "border-white/10 bg-white/5 hover:bg-white/10"
              : "border-slate-300 bg-white hover:bg-slate-100"
              }`}
          >
            <RotateCw
              size={18}
              className={darkMode ? "text-white" : "text-slate-700"}
            />
          </button>

          {/* Fullscreen */}

          <button
            onClick={toggleFullscreen}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition ${darkMode
              ? "border-white/10 bg-white/5 hover:bg-white/10"
              : "border-slate-300 bg-white hover:bg-slate-100"
              }`}
          >
            {isFullscreen ? (
              <Minimize2
                size={18}
                className={darkMode ? "text-white" : "text-slate-700"}
              />
            ) : (
              <Maximize2
                size={18}
                className={darkMode ? "text-white" : "text-slate-700"}
              />
            )}
          </button>

          {/* Download */}

          <a
            href={pdfUrl}
            download
            className="ml-2 flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2 font-medium text-white hover:scale-105 transition"
          >
            <Download size={18} />
            Download
          </a>
        </div>
      </motion.div>

      {/* ---------- PDF Viewer ---------- */}

      <div
        className={`flex-1 overflow-auto flex justify-center items-start p-8 transition-colors duration-300 ${darkMode ? "bg-[#0B1120]" : "bg-slate-100"
          }`}
      >
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          onLoadError={(err) => console.error(err)}
          loading={
            <div className="flex flex-col items-center justify-center gap-5 mt-24">
              <div className="w-14 h-14 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />

              <p
                className={
                  darkMode
                    ? "text-slate-400"
                    : "text-slate-600"
                }
              >
                Loading PDF...
              </p>
            </div>
          }
          error={
            <div className="flex flex-col items-center justify-center mt-24">
              <FileText
                size={70}
                className="text-red-500"
              />

              <h2
                className={`mt-5 text-xl font-semibold ${darkMode
                  ? "text-white"
                  : "text-slate-900"
                  }`}
              >
                Unable to load PDF
              </h2>

              <p
                className={`mt-2 ${darkMode
                  ? "text-slate-400"
                  : "text-slate-600"
                  }`}
              >
                Please try uploading the document again.
              </p>
            </div>
          }
        >
          <motion.div
            key={pageNumber}
            initial={{
              opacity: 0,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.25,
            }}
            className="shadow-2xl rounded-xl overflow-hidden bg-white"
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              rotate={rotation}
              renderTextLayer
              renderAnnotationLayer
            />
          </motion.div>
        </Document>
      </div>

      {/* ---------- Footer ---------- */}

      <div
        className={`h-20 border-t flex items-center justify-center gap-6 transition-colors duration-300 ${darkMode
          ? "bg-[#111827] border-white/10"
          : "bg-slate-50 border-slate-200"
          }`}
      >
        {/* Previous */}

        <button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber((prev) => prev - 1)}
          className={`w-11 h-11 rounded-xl border flex items-center justify-center transition disabled:opacity-40 ${darkMode
            ? "bg-white/5 border-white/10 hover:bg-white/10"
            : "bg-white border-slate-300 hover:bg-slate-100"
            }`}
        >
          <ChevronLeft
            size={20}
            className={
              darkMode
                ? "text-white"
                : "text-slate-700"
            }
          />
        </button>

        {/* Page Input */}

        <div
          className={`flex items-center gap-3 rounded-xl px-5 py-2 border ${darkMode
            ? "bg-white/5 border-white/10"
            : "bg-white border-slate-300"
            }`}
        >
          <span
            className={
              darkMode
                ? "text-slate-400"
                : "text-slate-600"
            }
          >
            Page
          </span>

          <input
            type="number"
            value={pageNumber}
            min={1}
            max={numPages || 1}
            onChange={(e) => {
              const page = Number(e.target.value);

              if (page >= 1 && page <= numPages) {
                setPageNumber(page);
              }
            }}
            className={`w-16 bg-transparent outline-none text-center font-semibold ${darkMode
              ? "text-white"
              : "text-slate-900"
              }`}
          />

          <span
            className={
              darkMode
                ? "text-slate-400"
                : "text-slate-600"
            }
          >
            /
          </span>

          <span
            className={`font-semibold ${darkMode
              ? "text-white"
              : "text-slate-900"
              }`}
          >
            {numPages || 1}
          </span>
        </div>

        {/* Next */}

        <button
          disabled={pageNumber >= numPages}
          onClick={() => setPageNumber((prev) => prev + 1)}
          className={`w-11 h-11 rounded-xl border flex items-center justify-center transition disabled:opacity-40 ${darkMode
            ? "bg-white/5 border-white/10 hover:bg-white/10"
            : "bg-white border-slate-300 hover:bg-slate-100"
            }`}
        >
          <ChevronRight
            size={20}
            className={
              darkMode
                ? "text-white"
                : "text-slate-700"
            }
          />
        </button>
      </div>
    </div>
  );
}

export default PDFViewer;