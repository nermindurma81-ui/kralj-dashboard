# 👑 Kralj Dashboard - Vercel Deploy Guide

## 🚀 DEPLOY U 3 KORAKA

### **KORAK 1: Login na Vercel**

Otvori terminal i pokreni:

```bash
cd /mnt/data/openclaw/workspace/.openclaw/workspace/kralj-dashboard

# Instaliraj Vercel CLI (ako već nije)
npm install -g vercel

# Login
vercel login
```

Otvorit će se browser - login-uj se sa svojim GitHub-om.

---

### **KORAK 2: Kreiraj Vercel Project**

**Opcija A: Preko GitHub-a (Preporučujem)**

1. Otvori: https://vercel.com/new
2. Klikni **"Import Git Repository"**
3. Nađi repo: `nermindurma81-ui/kralj-dashboard`
   - Ako nije na GitHub-u, prvo push-uj:
     ```bash
     cd /mnt/data/openclaw/workspace/.openclaw/workspace/kralj-dashboard
     git init
     git add -A
     git commit -m "Kralj Dashboard v1.0"
     git remote add origin https://github.com/nermindurma81-ui/kralj-dashboard.git
     git push -u origin main
     ```
4. Klikni **"Import"**
5. **Environment Variables:**
   ```
   OPENCLAW_GATEWAY_URL = https://tvoj-gateway-url.com
   NEXT_PUBLIC_DASHBOARD_TITLE = Kralj Dashboard 👑
   NEXT_PUBLIC_DASHBOARD_VERSION = 1.0.0
   ```
6. Klikni **"Deploy"**

**Opcija B: Preko CLI**

```bash
cd /mnt/data/openclaw/workspace/.openclaw/workspace/kralj-dashboard

# Prvi deploy (kreiranje projekta)
vercel --prod

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (odaberi svoj account)
# - Link to existing project? N
# - Project name? kralj-dashboard
# - Directory? ./
# - Override settings? N
```

---

### **KORAK 3: Konfiguriši Environment Variables**

Nakon deploy-a:

1. Otvori: https://vercel.com/dashboard
2. Klikni na svoj projekt: `kralj-dashboard`
3. Idi na **Settings** → **Environment Variables**
4. Dodaj:
   ```
   OPENCLAW_GATEWAY_URL = https://tvoj-gateway-url.com
   NEXT_PUBLIC_DASHBOARD_TITLE = Kralj Dashboard 👑
   NEXT_PUBLIC_DASHBOARD_VERSION = 1.0.0
   ```
5. Klikni **"Save"**

---

## 🔄 REDOVNI DEPLOY

Nakon prvog deploy-a, za svaku narednu promjenu:

```bash
cd /mnt/data/openclaw/workspace/.openclaw/workspace/kralj-dashboard

# Promjene commit-uj i push-uj na GitHub
git add -A
git commit -m "Nova verzija"
git push origin main

# Vercel će automatski deploy-ovati!
```

**ILI** preko CLI:

```bash
vercel --prod
```

---

## 📊 NAKON DEPLOY-A

Tvoj dashboard će biti dostupan na:

```
https://kralj-dashboard.vercel.app
```

**Ili custom domain** (ako dodaš):
```
https://kralj.tvojdomen.com
```

---

## ⚙️ VERCEL CONFIGURATION

### `vercel.json` (već kreiran):

```json
{
  "name": "kralj-dashboard",
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["fra1"]
}
```

### Build Settings:

- **Framework:** Next.js 16
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Node Version:** 18.x

---

## 🎯 ŠTA JE DEPLOY-ANO:

✅ **Dashboard UI** - 6 tabova  
✅ **API Routes** - /api/skills, /api/chat, /api/tasks, /api/upload  
✅ **Static Files** - Images, fonts  
✅ **Environment Variables** - Konfiguracija  

---

## 🐛 TROUBLESHOOTING

### **Build Error:**

```bash
# Provjeri build lokalno
npm run build

# Ako ima grešaka, popravi ih pa ponovo deploy
```

### **API ne radi:**

Provjeri environment variables na Vercel-u:
- Settings → Environment Variables
- Da li su sve postavljene?
- Restartuj deployment nakon promjene

### **Gateway nije dostupan:**

Ako koristiš lokalni OpenClaw Gateway, moraš ga expose-ovati:
- Koristi ngrok: `ngrok http 8080`
- Ili deploy-uj gateway na isti Vercel

---

## 🎊 SRETNO!

Nakon deploy-a, tvoj dashboard je dostupan **CIJELOM SVIJETU!** 🌍

**URL:** `https://kralj-dashboard.vercel.app`

---

**Kralj Dashboard v1.0**  
_Deployed with ❤️ on Vercel_
