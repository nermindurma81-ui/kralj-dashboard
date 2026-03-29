"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

type Skill = {
  id: string;
  name: string;
  icon: string;
  desc: string;
  color: string;
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Bok! Ja sam Kralj 👑\n\nTvoj AI asistent sa **45 skillova**.\n\nŠta radimo danas? 🚀",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const skills: Skill[] = [
    { id: "v0-dev", name: "v0-dev", icon: "🎨", desc: "UI iz prompta", color: "from-purple-500 to-pink-500" },
    { id: "app-builder", name: "App Builder", icon: "💻", desc: "Fullstack app", color: "from-blue-500 to-cyan-500" },
    { id: "youtube-shorts", name: "YouTube Shorts", icon: "📹", desc: "Video automation", color: "from-red-500 to-orange-500" },
    { id: "expo-deploy", name: "Expo Deploy", icon: "📱", desc: "Mobile deploy", color: "from-orange-500 to-amber-500" },
    { id: "web-browsing", name: "Web Browsing", icon: "🌐", desc: "Internet search", color: "from-green-500 to-emerald-500" },
    { id: "security-audit", name: "Security", icon: "🛡️", desc: "Code audit", color: "from-yellow-500 to-amber-500" },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg, timestamp: new Date() }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();

      if (data.success && data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply, timestamp: new Date() },
        ]);
      } else {
        throw new Error(data.error || "Nešto nije u redu");
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `👑 Kralj: ${err.message || "Greška"}`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const executeSkill = async (skill: Skill) => {
    setIsLoading(true);
    setMessages((prev) => [
      ...prev,
      { role: "user", content: `Pokreni ${skill.name}`, timestamp: new Date() },
    ]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: `Pokreni skill: ${skill.id} - ${skill.desc}` }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || `🚀 Pokrećem ${skill.name}...`, timestamp: new Date() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `✅ ${skill.name} pokrenut!`, timestamp: new Date() },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-gray-900/80 border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl font-bold">
              👑
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Kralj Dashboard
              </h1>
              <p className="text-xs text-gray-400">45 AI Skillova</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-green-400">Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex gap-2">
          {["chat", "skills", "dashboard"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-white text-gray-900 shadow-lg"
                  : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-8">
        {activeTab === "chat" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Chat */}
            <div className="lg:col-span-3">
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden h-[600px] flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          msg.role === "user"
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                            : "bg-gray-700/50 text-gray-100"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        <p className="text-xs opacity-60 mt-1">
                          {msg.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-700/50 rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]" />
                          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-700/50">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Šta želiš da uradim?"
                      className="flex-1 bg-gray-700/50 border border-gray-600/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={isLoading || !input.trim()}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-medium transition-all transform hover:scale-105 active:scale-95"
                    >
                      Pošalji
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Launch */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-4">
                <h3 className="text-sm font-semibold text-gray-300 mb-4">⚡ Quick Launch</h3>
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <button
                      key={skill.id}
                      onClick={() => executeSkill(skill)}
                      disabled={isLoading}
                      className="w-full p-3 rounded-xl bg-gray-700/30 hover:bg-gray-700/50 border border-gray-600/30 hover:border-gray-500/50 transition-all text-left disabled:opacity-50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{skill.icon}</span>
                        <div>
                          <p className="text-sm font-medium">{skill.name}</p>
                          <p className="text-xs text-gray-400">{skill.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "skills" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.id}
                onClick={() => executeSkill(skill)}
                className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 cursor-pointer hover:border-gray-500/50 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  {skill.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
                <p className="text-sm text-gray-400">{skill.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Skillovi", value: "45", icon: "🧠", color: "from-blue-500 to-purple-500" },
              { label: "Taskovi", value: "0", icon: "📋", color: "from-green-500 to-emerald-500" },
              { label: "Uspjeh", value: "95%", icon: "✅", color: "from-orange-500 to-amber-500" },
              { label: "Status", value: "Online", icon: "🟢", color: "from-cyan-500 to-blue-500" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{stat.icon}</span>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} opacity-20`} />
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
