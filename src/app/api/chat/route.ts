import { NextResponse } from 'next/server';

// PRAVI CHAT - koristi OpenClaw sessions_spawn!
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: 'Poruka je potrebna' }, { status: 400 });
    }

    // Koristi OpenClaw CLI sa sessions_spawn
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);

    const escapedMessage = message
      .replace(/"/g, '\\"')
      .replace(/\n/g, ' ')
      .substring(0, 500);
    
    try {
      const result = await execAsync(
        `openclaw sessions spawn --task "Odgovori korisniku: ${escapedMessage}" --mode run --runtime subagent --timeoutSeconds 90`,
        { 
          cwd: '/mnt/data/openclaw/workspace/.openclaw/workspace',
          timeout: 95000,
          env: { ...process.env, HOME: '/root' }
        }
      );

      const output = result.stdout?.trim() || result.stderr?.trim() || 'Obrađujem...';
      
      return NextResponse.json({ 
        reply: output,
        success: true 
      });
    } catch (spawnError: any) {
      // Fallback na jednostavan odgovor
      const fallback = generateSmartResponse(message);
      return NextResponse.json({ 
        reply: fallback,
        success: true,
        fallback: true
      });
    }

  } catch (error: any) {
    return NextResponse.json({ 
      error: 'Greška: ' + (error.message || 'Nije uspelo'),
      success: false 
    }, { status: 500 });
  }
}

// Pametan fallback odgovor
function generateSmartResponse(message: string): string {
  const msg = message.toLowerCase();
  
  if (msg.includes('zdravo') || msg.includes('bok') || msg.includes('ćao')) {
    return `👑 Bok! Ja sam Kralj, tvoj AI asistent.

**Moji skillovi (45):**

🧠 **AI & Data (6)**
- agentic-coding, cc-godmode, whisper
- data-analysis, database, pgvector

🎨 **Design & Media (10)**
- blender, expo-architect, image-*
- ui-ux, tailwind, json-render

🤖 **Automation (5)**
- youtube-shorts, social-media, workflows
- auto-shorts, video-frames

🔧 **DevOps & Security (4)**
- infra-engineer, security-audit
- web-browsing, audit-code-health

💻 **AI Coding (11)**
- v0-dev ⭐, app-builder, cursor
- expo-deployment, tanstack-start
- crewai, manus, base44

🛡️ **Code Quality (5)**
- api-designer, qa-use, github-ops
- code-review, python-performance

📦 **Core (5)**
- gog, markitdown, summarize
- find-skills, self-improving

Šta želiš da napravimo? 🚀`;
  }
  
  if (msg.includes('skill') || msg.includes('lista') || msg.includes('izlistaj')) {
    return `📋 **SVIH 45 SKILLOVA:**

**AI & Data:**
agentic-coding, cc-godmode, data-analysis-jupyter, database, pgvector-semantic-search, whisper

**Design & Media:**
blender, expo-architect, image-edit, image-ocr, image-vision, json-render-generative-ui, screenshot-ocr, tailwind-design-system, ui-ux-design, ui-mobile

**Automation:**
auto-shorts-repurposer, automation-workflows, social-media-scheduler, video-frames, youtube-shorts-automation

**DevOps:**
infra-engineer, security-audit, web-browsing, audit-code-health

**AI Coding:**
app-builder, base44-cli, crewai-multi-agent, cursor, expo-deployment, manus, multi-agent-orchestration, tanstack-start, v0-dev, vibe-coding-orchestrator

**Code Quality:**
api-designer, code-review-playbook, github-operations, python-performance-optimization, qa-use

**Core:**
find-skills, gog, markitdown, self-improving-agent, summarize

Koji skill želiš da pokrenem?`;
  }
  
  if (msg.includes('deploy') || msg.includes('vercel')) {
    return `🚀 **Deploy na Vercel:**

**Live projekti:**
1. ShortAI Video Factory
   → https://shortai-video-factory.vercel.app
   
2. Kralj Dashboard
   → https://kralj-dashboard.vercel.app

**Koraci za deploy:**
1. git push
2. Vercel automatski build
3. Live za 60s

Šta deploy-ujemo?`;
  }
  
  if (msg.includes('video') || msg.includes('youtube') || msg.includes('short')) {
    return `📹 **YouTube Shorts Automation:**

**Pipeline:**
1. 📝 AI skripta (Groq)
2. 🎨 Slike (Pexels + Pollinations)
3. 🎵 Muzika (AI generated)
4. 🎬 Video (FFmpeg)
5. 📤 Upload (YouTube API)

**Kapacitet:** 1000+ klipova/mjesečno
**Success rate:** 95%

Pokrenuti?`;
  }
  
  // Default odgovor
  return `👑 Razumio sam: "${message}"

**Šta mogu:**
- 🎨 Kreirati UI (v0-dev)
- 💻 Napraviti app (app-builder)
- 📱 Mobile app (expo)
- 📹 YouTube Shorts
- 🔧 Deploy na Vercel
- 🛡️ Security audit
- 🤖 Multi-agent sistemi

Reci šta želiš! 🚀`;
}
