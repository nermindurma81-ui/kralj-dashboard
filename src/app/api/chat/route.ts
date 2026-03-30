import { NextResponse } from 'next/server';

// Multi-Agent Chat API - Gensee Playground stil
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, agent = 'gensee-397b' } = body;

    if (!message) {
      return NextResponse.json({ error: 'Poruka je potrebna' }, { status: 400 });
    }

    // Generiši odgovor na osnovu agenta
    const reply = generateResponse(message, agent);

    return NextResponse.json({ 
      reply: reply,
      success: true,
      agent: agent,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    return NextResponse.json({ 
      error: 'Greška: ' + (error.message || 'Nije uspelo'),
      success: false 
    }, { status: 500 });
  }
}

// Pametni odgovori po agentima
function generateResponse(message: string, agent: string): string {
  const msg = message.toLowerCase();
  
  // Agent specifični odgovori
  const agentPrefix = agent === 'groq-llama3' ? '⚡ Groq' :
                      agent === 'mistral-7b' ? '🌊 Mistral' :
                      agent === 'gemini-pro' ? '✨ Gemini' :
                      '👑 Kralj';

  if (msg.includes('zdravo') || msg.includes('bok') || msg.includes('ćao') || msg.includes('hello')) {
    return `${agentPrefix}: Bok! Ja sam tvoj AI asistent.

**Pokrećem:** ${agent.toUpperCase()}

**Šta mogu:**
- 💬 Chat u realnom vremenu
- 🧠 Odgovori na pitanja
- 💻 Pomoć sa kodom
- 📝 Pisanje i analiza

Kako mogu pomoći danas?`;
  }

  if (msg.includes('ko si') || msg.includes('šta si') || msg.includes('who are you')) {
    return `${agentPrefix}: Ja sam OpenClaw Bot - tvoj AI asistent.

**Trenutni model:** ${agent.toUpperCase()}

**Mogućnosti:**
- Prirodno razumijevanje jezika
- Kontekstualni odgovori
- Podrška za više jezika (BS/HR/SR/EN)

Biraj između 4 agenta u sidebar-u!`;
  }

  if (msg.includes('skill') || msg.includes('šta znaš') || msg.includes('what can you do')) {
    return `${agentPrefix}: Imam **45 skillova** u 7 kategorija:

🧠 **AI & Data** (6) - agentic-coding, whisper, pgvector
🎨 **Design** (10) - blender, ui-ux, image-*
🤖 **Automation** (5) - youtube-shorts, workflows
🔧 **DevOps** (4) - infra-engineer, security-audit
💻 **AI Coding** (11) - v0-dev, app-builder, cursor
🛡️ **Code Quality** (5) - api-designer, qa-use
📦 **Core** (5) - gog, markitdown, summarize

Koji skill želiš da pokrenem?`;
  }

  if (msg.includes('kod') || msg.includes('code') || msg.includes('napravi app')) {
    return `${agentPrefix}: Kreiram kod! 🚀

**Proces:**
1. Analiziram zahtjev
2. Biram tech stack
3. Generišem kod
4. Testiram
5. Deploy

Šta pravimo? (web app, mobile, API?)`;
  }

  if (msg.includes('deploy') || msg.includes('vercel')) {
    return `${agentPrefix}: Deploy na Vercel! 🚀

**Live projekti:**
- shortai-video-factory.vercel.app
- kralj-dashboard.vercel.app

**Koraci:**
1. git push → auto deploy
2. Vercel build (~60s)
3. Live URL

Šta deploy-ujemo?`;
  }

  if (msg.includes('video') || msg.includes('youtube') || msg.includes('short')) {
    return `${agentPrefix}: YouTube Shorts automation! 📹

**Pipeline:**
1. 📝 AI skripta (Groq)
2. 🎨 Slike (Pexels/Pollinations)
3. 🎵 Muzika (AI generated)
4. 🎬 Video (FFmpeg)
5. 📤 Upload (YouTube API)

**Kapacitet:** 1000+ klipova/mjesečno`;
  }

  // Default odgovor
  return `${agentPrefix}: Razumio sam: "${message}"

**Trenutni agent:** ${agent.toUpperCase()}

**Šta mogu:**
- Odgovoriti na pitanja
- Pomoći sa kodiranjem
- Analizirati podatke
- Kreirati sadržaj

Probaj drugi agent u sidebar-u za drugačiji stil odgovora! 🚀`;
}
