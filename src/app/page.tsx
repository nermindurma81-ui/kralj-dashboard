"use client";

import { useState, useEffect } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content: "Zdravo! Ja sam Kralj 👑, tvoj AI asistent sa 45 skillova. Kako mogu pomoći danas?",
    },
  ]);
  const [kiloStatus, setKiloStatus] = useState("ready");
  const [githubRepo, setGithubRepo] = useState("not-linked");
  const [ollamaStatus, setOllamaStatus] = useState("not-installed");
  const [activeTasks, setActiveTasks] = useState([
    { id: 1, skill: "v0-dev", status: "completed", progress: 100 },
    { id: 2, skill: "app-builder", status: "running", progress: 45 },
  ]);

  // Simulate real-time status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTasks(prev => prev.map(task => 
        task.status === "running" 
          ? { ...task, progress: Math.min(task.progress + 5, 100) }
          : task
      ));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const topSkills = [
    { id: "v0-dev", name: "v0-dev", icon: "🎨", desc: "UI iz prompta", color: "bg-purple-500" },
    { id: "app-builder", name: "App Builder", icon: "💻", desc: "Fullstack app", color: "bg-blue-500" },
    { id: "youtube-shorts", name: "YouTube Shorts", icon: "📹", desc: "Video automation", color: "bg-red-500" },
    { id: "expo-deploy", name: "Expo Deploy", icon: "📱", desc: "Mobile deploy", color: "bg-orange-500" },
    { id: "web-browsing", name: "Web Browsing", icon: "🌐", desc: "Internet search", color: "bg-green-500" },
    { id: "security-audit", name: "Security Audit", icon: "🛡️", desc: "Code review", color: "bg-yellow-500" },
    { id: "infra-engineer", name: "Infra Engineer", icon: "🖥️", desc: "DevOps & Cloud", color: "bg-cyan-500" },
    { id: "github-ops", name: "GitHub Ops", icon: "🔀", desc: "Git workflow", color: "bg-gray-600" },
    { id: "markitdown", name: "Markitdown", icon: "📄", desc: "File conversion", color: "bg-emerald-500" },
    { id: "agentic-coding", name: "Agentic Coding", icon: "🤖", desc: "AI coding", color: "bg-indigo-500" },
  ];

  const skillCategories = [
    { name: "🧠 AI & Data", icon: "🧠", skills: ["agentic-coding", "cc-godmode", "data-analysis", "database", "pgvector", "whisper"] },
    { name: "🎨 Design & Media", icon: "🎨", skills: ["blender", "expo-architect", "image-edit", "image-ocr", "image-vision", "json-render", "screenshot-ocr", "tailwind", "ui-ux", "ui-mobile"] },
    { name: "🤖 Automation", icon: "🤖", skills: ["auto-shorts", "workflows", "social-media", "video-frames", "youtube-shorts"] },
    { name: "🔧 DevOps & Security", icon: "🔧", skills: ["infra-engineer", "security-audit", "web-browsing", "audit-code-health"] },
    { name: "💻 AI Coding", icon: "💻", skills: ["v0-dev", "app-builder", "base44", "crewai", "cursor", "expo-deploy", "manus", "multi-agent", "tanstack", "vibe-coding"] },
    { name: "🛡️ Code Quality", icon: "🛡️", skills: ["api-designer", "code-review", "github-ops", "python-perf", "qa-use"] },
    { name: "📦 Core", icon: "📦", skills: ["find-skills", "gog", "markitdown", "self-improve", "summarize"] },
  ];

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages([...chatMessages, { role: "user", content: chatInput }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Razumio sam: "${chatInput}". Koristit ću odgovarajući skill! 👑` },
      ]);
    }, 500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-500";
      case "running": return "text-blue-500";
      case "failed": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return "✅";
      case "running": return "⏳";
      case "failed": return "❌";
      default: return "⏰";
    }
  };

  const containerStyle = {
    minHeight: "100vh",
    backgroundColor: isDarkMode ? "#0a0a0a" : "#ffffff",
    color: isDarkMode ? "#fafafa" : "#0a0a0a",
    fontFamily: "system-ui, sans-serif",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem 2rem",
    borderBottom: `1px solid ${isDarkMode ? "#262626" : "#e5e5e5"}`,
    position: "sticky" as const,
    top: 0,
    backgroundColor: isDarkMode ? "#0a0a0a" : "#ffffff",
    zIndex: 50,
  };

  const tabsStyle = {
    display: "flex",
    gap: "0.5rem",
    padding: "1rem 2rem",
    borderBottom: `1px solid ${isDarkMode ? "#262626" : "#e5e5e5"}`,
    overflowX: "auto",
  };

  const tabStyle = (isActive: boolean) => ({
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    backgroundColor: isActive ? (isDarkMode ? "#262626" : "#f5f5f5") : "transparent",
    cursor: "pointer",
    border: "none",
    color: "inherit",
    fontWeight: isActive ? 600 : 400,
    whiteSpace: "nowrap",
  });

  const cardStyle = {
    padding: "1.5rem",
    borderRadius: "0.5rem",
    border: `1px solid ${isDarkMode ? "#262626" : "#e5e5e5"}`,
    backgroundColor: isDarkMode ? "#171717" : "#f9f9f9",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
    padding: "2rem",
  };

  const chatContainerStyle = {
    padding: "2rem",
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
    height: "600px",
  };

  const chatMessageStyle = (role: string) => ({
    maxWidth: "80%",
    padding: "0.75rem 1rem",
    borderRadius: "0.5rem",
    backgroundColor: role === "user" 
      ? (isDarkMode ? "#3b82f6" : "#2563eb")
      : (isDarkMode ? "#262626" : "#f5f5f5"),
    border: role === "assistant" ? `1px solid ${isDarkMode ? "#262626" : "#e5e5e5"}` : "none",
  });

  const sidebarStyle = {
    width: "280px",
    padding: "1rem",
    borderRight: `1px solid ${isDarkMode ? "#262626" : "#e5e5e5"}`,
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
    backgroundColor: isDarkMode ? "#111111" : "#fafafa",
  };

  const buttonStyle = {
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    border: "none",
    backgroundColor: "#3b82f6",
    color: "white",
    cursor: "pointer",
    fontWeight: 500,
    transition: "background-color 0.2s",
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <header style={headerStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>👑 Kralj Dashboard</h1>
          <span style={{ fontSize: "0.875rem", opacity: 0.7 }}>v1.0.0</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem" }}>
            <span>Kilo:</span>
            <span style={{ 
              padding: "0.25rem 0.75rem", 
              borderRadius: "0.5rem", 
              backgroundColor: kiloStatus === "ready" ? "#22c55e" : "#ef4444",
              color: "white",
              fontSize: "0.75rem",
              fontWeight: 600
            }}>
              {kiloStatus === "ready" ? "✅ Ready" : "❌ Offline"}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem" }}>
            <span>GitHub:</span>
            <span style={{ 
              padding: "0.25rem 0.75rem", 
              borderRadius: "0.5rem", 
              backgroundColor: githubRepo === "linked" ? "#22c55e" : "#eab308",
              color: "white",
              fontSize: "0.75rem",
              fontWeight: 600
            }}>
              {githubRepo === "linked" ? "✅ Linked" : "⚠️ Not Linked"}
            </span>
          </div>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{ ...buttonStyle, backgroundColor: isDarkMode ? "#f59e0b" : "#1f2937" }}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>
            K👑
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div style={tabsStyle}>
        {["dashboard", "chat", "tasks", "files", "settings", "skills"].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={tabStyle(activeTab === tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ padding: "2rem" }}>
        {activeTab === "dashboard" && (
          <div style={{ display: "flex", gap: "2rem" }}>
            {/* Sidebar */}
            <aside style={sidebarStyle}>
              <div>
                <h3 style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", opacity: 0.7, marginBottom: "0.5rem" }}>
                  Quick Launch
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {topSkills.slice(0, 5).map((skill) => (
                    <button 
                      key={skill.id}
                      style={{ 
                        padding: "0.5rem", 
                        borderRadius: "0.375rem", 
                        border: "none", 
                        backgroundColor: isDarkMode ? "#262626" : "#e5e5e5",
                        color: "inherit",
                        cursor: "pointer",
                        textAlign: "left",
                        fontSize: "0.875rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem"
                      }}
                    >
                      <span>{skill.icon}</span>
                      <span>{skill.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div style={{ borderTop: `1px solid ${isDarkMode ? "#262626" : "#e5e5e5"}`, paddingTop: "1rem" }}>
                <h3 style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", opacity: 0.7, marginBottom: "0.5rem" }}>
                  All Skills ({skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)})
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", overflowY: "auto", maxHeight: "300px" }}>
                  {skillCategories.map((category) => (
                    <div key={category.name}>
                      <div style={{ fontSize: "0.75rem", fontWeight: 600, opacity: 0.8, padding: "0.25rem 0" }}>
                        {category.name}
                      </div>
                      {category.skills.slice(0, 3).map((skill) => (
                        <button 
                          key={skill}
                          style={{ 
                            padding: "0.25rem 0.5rem", 
                            borderRadius: "0.25rem", 
                            border: "none", 
                            backgroundColor: "transparent",
                            color: isDarkMode ? "#a3a3a3" : "#6b7280",
                            cursor: "pointer",
                            fontSize: "0.75rem",
                            textAlign: "left"
                          }}
                        >
                          • {skill}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1 }}>
              {/* Stats Grid */}
              <div style={gridStyle}>
                <div style={cardStyle}>
                  <div style={{ fontSize: "0.875rem", opacity: 0.7, marginBottom: "0.5rem" }}>Active Tasks</div>
                  <div style={{ fontSize: "2rem", fontWeight: 700 }}>{activeTasks.filter(t => t.status === "running").length}</div>
                  <div style={{ fontSize: "0.75rem", opacity: 0.5 }}>In Progress</div>
                </div>
                <div style={cardStyle}>
                  <div style={{ fontSize: "0.875rem", opacity: 0.7, marginBottom: "0.5rem" }}>Completed</div>
                  <div style={{ fontSize: "2rem", fontWeight: 700, color: "#22c55e" }}>{activeTasks.filter(t => t.status === "completed").length}</div>
                  <div style={{ fontSize: "0.75rem", opacity: 0.5 }}>Success Rate: 95%</div>
                </div>
                <div style={cardStyle}>
                  <div style={{ fontSize: "0.875rem", opacity: 0.7, marginBottom: "0.5rem" }}>Skills</div>
                  <div style={{ fontSize: "2rem", fontWeight: 700 }}>45</div>
                  <div style={{ fontSize: "0.75rem", opacity: 0.5 }}>Ready to use</div>
                </div>
                <div style={cardStyle}>
                  <div style={{ fontSize: "0.875rem", opacity: 0.7, marginBottom: "0.5rem" }}>Kilo CLI</div>
                  <div style={{ fontSize: "2rem", fontWeight: 700 }}>v7.1.9</div>
                  <div style={{ fontSize: "0.75rem", opacity: 0.5 }}>Local AI</div>
                </div>
              </div>

              {/* Quick Launch */}
              <div style={{ marginTop: "2rem" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>⚡ Quick Launch - Top 10</h2>
                <div style={gridStyle}>
                  {topSkills.map((skill) => (
                    <div 
                      key={skill.id}
                      style={{ ...cardStyle, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "0.75rem" }}
                    >
                      <div style={{ width: "48px", height: "48px", borderRadius: "0.5rem", backgroundColor: skill.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
                        {skill.icon}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{skill.name}</div>
                        <div style={{ fontSize: "0.75rem", opacity: 0.7 }}>{skill.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Tasks */}
              <div style={{ marginTop: "2rem" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>📋 Active Tasks</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {activeTasks.map((task) => (
                    <div key={task.id} style={{ ...cardStyle, display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{ fontSize: "1.25rem" }}>{getStatusIcon(task.status)}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 500 }}>{task.skill}</div>
                        <div style={{ fontSize: "0.875rem", opacity: 0.7 }}>Processing...</div>
                      </div>
                      <div style={{ width: "150px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "0.25rem" }}>
                          <span>{task.progress}%</span>
                          <span style={getStatusColor(task.status)}>{task.status}</span>
                        </div>
                        <div style={{ width: "100%", height: "6px", borderRadius: "3px", backgroundColor: isDarkMode ? "#262626" : "#e5e5e5", overflow: "hidden" }}>
                          <div style={{ width: `${task.progress}%`, height: "100%", borderRadius: "3px", backgroundColor: task.status === "completed" ? "#22c55e" : "#3b82f6" }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        )}

        {activeTab === "chat" && (
          <div style={chatContainerStyle}>
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {chatMessages.map((msg, idx) => (
                <div key={idx} style={chatMessageStyle(msg.role)}>
                  <div style={{ fontSize: "0.875rem", lineHeight: 1.5 }}>{msg.content}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Piši šta želiš da uradim..."
                style={{ 
                  flex: 1, 
                  padding: "0.75rem 1rem", 
                  borderRadius: "0.375rem", 
                  border: `1px solid ${isDarkMode ? "#262626" : "#e5e5e5"}`,
                  backgroundColor: isDarkMode ? "#171717" : "#ffffff",
                  color: "inherit",
                  fontSize: "0.875rem"
                }}
              />
              <button onClick={handleSendMessage} style={buttonStyle}>
                Send
              </button>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div style={{ maxWidth: "600px" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>⚙️ Settings</h2>
            
            <div style={{ ...cardStyle, marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>🔑 API Keys</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { name: "Groq API", status: "configured" },
                  { name: "Vercel Token", status: "configured" },
                  { name: "Pexels API", status: "configured" },
                  { name: "ElevenLabs", status: "not-configured" },
                  { name: "V0 API Key", status: "not-configured" },
                ].map((key, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem", borderRadius: "0.25rem", backgroundColor: isDarkMode ? "#111111" : "#f5f5f5" }}>
                    <span>{key.name}</span>
                    <span style={{ 
                      padding: "0.25rem 0.75rem", 
                      borderRadius: "0.25rem", 
                      fontSize: "0.75rem", 
                      fontWeight: 600,
                      backgroundColor: key.status === "configured" ? "#22c55e" : "#eab308",
                      color: "white"
                    }}>
                      {key.status === "configured" ? "✓ Configured" : "Not Configured"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ ...cardStyle, marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>🖥️ System Status</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Kilo CLI</span>
                  <span style={{ color: "#22c55e" }}>✅ v7.1.9</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Ollama</span>
                  <span style={{ color: "#eab308" }}>⚠️ Not Installed</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>GitHub Repo</span>
                  <span style={{ color: "#eab308" }}>⚠️ Not Linked</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>OpenClaw Source</span>
                  <span style={{ color: "#22c55e" }}>✅ /workspace/openclaw-source</span>
                </div>
              </div>
            </div>

            <div style={{ ...cardStyle, marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>🎨 Appearance</h3>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Dark Mode</span>
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  style={{ 
                    padding: "0.5rem 1rem", 
                    borderRadius: "0.375rem", 
                    backgroundColor: isDarkMode ? "#f59e0b" : "#1f2937",
                    color: "white",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  {isDarkMode ? "ON" : "OFF"}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "skills" && (
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>🧠 All 45 Skills</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {skillCategories.map((category) => (
                <div key={category.name}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>{category.name}</h3>
                  <div style={gridStyle}>
                    {category.skills.map((skill) => (
                      <div key={skill} style={{ ...cardStyle, display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <span style={{ fontSize: "1.25rem" }}>•</span>
                        <span style={{ fontSize: "0.875rem" }}>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "tasks" && (
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1rem" }}>📋 Task Queue</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {activeTasks.map((task) => (
                <div key={task.id} style={cardStyle}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ fontWeight: 600 }}>{task.skill}</span>
                    <span style={getStatusColor(task.status)}>{task.status}</span>
                  </div>
                  <div style={{ width: "100%", height: "8px", borderRadius: "4px", backgroundColor: isDarkMode ? "#262626" : "#e5e5e5" }}>
                    <div style={{ width: `${task.progress}%`, height: "100%", borderRadius: "4px", backgroundColor: task.status === "completed" ? "#22c55e" : "#3b82f6" }}></div>
                  </div>
                  <div style={{ fontSize: "0.75rem", opacity: 0.7, marginTop: "0.5rem" }}>{task.progress}% complete</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(activeTab === "files" || activeTab === "settings") && activeTab !== "settings" && (
          <div style={{ ...cardStyle, textAlign: "center", padding: "4rem 2rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📁</div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.5rem" }}>File Manager</h3>
            <p style={{ opacity: 0.7, marginBottom: "1rem" }}>Drag & drop files to upload</p>
            <button style={{ ...buttonStyle, padding: "0.75rem 1.5rem" }}>Select Files</button>
          </div>
        )}
      </div>
    </div>
  );
}
