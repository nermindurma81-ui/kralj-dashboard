import { NextRequest, NextResponse } from 'next/server';

// Lista svih 45 skillova
const skills = [
  // 🧠 AI & Data (6)
  { id: 'agentic-coding', name: 'Agentic Coding', category: 'AI & Data', icon: '🧠', description: 'AI coding assistant protocol' },
  { id: 'cc-godmode', name: 'CC Godmode', category: 'AI & Data', icon: '🧠', description: 'Multi-agent orchestration' },
  { id: 'data-analysis-jupyter', name: 'Data Analysis', category: 'AI & Data', icon: '📊', description: 'Python data analysis sa Jupyter' },
  { id: 'database', name: 'Database', category: 'AI & Data', icon: '💾', description: 'SQL/NoSQL upravljanje' },
  { id: 'pgvector-semantic-search', name: 'PGVector', category: 'AI & Data', icon: '🔍', description: 'Vektor pretraga (RAG)' },
  { id: 'whisper', name: 'Whisper', category: 'AI & Data', icon: '🎤', description: 'Audio transkripcija' },
  
  // 🎨 Design & Media (10)
  { id: 'blender', name: 'Blender', category: 'Design & Media', icon: '🎨', description: '3D modelovanje i animacija' },
  { id: 'expo-architect', name: 'Expo Architect', category: 'Design & Media', icon: '📱', description: 'React Native/Expo app' },
  { id: 'image-edit', name: 'Image Edit', category: 'Design & Media', icon: '🖼️', description: 'Edit slika (background, upscale)' },
  { id: 'image-ocr', name: 'Image OCR', category: 'Design & Media', icon: '📷', description: 'OCR iz slika' },
  { id: 'image-vision', name: 'Image Vision', category: 'Design & Media', icon: '👁️', description: 'AI vision za slike' },
  { id: 'json-render-generative-ui', name: 'Generative UI', category: 'Design & Media', icon: '✨', description: 'Generativni UI (Lovable/Bolt stil)' },
  { id: 'screenshot-ocr', name: 'Screenshot OCR', category: 'Design & Media', icon: '📸', description: 'OCR screenshotova' },
  { id: 'tailwind-design-system', name: 'Tailwind', category: 'Design & Media', icon: '🎨', description: 'Tailwind CSS sistem' },
  { id: 'ui-ux-design', name: 'UI/UX Design', category: 'Design & Media', icon: '🎯', description: 'UI/UX dizajn sistem' },
  { id: 'ui-mobile', name: 'Mobile UI', category: 'Design & Media', icon: '📱', description: 'Mobile UI (React Native)' },
  
  // 🤖 Automation (5)
  { id: 'auto-shorts-repurposer', name: 'Auto Shorts', category: 'Automation', icon: '🎬', description: 'Automatsko pravljenje shortsa' },
  { id: 'automation-workflows', name: 'Workflows', category: 'Automation', icon: '⚙️', description: 'Workflow automatizacije' },
  { id: 'social-media-scheduler', name: 'Social Scheduler', category: 'Automation', icon: '📅', description: 'Planiranje postova' },
  { id: 'video-frames', name: 'Video Frames', category: 'Automation', icon: '🎞️', description: 'Ekstrakcija frameova iz videa' },
  { id: 'youtube-shorts-automation', name: 'YouTube Shorts', category: 'Automation', icon: '📹', description: 'YouTube Shorts automatizacija' },
  
  // 🔧 DevOps & Security (4)
  { id: 'infra-engineer', name: 'Infra Engineer', category: 'DevOps & Security', icon: '🖥️', description: 'Cloud/DevOps (Docker, AWS)' },
  { id: 'security-audit', name: 'Security Audit', category: 'DevOps & Security', icon: '🛡️', description: 'Security auditing' },
  { id: 'web-browsing', name: 'Web Browsing', category: 'DevOps & Security', icon: '🌐', description: 'Pretraga interneta' },
  { id: 'audit-code-health', name: 'Code Audit', category: 'DevOps & Security', icon: '🔍', description: 'Code health audit' },
  
  // 💻 AI Coding Platforms (11)
  { id: 'v0-dev', name: 'v0-dev', category: 'AI Coding', icon: '🎨', description: 'Vercel v0 (AI code gen)' },
  { id: 'app-builder', name: 'App Builder', category: 'AI Coding', icon: '💻', description: 'Fullstack app creation' },
  { id: 'base44-cli', name: 'Base44 CLI', category: 'AI Coding', icon: '💻', description: 'Base44 AI platforma' },
  { id: 'crewai-multi-agent', name: 'CrewAI', category: 'AI Coding', icon: '👥', description: 'Multi-agent framework' },
  { id: 'cursor', name: 'Cursor', category: 'AI Coding', icon: '🖱️', description: 'AI coding assistant' },
  { id: 'expo-deployment', name: 'Expo Deploy', category: 'AI Coding', icon: '🚀', description: 'Expo deployment' },
  { id: 'manus', name: 'Manus', category: 'AI Coding', icon: '🤖', description: 'AI agent (Manus.im)' },
  { id: 'multi-agent-orchestration', name: 'Multi-Agent', category: 'AI Coding', icon: '👥', description: 'Multi-agent koordinacija' },
  { id: 'tanstack-start', name: 'TanStack', category: 'AI Coding', icon: '⚛️', description: 'Modern fullstack framework' },
  { id: 'vibe-coding-orchestrator', name: 'Vibe Coding', category: 'AI Coding', icon: '⚡', description: 'Vibe coding (Lovable stil)' },
  
  // 🛡️ Code Quality (5)
  { id: 'api-designer', name: 'API Designer', category: 'Code Quality', icon: '🔌', description: 'REST/GraphQL API dizajn' },
  { id: 'code-review-playbook', name: 'Code Review', category: 'Code Quality', icon: '✅', description: 'Code review best practices' },
  { id: 'github-operations', name: 'GitHub Ops', category: 'Code Quality', icon: '🔀', description: 'GitHub workflow' },
  { id: 'python-performance-optimization', name: 'Python Perf', category: 'Code Quality', icon: '⚡', description: 'Python optimizacija' },
  { id: 'qa-use', name: 'QA Use', category: 'Code Quality', icon: '✅', description: 'QA testing i automation' },
  
  // 📦 Core (5)
  { id: 'find-skills', name: 'Find Skills', category: 'Core', icon: '🔍', description: 'Pretraga novih skillova' },
  { id: 'gog', name: 'Google Workspace', category: 'Core', icon: '📧', description: 'Gmail, Drive, Calendar, Sheets' },
  { id: 'markitdown', name: 'Markitdown', category: 'Core', icon: '📄', description: 'Konverzija fajlova u Markdown' },
  { id: 'self-improving-agent', name: 'Self Improve', category: 'Core', icon: '🔄', description: 'Učenje iz grešaka' },
  { id: 'summarize', name: 'Summarize', category: 'Core', icon: '📝', description: 'Sumarizacija URL/PDF/audio' },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  
  let filteredSkills = skills;
  
  if (category) {
    filteredSkills = skills.filter(skill => skill.category === category);
  }
  
  return NextResponse.json({
    success: true,
    count: filteredSkills.length,
    total: skills.length,
    skills: filteredSkills,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { skillId, action, params } = body;
    
    const skill = skills.find(s => s.id === skillId);
    
    if (!skill) {
      return NextResponse.json(
        { error: `Skill '${skillId}' not found` },
        { status: 404 }
      );
    }
    
    // Ovdje bi išla integracija sa OpenClaw Gateway-em
    // Za sada vraćamo mock response
    return NextResponse.json({
      success: true,
      message: `Pokrenut skill: ${skill.name}`,
      skill: skill,
      action: action || 'run',
      params: params || {},
      status: 'started',
      taskId: `task-${Date.now()}`,
    });
  } catch (error) {
    console.error('Skills API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process skill request' },
      { status: 500 }
    );
  }
}
