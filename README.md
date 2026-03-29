# 👑 Kralj Dashboard

Tvoj potpuno nezavisan AI asistent sa 45 skillova.

## 🚀 Quick Start

```bash
# Pokreni development server
npm run dev

# Otvori u browseru
http://localhost:3000
```

## 📁 Projekat Structure

```
kralj-dashboard/
├── src/
│   ├── app/
│   │   ├── globals.css      # Globalne stilove
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Glavni dashboard
│   └── components/ui/       # shadcn/ui komponente
├── public/
├── package.json
└── tailwind.config.js
```

## 🎨 Features

- **Dashboard** - Stats, Quick Launch, Active Tasks
- **Chat** - AI chat interface
- **Tasks** - Task queue sa statusom
- **Files** - File upload & management
- **Settings** - API keys, system status
- **Skills** - Pregled svih 45 skillova

## ⚙️ Konfiguracija

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_OPENCLAW_GATEWAY=http://localhost:8080
NEXT_PUBLIC_GITHUB_REPO=nermindurma81-ui/openclaw
```

## 🛠️ Tech Stack

- **Next.js 16** - Full-stack React framework
- **Tailwind CSS 4** - Modern CSS framework
- **shadcn/ui** - UI component library
- **Lucide Icons** - Beautiful icons
- **TypeScript** - Type safety

## 📦 Instalacija

```bash
# Instaliraj zavisnosti
npm install

# Pokreni development server
npm run dev

# Build za produkciju
npm run build

# Start production server
npm start
```

## 🌐 Deployment

### Vercel

```bash
vercel deploy --prod
```

### Docker

```bash
docker build -t kralj-dashboard .
docker run -p 3000:3000 kralj-dashboard
```

## 🔗 Integracije

### OpenClaw Gateway

```typescript
// src/lib/openclaw.ts
export async function callSkill(skill: string, params: any) {
  const response = await fetch('http://localhost:8080/message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'send', message: skill, params }),
  });
  return response.json();
}
```

### GitHub Integration

```typescript
// src/lib/github.ts
export async function pushToGitHub() {
  const response = await fetch('/api/github/push', {
    method: 'POST',
  });
  return response.json();
}
```

## 📝 License

MIT License - slobodno koristi i modificiraj

---

**Kreirao: Kralj 👑**  
**Tvoj nezavisni AI asistent**
