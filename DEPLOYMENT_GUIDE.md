# 🎯 RAPTOR [X] DEPLOYMENT GUIDE

## ✅ Hoàn thành rồi (Auto):
- ✅ SSH key created: `~/.ssh/id_ed25519.pub`
- ✅ Server.js health endpoint: `/api/health`
- ✅ Server.js chat endpoint: `/api/chat`
- ✅ index.html API configuration ready

---

## 📋 MANUAL STEPS (Bạn phải làm trên từng platform)

### **STEP 1: GitHub SSH Key** (5 min)
**Goal:** Setup Render để pull code từ GitHub

1. Copy public key:
```bash
cat ~/.ssh/id_ed25519.pub
```

Expected output:
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIrSZNcu57hhHM6R5Rc3wSh5X6j5wnZJTcHiWtXYyBE2 oceantreasurevn@github.com
```

2. Go to: **https://github.com/settings/keys**
3. Click "New SSH key"
4. Fill:
   - **Title:** `Render Deploy Key`
   - **Key type:** Authentication Key
   - **Key:** Paste the public key above
5. Click "Add SSH key"

✅ **Done!**

---

### **STEP 2: GitHub Pages** (5 min)
**Goal:** Deploy static website to GitHub Pages

1. Go to: https://github.com/oceantreasurevn-coder/RaptorX/settings/pages
2. **Source:** 
   - Deploy from a branch
   - Branch: `main` 
   - Folder: `/ (root)`
3. **Custom domain:** `scaterraptorx.eu`
4. ✅ Check "Enforce HTTPS"
5. Click "Save"

✅ Wait 1-2 minutes for CNAME file to be created

---

### **STEP 3: Hostinger DNS** (10-15 min)
**Goal:** Point domain to GitHub Pages

**Login to Hostinger > Domain Management > DNS Records**

#### A Records (Main):
```
Name: @          Type: A          Value: 185.199.108.153
Name: @          Type: A          Value: 185.199.109.153
Name: @          Type: A          Value: 185.199.110.153
Name: @          Type: A          Value: 185.199.111.153
```

#### Optional AAAA Records (IPv6):
```
Name: @          Type: AAAA       Value: 2606:50c0:8000::153
Name: @          Type: AAAA       Value: 2606:50c0:8001::153
Name: @          Type: AAAA       Value: 2606:50c0:8002::153
Name: @          Type: AAAA       Value: 2606:50c0:8003::153
```

✅ **Wait 15-30 minutes for DNS to propagate**

Test DNS:
```bash
nslookup scaterraptorx.eu
```

Should return: `185.199.108.153` (or one of the other IPs)

---

### **STEP 4: Render Web Service** (10 min)
**Goal:** Deploy Node.js API server

1. Go to: https://dashboard.render.com/
2. Click **"New +"** → **"Web Service"**
3. **Connect GitHub:**
   - GitHub account login
   - Select repo: `RaptorX`
   - Branch: `main`
   - Approve access

4. **Web Service Settings:**
   - **Name:** `raptorx-api`
   - **Environment:** Node
   - **Region:** (nearest to you)
   - **Branch:** `main`
   - **Build Command:** (leave empty)
   - **Start Command:** `node server.js`
   - **Instance Type:** Free or Starter

5. **Environment Variables:**
   ```
   AI_PROVIDER=openrouter
   OPENROUTER_API_KEY=YOUR_OPENROUTER_API_KEY_HERE
   OPENROUTER_MODEL=openrouter/auto
   ```

6. Click **"Create Web Service"**

✅ **Wait for deployment (2-5 minutes)**

Check status in Render dashboard. You should see:
```
Your service is live at: https://raptorx-api.onrender.com
```

**🔴 IMPORTANT:** Copy this URL! You'll need it for DNS CNAME.

---

### **STEP 5: Hostinger DNS - API CNAME** (5 min)
**Goal:** Point api.scaterraptorx.eu to Render

**Back to Hostinger DNS Records:**

Add CNAME Record:
```
Name: api        Type: CNAME       Value: raptorx-api.onrender.com
```

✅ **Wait 5-10 minutes for DNS to propagate**

Test DNS:
```bash
nslookup api.scaterraptorx.eu
```

Should return: `raptorx-api.onrender.com` pointing to Render

---

### **STEP 6: Test Everything** ✅

#### Test 1: Website
```bash
open https://scaterraptorx.eu
```
Should load chatbot interface with RAPTOR [X] branding

#### Test 2: Health Check
```bash
curl https://api.scaterraptorx.eu/api/health
```
Expected response:
```json
{"status":"ok","timestamp":"2026-01-15T..."}
```

#### Test 3: Chat API
```bash
curl -X POST https://api.scaterraptorx.eu/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hi"}],"lang":"en","siteContext":"RAPTOR [X]"}'
```
Should return AI response about RAPTOR [X]

---

## 🎉 Final Checklist

- [ ] GitHub SSH key added to account
- [ ] GitHub Pages custom domain set to `scaterraptorx.eu`
- [ ] GitHub Pages HTTPS enforced
- [ ] Hostinger DNS A records configured (4x)
- [ ] DNS propagated (wait 15-30 min)
- [ ] Website accessible at https://scaterraptorx.eu
- [ ] Render Web Service deployed
- [ ] Render service URL copied
- [ ] Hostinger DNS api CNAME added
- [ ] API DNS propagated (wait 5-10 min)
- [ ] https://api.scaterraptorx.eu/api/health returns 200 OK
- [ ] https://scaterraptorx.eu loads with chatbot
- [ ] Chat works and responds with AI

---

## 🔧 Troubleshooting

### Website shows 404
- Check GitHub Pages settings
- Verify CNAME custom domain is set
- Wait for DNS to propagate (can take 30 min)
- Check repo has index.html in root

### API not responding
- Check Render service status (must be "Live")
- Verify environment variables in Render
- Check OPENROUTER_API_KEY is correct
- Wait for Render deployment to complete

### DNS not resolving
- Use `dig` or `nslookup` to check
- DNS changes can take 30 min to propagate
- Try flushing DNS: `sudo dscacheutil -flushcache` (macOS)

---

## 📞 Support
If anything fails, check:
1. Render logs: https://dashboard.render.com/ → service logs
2. GitHub Pages build status: Repo → Deployments
3. DNS propagation: https://dnschecker.org/

Good luck! 🚀
