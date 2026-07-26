import { useEffect, useRef, useState } from "react";
import {
  Group,
  Panel,
  Separator,
} from "react-resizable-panels";

import { useTheme } from "../context/ThemeContext";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PDFViewer from "../components/PDFViewer";
import ChatWindow from "../components/chat/ChatWindow";

function Dashboard() {
  const { darkMode } = useTheme();

  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedPage, setSelectedPage] = useState(1);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return JSON.parse(
      localStorage.getItem("sidebarCollapsed")
    ) ?? false;
  });

  const groupRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(
      "sidebarCollapsed",
      JSON.stringify(sidebarCollapsed)
    );
  }, [sidebarCollapsed]);

  useEffect(() => {
    if (!groupRef.current) return;

    if (sidebarCollapsed) {
      groupRef.current.setLayout({
        sidebar: 6,
        pdf: 54,
        chat: 40,
      });
    } else {
      groupRef.current.setLayout({
        sidebar: 24,
        pdf: 41,
        chat: 35,
      });
    }
  }, [sidebarCollapsed]);
  return (
    <div
      className={`h-screen flex flex-col overflow-hidden transition-colors duration-300 ${darkMode ? "bg-[#0B1120]" : "bg-slate-100"
        }`}
    >
      <Navbar />

      <main className="flex-1 p-5 overflow-hidden">

        <Group
          orientation="horizontal"
          id="askpdf-dashboard"
          groupRef={groupRef}
          className="h-full"
        >

          {/* ================= Sidebar ================= */}

          <Panel
            id="sidebar"
            defaultSize="24%"
            minSize="18%"
            maxSize="30%"
            collapsible
            collapsedSize="6%"
          >
            <section
              className={`h-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ${darkMode
                  ? "bg-white/5 border border-white/10 backdrop-blur-xl"
                  : "bg-white border border-slate-200"
                }`}
            >
              <Sidebar
                selectedPdf={selectedPdf}
                setSelectedPdf={setSelectedPdf}
                collapsed={sidebarCollapsed}
                setCollapsed={setSidebarCollapsed}
              />
            </section>
          </Panel>

          {/* Resize Handle */}

          <Separator className="group w-3 flex items-center justify-center cursor-col-resize">

            <div
              className={`w-1 rounded-full transition-all duration-300 group-hover:h-40 h-28 ${darkMode
                  ? "bg-white/10 group-hover:bg-violet-500"
                  : "bg-slate-300 group-hover:bg-violet-500"
                }`}
            />

          </Separator>

          {/* ================= PDF ================= */}

          <Panel
            id="pdf"
            defaultSize="41%"
            minSize="25%"
          >
            <section
              className={`h-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ${darkMode
                  ? "bg-white/5 border border-white/10 backdrop-blur-xl"
                  : "bg-white border border-slate-200"
                }`}
            >
              <PDFViewer
                selectedPdf={selectedPdf}
                selectedPage={selectedPage}
              />
            </section>
          </Panel>

          {/* Resize Handle */}

          <Separator className="group w-3 flex items-center justify-center cursor-col-resize">

            <div
              className={`w-1 rounded-full transition-all duration-300 group-hover:h-40 h-28 ${darkMode
                  ? "bg-white/10 group-hover:bg-violet-500"
                  : "bg-slate-300 group-hover:bg-violet-500"
                }`}
            />

          </Separator>

          {/* ================= Chat ================= */}

          <Panel
            id="chat"
            defaultSize="35%"
            minSize="25%"
          >
            <section
              className={`h-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ${darkMode
                  ? "bg-white/5 border border-white/10 backdrop-blur-xl"
                  : "bg-white border border-slate-200"
                }`}
            >
              <ChatWindow
                selectedPdf={selectedPdf}
                onSourceClick={setSelectedPage}
              />
            </section>
          </Panel>

        </Group>

      </main>

    </div>
  );
}

export default Dashboard;