"use client";

import { useState, useEffect } from "react";

type Bot = {
  id: string;
  name: string;
  status: "online" | "offline" | "busy";
  sessions: number;
  messages: number;
  uptime: string;
  model: string;
};

type Session = {
  id: string;
  bot: string;
  user: string;
  messages: number;
  lastActive: string;
  status: "active" | "idle";
};

type Config = {
  key: string;
  value: string;
  status: "configured" | "missing";
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [darkMode, setDarkMode] = useState(true);

  // Botovi
  const bots: Bot[] = [
    { id: "1", name: "Kralj 👑", status: "online", sessions: 3, messages: 1247, uptime: "99.8%", model: "Gensee-397B" },
  ];

  // Sesije
  const sessions: Session[] = [
    { id: "sess_001", bot: "Kralj 👑", user: "nermin", messages: 47, lastActive: "Sada", status: "active" },
    { id: "sess_002", bot: "ShortAI Bot", user: "user_123", messages: 23, lastActive: "2 min", status: "active" },
    { id: "sess_003", bot: "Kralj 👑", user: "user_456", messages: 156, lastActive: "5 min", status: "idle" },
    { id: "sess_004", bot: "Video Bot", user: "user_789", messages: 89, lastActive: "12 min", status: "idle" },
  ];

  // Konfiguracije
  const configs: Config[] = [
    { key: "GROQ_API_KEY", value: "gsk_••••••••••••", status: "configured" },
    { key: "VERCEL_TOKEN", value: "vcp_••••••••••••", status: "configured" },
    { key: "PEXELS_API_KEY", value: "••••••••••••••••", status: "configured" },
    { key: "ELEVENLABS_KEY", value: "Not configured", status: "missing" },
    { key: "YOUTUBE_API_KEY", value: "••••••••••••••••", status: "configured" },
    { key: "OPENCLAW_GATEWAY_URL", value: "https://••••••.trycloudflare.com", status: "configured" },
  ];

  // Statistike
  const stats = {
    totalBots: bots.length,
    activeBots: bots.filter(b => b.status !== "offline").length,
    totalSessions: sessions.length,
    activeSessions: sessions.filter(s => s.status === "active").length,
    totalMessages: bots.reduce((acc, b) => acc + b.messages, 0),
    avgUptime: (bots.reduce((acc, b) => acc + parseFloat(b.uptime), 0) / bots.length).toFixed(1),
  };

  const bgClass = darkMode ? "bg-[#0a0a0a]" : "bg-gray-50";
  const cardClass = darkMode ? "bg-[#111] border-white/10" : "bg-white border-gray-200";
  const textPrimary = darkMode ? "text-white" : "text-gray-900";
  const textSecondary = darkMode ? "text-gray-400" : "text-gray-600";
  const borderClass = darkMode ? "border-white/10" : "border-gray-200";

  return (
    <div className={`min-h-screen ${bgClass} ${textPrimary}`}>
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 ${darkMode ? "bg-[#111]" : "bg-white"} border-r ${borderClass} p-6`}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-xl">
            🤖
          </div>
          <div>
            <h1 className="font-bold text-lg">Gensee AI</h1>
            <p className={`text-xs ${textSecondary}`}>Bot Control</p>
          </div>
        </div>

        <nav className="space-y-2">
          {[
            { id: "overview", icon: "📊", label: "Overview" },
            { id: "bots", icon: "🤖", label: "Botovi" },
            { id: "sessions", icon: "💬", label: "Sesije" },
            { id: "config", icon: "⚙️", label: "Konfiguracija" },
            { id: "logs", icon: "📜", label: "Logovi" },
            { id: "analytics", icon: "📈", label: "Analitika" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id
                  ? "bg-blue-600 text-white"
                  : `${textSecondary} hover:bg-white/5 hover:text-white`
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className={`p-4 rounded-xl ${darkMode ? "bg-white/5" : "bg-gray-100"}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                👑
              </div>
              <div>
                <p className="text-sm font-medium">Kralj Dashboard</p>
                <p className="text-xs text-gray-500">v2.0.0</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-full py-2 text-xs rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-1">
              {activeTab === "overview" && "📊 Overview"}
              {activeTab === "bots" && "🤖 Botovi"}
              {activeTab === "sessions" && "💬 Sesije"}
              {activeTab === "config" && "⚙️ Konfiguracija"}
              {activeTab === "logs" && "📜 Logovi"}
              {activeTab === "analytics" && "📈 Analitika"}
            </h2>
            <p className={textSecondary}>Pregled svih botova i konfiguracija</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-green-400 font-medium">Sistem Online</span>
            </div>
          </div>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: "Ukupno Botova", value: stats.totalBots.toString(), icon: "🤖", change: "+2 ove sedmice" },
                { label: "Aktivni Botovi", value: stats.activeBots.toString(), icon: "✅", change: "Svi rade" },
                { label: "Aktivne Sesije", value: stats.activeSessions.toString(), icon: "💬", change: `${stats.totalSessions} ukupno` },
                { label: "Poruke", value: stats.totalMessages.toLocaleString(), icon: "📨", change: "+15% danas" },
              ].map((stat) => (
                <div key={stat.label} className={`p-6 rounded-2xl ${cardClass} border`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{stat.icon}</span>
                    <span className="text-xs text-green-400">{stat.change}</span>
                  </div>
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className={`text-sm ${textSecondary}`}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Botovi i Sesije */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bot Status */}
              <div className={`p-6 rounded-2xl ${cardClass} border`}>
                <h3 className="text-lg font-semibold mb-4">Status Botova</h3>
                <div className="space-y-4">
                  {bots.map((bot) => (
                    <div key={bot.id} className={`flex items-center justify-between p-4 rounded-xl ${darkMode ? "bg-white/5" : "bg-gray-50"}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          bot.status === "online" ? "bg-green-500" :
                          bot.status === "busy" ? "bg-yellow-500" : "bg-gray-500"
                        }`} />
                        <div>
                          <p className="font-medium">{bot.name}</p>
                          <p className={`text-xs ${textSecondary}`}>{bot.model}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{bot.sessions} sesija</p>
                        <p className={`text-xs ${textSecondary}`}>{bot.uptime} uptime</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Aktivne Sesije */}
              <div className={`p-6 rounded-2xl ${cardClass} border`}>
                <h3 className="text-lg font-semibold mb-4">Aktivne Sesije</h3>
                <div className="space-y-4">
                  {sessions.slice(0, 4).map((session) => (
                    <div key={session.id} className={`flex items-center justify-between p-4 rounded-xl ${darkMode ? "bg-white/5" : "bg-gray-50"}`}>
                      <div>
                        <p className="font-medium">{session.bot}</p>
                        <p className={`text-xs ${textSecondary}`}>User: {session.user}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          session.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                        }`}>
                          {session.status}
                        </span>
                        <p className={`text-xs ${textSecondary} mt-1`}>{session.lastActive}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* BOTS TAB */}
        {activeTab === "bots" && (
          <div className={`rounded-2xl ${cardClass} border overflow-hidden`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${darkMode ? "bg-white/5" : "bg-gray-50"} border-b ${borderClass}`}>
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-medium">Bot</th>
                    <th className="text-left px-6 py-4 text-sm font-medium">Model</th>
                    <th className="text-left px-6 py-4 text-sm font-medium">Status</th>
                    <th className="text-left px-6 py-4 text-sm font-medium">Sesije</th>
                    <th className="text-left px-6 py-4 text-sm font-medium">Poruke</th>
                    <th className="text-left px-6 py-4 text-sm font-medium">Uptime</th>
                    <th className="text-left px-6 py-4 text-sm font-medium">Akcije</th>
                  </tr>
                </thead>
                <tbody>
                  {bots.map((bot) => (
                    <tr key={bot.id} className={`border-b ${borderClass} hover:${darkMode ? "bg-white/5" : "bg-gray-50"}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            bot.status === "online" ? "bg-green-500" :
                            bot.status === "busy" ? "bg-yellow-500" : "bg-gray-500"
                          }`} />
                          <span className="font-medium">{bot.name}</span>
                        </div>
                      </td>
                      <td className={`px-6 py-4 ${textSecondary}`}>{bot.model}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          bot.status === "online" ? "bg-green-500/20 text-green-400" :
                          bot.status === "busy" ? "bg-yellow-500/20 text-yellow-400" : "bg-gray-500/20 text-gray-400"
                        }`}>
                          {bot.status}
                        </span>
                      </td>
                      <td className={`px-6 py-4 ${textSecondary}`}>{bot.sessions}</td>
                      <td className={`px-6 py-4 ${textSecondary}`}>{bot.messages.toLocaleString()}</td>
                      <td className={`px-6 py-4 ${textSecondary}`}>{bot.uptime}</td>
                      <td className="px-6 py-4">
                        <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                          Konfiguriraj →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CONFIG TAB */}
        {activeTab === "config" && (
          <div className={`rounded-2xl ${cardClass} border overflow-hidden`}>
            <div className="p-6 border-b ${borderClass}">
              <h3 className="text-lg font-semibold">API Konfiguracija</h3>
              <p className={`text-sm ${textSecondary}`}>Ključevi i endpointi za botove</p>
            </div>
            <div className="divide-y ${borderClass}">
              {configs.map((config) => (
                <div key={config.key} className="flex items-center justify-between p-6 hover:bg-white/5">
                  <div>
                    <p className="font-medium mb-1">{config.key}</p>
                    <p className={`text-sm ${textSecondary}`}>{config.value}</p>
                  </div>
                  <span className={`text-xs px-3 py-1.5 rounded-full ${
                    config.status === "configured"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-red-500/20 text-red-400 border border-red-500/30"
                  }`}>
                    {config.status === "configured" ? "✓ Konfigurirano" : "✗ Nedostaje"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SESSIONS TAB */}
        {activeTab === "sessions" && (
          <div className={`rounded-2xl ${cardClass} border overflow-hidden`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${darkMode ? "bg-white/5" : "bg-gray-50"} border-b ${borderClass}`}>
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-medium">Sesija ID</th>
                    <th className="text-left px-6 py-4 text-sm font-medium">Bot</th>
                    <th className="text-left px-6 py-4 text-sm font-medium">User</th>
                    <th className="text-left px-6 py-4 text-sm font-medium">Poruke</th>
                    <th className="text-left px-6 py-4 text-sm font-medium">Status</th>
                    <th className="text-left px-6 py-4 text-sm font-medium">Aktivno</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((session) => (
                    <tr key={session.id} className={`border-b ${borderClass} hover:${darkMode ? "bg-white/5" : "bg-gray-50"}`}>
                      <td className={`px-6 py-4 font-mono text-sm ${textSecondary}`}>{session.id}</td>
                      <td className="px-6 py-4 font-medium">{session.bot}</td>
                      <td className={`px-6 py-4 ${textSecondary}`}>{session.user}</td>
                      <td className={`px-6 py-4 ${textSecondary}`}>{session.messages}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          session.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                        }`}>
                          {session.status}
                        </span>
                      </td>
                      <td className={`px-6 py-4 ${textSecondary}`}>{session.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* LOGS TAB */}
        {activeTab === "logs" && (
          <div className={`rounded-2xl ${cardClass} border p-6`}>
            <h3 className="text-lg font-semibold mb-4">System Logovi</h3>
            <div className={`font-mono text-sm ${textSecondary} space-y-2 max-h-96 overflow-y-auto`}>
              <p>[2026-03-29 14:45:23] INFO: Kralj bot started successfully</p>
              <p>[2026-03-29 14:45:24] INFO: Connected to OpenClaw gateway</p>
              <p>[2026-03-29 14:45:25] INFO: Loaded 45 skills</p>
              <p>[2026-03-29 14:46:01] INFO: New session sess_001 created</p>
              <p>[2026-03-29 14:46:15] INFO: ShortAI bot processing request</p>
              <p>[2026-03-29 14:47:32] WARN: Deploy bot offline - retrying connection</p>
              <p>[2026-03-29 14:48:00] INFO: Deploy bot reconnected</p>
              <p>[2026-03-29 14:49:12] INFO: Session sess_002 active</p>
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={`p-6 rounded-2xl ${cardClass} border`}>
                <h3 className="text-lg font-semibold mb-4">Poruke po Botu</h3>
                <div className="space-y-4">
                  {bots.map((bot) => (
                    <div key={bot.id}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">{bot.name}</span>
                        <span className={`text-sm ${textSecondary}`}>{bot.messages.toLocaleString()}</span>
                      </div>
                      <div className={`h-2 rounded-full ${darkMode ? "bg-white/10" : "bg-gray-200"}`}>
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                          style={{ width: `${(bot.messages / Math.max(...bots.map(b => b.messages))) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`p-6 rounded-2xl ${cardClass} border`}>
                <h3 className="text-lg font-semibold mb-4">Uptime (%)</h3>
                <div className="space-y-4">
                  {bots.map((bot) => (
                    <div key={bot.id}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">{bot.name}</span>
                        <span className={`text-sm ${textSecondary}`}>{bot.uptime}</span>
                      </div>
                      <div className={`h-2 rounded-full ${darkMode ? "bg-white/10" : "bg-gray-200"}`}>
                        <div
                          className={`h-2 rounded-full ${
                            parseFloat(bot.uptime) >= 99 ? "bg-green-500" :
                            parseFloat(bot.uptime) >= 98 ? "bg-yellow-500" : "bg-red-500"
                          }`}
                          style={{ width: `${bot.uptime}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
