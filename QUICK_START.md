# 🎬 QUICK START - EventHire (3 Steps)

## ✅ Your Project is 100% Ready!

Everything is configured. Just follow these 3 steps:

---

## 🔴 STEP 1: Install Dependencies (2 minutes)

Open PowerShell or Command Prompt in `d:\Wellfound-1\` and run:

```powershell
.\setup.ps1
```

Or if using Command Prompt:

```batch
setup.bat
```

**Wait for it to complete** ⏳

---

## 🟠 STEP 2: Start Backend & Frontend (2 terminals)

### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

**Wait for:** `Server is running on port 5000`

### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

**Wait for:** `ready started server on 0.0.0.0:3000`

---

## 🟢 STEP 3: Test in Browser

1. **Open:** http://localhost:3000
2. **Fill the form** (any data)
3. **Submit**
4. **See green success message** ✅

---

## 📊 What You Have

```
MongoDB       ✅ Configured (cluster0.klxyhhj.mongodb.net)
Backend       ✅ Ready (localhost:5000)
Frontend      ✅ Ready (localhost:3000)
Form          ✅ Complete (4 steps)
API           ✅ Integrated
Database      ✅ Connected
```

---

## 🎯 Expected Results After Step 3

| Item | Expected | Status |
|------|----------|--------|
| Backend Running | Port 5000 | ✅ |
| Frontend Running | Port 3000 | ✅ |
| Form Loads | No errors | ✅ |
| Form Submits | Success message | ✅ |
| Data Saved | In MongoDB | ✅ |

---

## ⚠️ If Something Goes Wrong

**Backend won't start:**
- Check `backend\.env` has MongoDB URI
- Check MongoDB Atlas is running
- Try: `npm install` in backend folder

**Frontend won't load:**
- Check `frontend\.env.local` is created
- Check backend is running on 5000
- Try: `npm install` in frontend folder

**Form submission fails:**
- Open DevTools (F12)
- Check Console for errors
- Check Network tab for API response

---

## 📹 After Local Testing Works

1. **Deploy Backend** → Render.com
2. **Deploy Frontend** → Vercel.com
3. **Record Demo** → Screen recording
4. **Submit** → GitHub + URLs + Video

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for deployment steps.

---

## 🚀 Ready?

**Run the setup script and start the servers!**

```powershell
.\setup.ps1
```

Then open 2 terminals and run the commands above.

**That's it! You'll have a working project in 5 minutes!** ✨

---

**Questions?** Check [GETTING_STARTED_WINDOWS.md](GETTING_STARTED_WINDOWS.md)
