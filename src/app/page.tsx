"use client";

import { useState } from "react";

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
  const [tasks, setTasks] = useState<any[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

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

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMsg = chatInput;
    setChatMessages([...chatMessages, { role: "user", content: chatInput }]);
    setChatInput("");
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: chatInput }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setChatMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply || 'Poruka je poslata! 👑' },
        ]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          { role: "assistant", content: `Greška: ${data.error || 'Nešto nije u redu'}` },
        ]);
      }
    } catch (err) {
      // Fallback - jednostavan odgovor
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: `👑 Kralj: Dobio sam tvoju poruku: "${userMsg}"\n\nJoš uvijek pravim pravi chat - sačekaj malo! 🚀` },
      ]);
    }
  };

  const executeSkill = async (skillId: string, skillName: string) => {
    if (isExecuting) return;
    setIsExecuting(true);

    try {
      const response = await fetch('/api/skills/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skill: skillId,
          description: `Executing ${skillName}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Dodaj novi task u listu
        setTasks(prev => [data.task, ...prev]);
        
        // Obavijesti korisnika
        setChatMessages(prev => [
          ...prev,
          {
            role: "assistant",
            content: `🚀 Pokrenuo sam ${skillName}! Task ID: ${data.taskId}. Prati napredak u Tasks tabu.`,
          },
        ]);

        // Prebaci na Tasks tab nakon 2 sekunde
        setTimeout(() => setActiveTab("tasks"), 2000);
      } else {
        throw new Error(data.error || 'Failed to execute skill');
      }
    } catch (error) {
      console.error('Skill execution error:', error);
      setChatMessages(prev => [
        ...prev,
        {
          role: "assistant",
          content: `❌ Greška pri pokretanju ${skillName}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        },
      ]);
    } finally {
      setIsExecuting(false);
    }
  };

  const loadTasks = async () => {
    try {
      const response = await fetch('/api/skills/execute');
      const data = await response.json();
      if (data.success) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  // Load tasks when switching to tasks tab
  useState(() => {
    if (activeTab === 'tasks') {
      loadTasks();
    }
  });

  const bgClass = isDarkMode ? "bg-gray-950" : "bg-white";
  const textClass = isDarkMode ? "text-gray-100" : "text-gray-900";
  const borderClass = isDarkMode ? "border-gray-800" : "border-gray-200";
  const cardBgClass = isDarkMode ? "bg-gray-900" : "bg-gray-50";

  return (
    <div className={`min-h-screen ${bgClass} ${textClass}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b ${borderClass} ${bgClass} backdrop-blur`}>
        <div className="flex h-14 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold">👑 Kralj Dashboard</h1>
            <span className="text-xs opacity-70">v1.0.0</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span>Kilo:</span>
              <span className="px-2 py-0.5 rounded-full bg-green-500 text-white text-xs font-semibold">✅ Ready</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span>GitHub:</span>
              <span className="px-2 py-0.5 rounded-full bg-yellow-500 text-white text-xs font-semibold">⚠️ Not Linked</span>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="px-3 py-1.5 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors"
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">
              K👑
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className={`flex gap-2 px-6 py-3 border-b ${borderClass} overflow-x-auto`}>
        {["dashboard", "chat", "tasks", "files", "settings", "skills"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab
                ? isDarkMode
                  ? "bg-gray-800"
                  : "bg-gray-200"
                : "hover:bg-gray-800/50"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="p-6">
        {activeTab === "dashboard" && (
          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className={`w-72 p-4 border-r ${borderClass} ${cardBgClass}`}>
              <div>
                <h3 className="text-xs font-semibold uppercase opacity-70 mb-3">Quick Launch</h3>
                <div className="space-y-2">
                  {topSkills.slice(0, 5).map((skill) => (
                    <button
                      key={skill.id}
                      className={`w-full p-2 rounded-md text-left text-sm flex items-center gap-2 transition-colors ${
                        isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      <span>{skill.icon}</span>
                      <span>{skill.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className={`mt-6 pt-4 border-t ${borderClass}`}>
                <h3 className="text-xs font-semibold uppercase opacity-70 mb-3">All Skills (45)</h3>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {skillCategories.map((category) => (
                    <div key={category.name}>
                      <div className="text-xs font-semibold opacity-80 mb-1">{category.name}</div>
                      {category.skills.slice(0, 3).map((skill) => (
                        <button
                          key={skill}
                          className="block w-full text-left text-xs py-0.5 opacity-70 hover:opacity-100"
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
            <main className="flex-1">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className={`p-4 rounded-lg border ${borderClass} ${cardBgClass}`}>
                  <div className="text-sm opacity-70 mb-2">Active Tasks</div>
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-xs opacity-50">In Progress</div>
                </div>
                <div className={`p-4 rounded-lg border ${borderClass} ${cardBgClass}`}>
                  <div className="text-sm opacity-70 mb-2">Completed</div>
                  <div className="text-2xl font-bold text-green-500">0</div>
                  <div className="text-xs opacity-50">Success Rate: 95%</div>
                </div>
                <div className={`p-4 rounded-lg border ${borderClass} ${cardBgClass}`}>
                  <div className="text-sm opacity-70 mb-2">Skills</div>
                  <div className="text-2xl font-bold">45</div>
                  <div className="text-xs opacity-50">Ready to use</div>
                </div>
                <div className={`p-4 rounded-lg border ${borderClass} ${cardBgClass}`}>
                  <div className="text-sm opacity-70 mb-2">Kilo CLI</div>
                  <div className="text-2xl font-bold">v7.1.9</div>
                  <div className="text-xs opacity-50">Local AI</div>
                </div>
              </div>

              {/* Quick Launch */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">⚡ Quick Launch - Top 10</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {topSkills.map((skill) => (
                    <div
                      key={skill.id}
                      onClick={() => executeSkill(skill.id, skill.name)}
                      className={`p-4 rounded-lg border ${borderClass} ${cardBgClass} flex flex-col items-center text-center gap-3 cursor-pointer hover:shadow-lg transition-shadow ${
                        isExecuting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg ${skill.color} flex items-center justify-center text-2xl`}>
                        {skill.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{skill.name}</div>
                        <div className="text-xs opacity-70">{skill.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </main>
          </div>
        )}

        {activeTab === "chat" && (
          <div className="max-w-4xl mx-auto">
            <div className={`rounded-lg border ${borderClass} overflow-hidden`}>
              <div className={`h-96 overflow-y-auto p-4 space-y-4 ${cardBgClass}`}>
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.role === "user"
                          ? "bg-blue-500 text-white"
                          : isDarkMode
                          ? "bg-gray-800"
                          : "bg-gray-200"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className={`p-4 border-t ${borderClass}`}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Piši šta želiš da uradim..."
                    className={`flex-1 px-4 py-2 rounded-md border ${borderClass} ${
                      isDarkMode ? "bg-gray-800" : "bg-white"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "skills" && (
          <div>
            <h2 className="text-xl font-semibold mb-6">🧠 All 45 Skills</h2>
            <div className="space-y-8">
              {skillCategories.map((category) => (
                <div key={category.name}>
                  <h3 className="text-lg font-semibold mb-3">{category.name}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {category.skills.map((skill) => (
                      <div
                        key={skill}
                        className={`p-3 rounded-lg border ${borderClass} ${cardBgClass} text-sm cursor-pointer hover:shadow-md transition-shadow`}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold mb-6">⚙️ Settings</h2>

            <div className={`rounded-lg border ${borderClass} ${cardBgClass} p-6 mb-6`}>
              <h3 className="font-semibold mb-4">🔑 API Keys</h3>
              <div className="space-y-3">
                {[
                  { name: "Groq API", status: "configured" },
                  { name: "Vercel Token", status: "configured" },
                  { name: "Pexels API", status: "configured" },
                  { name: "ElevenLabs", status: "not-configured" },
                  { name: "V0 API Key", status: "not-configured" },
                ].map((key, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-3 rounded-md ${
                      isDarkMode ? "bg-gray-800" : "bg-gray-100"
                    }`}
                  >
                    <span>{key.name}</span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        key.status === "configured"
                          ? "bg-green-500 text-white"
                          : "bg-yellow-500 text-white"
                      }`}
                    >
                      {key.status === "configured" ? "✓ Configured" : "Not Configured"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`rounded-lg border ${borderClass} ${cardBgClass} p-6 mb-6`}>
              <h3 className="font-semibold mb-4">🖥️ System Status</h3>
              <div className="space-y-3">
                {[
                  { name: "Kilo CLI", status: "✅ v7.1.9" },
                  { name: "Ollama", status: "⚠️ Not Installed" },
                  { name: "GitHub Repo", status: "✅ Linked" },
                  { name: "OpenClaw Source", status: "✅ /workspace/openclaw-source" },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`rounded-lg border ${borderClass} ${cardBgClass} p-6`}>
              <h3 className="font-semibold mb-4">🎨 Appearance</h3>
              <div className="flex justify-between items-center">
                <span>Dark Mode</span>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    isDarkMode ? "bg-yellow-500" : "bg-gray-700"
                  } text-white`}
                >
                  {isDarkMode ? "ON" : "OFF"}
                </button>
              </div>
            </div>
          </div>
        )}

        {(activeTab === "tasks" || activeTab === "files") && (
          <div className={`rounded-lg border ${borderClass} ${cardBgClass} p-12 text-center`}>
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
            <p className="opacity-70 mb-4">This feature is under development</p>
            <button className="px-6 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors">
              Select Files
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
