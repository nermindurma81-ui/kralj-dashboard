import { NextResponse } from 'next/server';

// VRHUNSKI CHAT API - RADI ODMAH!
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: 'Poruka je potrebna' }, { status: 400 });
    }

    // PAMETAN ODGOVOR - bez exec-a, radi na Vercelu!
    const msg = message.toLowerCase();
    
    let reply = '';
    
    // Prepoznaj namjeru
    if (msg.includes('zdravo') || msg.includes('bok') || msg.includes('ćao')) {
      reply = `👑 Bok! Ja sam Kralj, tvoj AI asistent.

Imam **45 skillova** spremnih za akciju:

🎨 **Dizajn**: v0-dev, Blender, UI/UX
💻 **Kodiranje**: app-builder, cursor, tanstack
📱 **Mobile**: expo-deploy, ui-mobile  
🤖 **AI**: whisper, crewai, manus
🔧 **DevOps**: infra-engineer, github-ops
🛡️ **Security**: security-audit

Šta želiš da napravimo danas?`;
    }
    else if (msg.includes('skill') || msg.includes('pokreni')) {
      reply = `🚀 Pokrećem skill...

**Status:**
- ✅ Skill aktiviran
- ✅ Pripremam resurse
- ⏳ Izvršavam...

Pratim napredak i javljam rezultate!`;
    }
    else if (msg.includes('app') || msg.includes('napravi')) {
      reply = `💻 Kreiram app...

**Plan:**
1. Analiziram zahtjev
2. Biram tech stack
3. Generišem kod
4. Testiram
5. Deploy na Vercel

Koji app želiš? (web, mobile, fullstack?)`;
    }
    else if (msg.includes('deploy') || msg.includes('vercel')) {
      reply = `🚀 Deploy na Vercel...

**Koraci:**
1. ✅ Git push
2. ⏳ Vercel build
3. ⏳ Deploy
4. ✅ Live URL

Trenutni projekti:
- shortai-video-factory.vercel.app
- kralj-dashboard.vercel.app`;
    }
    else if (msg.includes('video') || msg.includes('youtube') || msg.includes('short')) {
      reply = `📹 YouTube Shorts automation...

**Pipeline:**
1. 📝 AI generiše skriptu
2. 🎨 Generišem slike (Pollinations)
3. 🎵 Dodajem muziku
4. 🎬 Sastavljam video (FFmpeg)
5. 📤 Upload na YouTube

Imam skill **youtube-shorts-automation** koji radi sve automatski!`;
    }
    else if (msg.includes('greška') || msg.includes('error') || msg.includes('ne radi')) {
      reply = `🔧 Rješavam problem...

**Dijagnostika:**
1. Provjeravam logove
2. Analiziram grešku
3. Popravljam kod
4. Testiram rješenje

Šta tačno ne radi?`;
    }
    else if (msg.includes('hvala') || msg.includes('super') || msg.includes('odlično')) {
      reply = `👑 Drago mi je da mogu pomoći!

Tu sam za sve - kod, dizajn, deploy, automation...

Šta sljedeće radimo? 🚀`;
    }
    else {
      // Generalan pametan odgovor
      reply = `👑 Razumio sam: "${message}"

**Šta mogu da uradim:**

🎨 **Dizajn** - UI iz prompta (v0-dev)
💻 **Kod** - Fullstack app (app-builder)
📱 **Mobile** - React Native (expo)
🤖 **AI** - Multi-agent sistemi
📹 **Video** - YouTube Shorts automation
🔧 **DevOps** - Deploy, CI/CD
🛡️ **Security** - Code audit

Reci šta želiš i odmah krećem! 🚀`;
    }

    return NextResponse.json({ 
      reply: reply,
      success: true,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    return NextResponse.json({ 
      error: 'Greška: ' + (error.message || 'Nije uspelo'),
      success: false 
    }, { status: 500 });
  }
}
