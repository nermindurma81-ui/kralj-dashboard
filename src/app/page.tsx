"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

type Agent = {
  id: string;
  name: string;
  model: string;
  provider: string;
  icon: string;
  color: string;
  description: string;
};

export default function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👑 Bok! Ja sam Kralj.\n\nTvoj AI asistent pokreće **Gensee-397B** model.\n\nŠta želiš da radimo danas?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState("gensee-397b");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const agents: Agent[] = [
    {
      id: "gensee-397b",
      name: "Kralj 👑",
      model: "Gensee-397B",
      provider: "OpenClaw",
      icon: "👑",
      color: "from-blue-500 to-purple-500",
      description: "Glavni AI asistent - 45 skillova",
    },
    {
      id: "groq-llama3",
      name: "Groq Llama3",
      model: "llama3-70b-8192",
      provider: "Groq",
      icon: "⚡",
      color: "from-orange-500 to-red-500",
      description: "Brzi inference - GroqCloud",
    },
    {
      id: "mistral-7b",
      name: "Mistral 7B",
      model: "mistral-7b-instruct",
      provider: "HuggingFace",
      icon: "🌊",
      color: "from-cyan-500 to-blue-500",
      description: "Open-source model",
    },
    {
      id: "gemini-pro",
      name: "Gemini Pro",
      model: "gemini-pro",
      provider: "Google",
      icon: "✨",
      color: "from-purple-500 to-pink-500",
      description: "Google AI - multimodalni",
    },
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
        body: JSON.stringify({ 
          message: userMsg,
          agent: selectedAgent 
        }),
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
          content: `❌ Greška: ${err.message}`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const currentAgent = agents.find(a => a.id === selectedAgent) || agents[0];

  return (
    <div className="flex h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-72" : "w-0"
        } transition-all duration-300 bg-[#0f1117] border-r border-white/10 overflow-hidden flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-xl">
              🤖
            </div>
            <div>
              <h1 className="font-bold text-lg">OpenClaw</h1>
              <p className="text-xs text-gray-500">AI Playground</p>
            </div>
          </div>
        </div>

        {/* Agent Selector */}
        <div className="p-4">
          <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">AI Agenti</p>
          <div className="space-y-2">
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setSelectedAgent(agent.id)}
                className={`w-full p-3 rounded-xl text-left transition-all ${
                  selectedAgent === agent.id
                    ? "bg-blue-600/20 border border-blue-500/50"
                    : "bg-white/5 border border-transparent hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${agent.color} flex items-center justify-center text-sm`}>
                    {agent.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{agent.name}</p>
                    <p className="text-xs text-gray-500 truncate">{agent.model}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="mt-auto p-4 border-t border-white/10">
          <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
            <span className="text-lg">⚙️</span>
            <span className="text-sm">Postavke</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <span className="text-xl">☰</span>
            </button>
            <div>
              <h2 className="font-semibold flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full bg-green-500 animate-pulse`} />
                {currentAgent.name}
              </h2>
              <p className="text-xs text-gray-500">{currentAgent.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              {currentAgent.provider}
            </span>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-6 space-y-6">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-4 ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-[#161922] text-gray-100 border border-white/10"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  <p className="text-xs opacity-50 mt-2">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#161922] rounded-2xl px-5 py-4 border border-white/10">
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
        </div>

        {/* Input Area */}
        <div className="border-t border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl p-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Pitaj bilo šta..."
                className="flex-1 bg-[#161922] border border-white/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder-gray-500"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95"
              >
                Pošalji
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              OpenClaw Bot može praviti greške. Provjeri važne informacije.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
