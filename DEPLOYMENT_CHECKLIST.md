# GemsMuse - Quick Deployment Checklist

## ✅ PRE-DEPLOYMENT (Local Machine)

### Code Preparation

- [ ] Update all API calls to use `import.meta.env.VITE_API_URL`
- [ ] Update `.env.production` with your domain
- [ ] Run `npm run build` successfully (check dist/ folder)
- [ ] Run `npm run lint` - fix any issues
- [ ] Test frontend build locally: `npm run preview`
- [ ] Install backend dependencies: `cd server && npm install`
- [ ] Test backend locally: `npm run dev` in server folder

### Git Setup

- [ ] Commit all changes to git
- [ ] Create `.gitignore` (done ✓)
- [ ] Ensure `.env` is NOT in git (in .gitignore)
- [ ] Push to GitHub/GitLab

---

## 🏗️ HOSTINGER SETUP

### Database Setup

- [ ] Login to Hostinger hPanel
- [ ] Create MySQL Database
  - Note: DB_HOST (usually `localhost` or specific IP)
  - Note: DB_USER, DB_PASSWORD, DB_NAME
- [ ] Create database user with all privileges
- [ ] Export local database: `mysqldump -u root -p gemsmuse_db > backup.sql`
- [ ] Import schema to Hostinger MySQL (via phpMyAdmin or SSH)

### File Manager / FTP Setup

- [ ] Get FTP credentials from hPanel
- [ ] Test FTP connection
- [ ] Create folder structure:
  ```
  public_html/
  ├── server/         (Backend API)
  ├── dist/           (Frontend React app)
  └── uploads/        (Create empty folder, chmod 755)
  ```

---

## 📤 UPLOADING FILES

### Option A: Using FTP

- [ ] Connect via FTP client (FileZilla, WinSCP, etc.)
- [ ] Upload `dist/` contents to `public_html/`
- [ ] Upload `server/` folder to `public_html/server/`
- [ ] Create `uploads/` folder
- [ ] Set permissions: `chmod 755 uploads/`

### Option B: Using SSH + Git

- [ ] SSH into Hostinger: `ssh user@host`
- [ ] Clone repository: `git clone https://github.com/user/repo.git`
- [ ] Install dependencies: `cd repo/server && npm install`
- [ ] Build frontend: `npm run build`
- [ ] Copy dist to public_html: `cp -r dist/* ~/public_html/`

---

## 🔧 CONFIGURATION

### Environment Variables

- [ ] SSH into server or use File Manager
- [ ] Navigate to `server/` folder
- [ ] Create `.env` file with:
  ```
  PORT=5000
  NODE_ENV=production
  FRONTEND_URL=https://yourdomain.com
  DB_HOST=[HOSTINGER_DB_HOST]
  DB_USER=[HOSTINGER_DB_USER]
  DB_PASSWORD=[HOSTINGER_DB_PASSWORD]
  DB_NAME=[HOSTINGER_DB_NAME]
  JWT_SECRET=[GENERATE_STRONG_RANDOM_STRING]
  OWNER_EMAIL=your@email.com
  SMTP_HOST=smtp.gmail.com
  SMTP_PORT=587
  SMTP_USER=your@email.com
  SMTP_PASS=[APP_SPECIFIC_PASSWORD]
  ```
- [ ] DO NOT share or commit this file

### Web Server Configuration

- [ ] Upload `.htaccess` to `public_html/` (for Apache)
- [ ] Ensure `mod_rewrite` is enabled (usually is)
- [ ] Test React Router navigation

---

## 🚀 STARTING BACKEND

### Via SSH

```bash
cd ~/public_html/server
npm start
```

### Using PM2 (Persistent)

```bash
npm install -g pm2
pm2 start index.js --name "gemsmuse-api"
pm2 startup
pm2 save
pm2 list
```

### Verify Running

```bash
curl http://localhost:5000/api
# Should return: {"message":"GemsMuse Backend Running","environment":"production"}
```

---

## 🔒 SSL/HTTPS

- [ ] Enable SSL in hPanel (usually free with Let's Encrypt)
- [ ] Wait for certificate to activate (5-10 minutes)
- [ ] Update `FRONTEND_URL` to `https://yourdomain.com`
- [ ] Test: Visit `https://yourdomain.com` in browser

---

## 🧪 FINAL TESTING

### Frontend

- [ ] [ ] Website loads at `https://yourdomain.com`
- [ ] [ ] Navigation works (React Router)
- [ ] [ ] No 404 errors for routes
- [ ] [ ] CSS and images load correctly

### Backend API

- [ ] [ ] API responds: `https://yourdomain.com/api`
- [ ] [ ] DB check works: `https://yourdomain.com/api/db-check`
- [ ] [ ] Auth endpoints work (login/signup)
- [ ] [ ] Products load from database

### Functionality

- [ ] [ ] User registration works
- [ ] [ ] User login works
- [ ] [ ] File uploads work (check permissions)
- [ ] [ ] Email notifications send
- [ ] [ ] Database queries execute correctly

---

## 🆘 TROUBLESHOOTING

### Backend not starting?

```bash
# Check if port 5000 is available
lsof -ti:5000 | xargs kill -9

# Check for errors
cd server && npm start

# Check logs
pm2 logs gemsmuse-api
```

### Database connection error?

```bash
# Test MySQL connection
mysql -h [DB_HOST] -u [DB_USER] -p[DB_PASSWORD] [DB_NAME]

# Verify .env file has correct credentials
cat .env
```

### CORS errors in frontend?

- [ ] Check `FRONTEND_URL` in backend `.env`
- [ ] Ensure frontend is served from `https://yourdomain.com`
- [ ] Restart backend: `pm2 restart gemsmuse-api`

### File uploads not working?

```bash
# Check folder permissions
ls -la uploads/
chmod 755 uploads/
chmod 644 uploads/*
```

### 403/404 errors?

- [ ] Check `.htaccess` is in `public_html/`
- [ ] Verify `mod_rewrite` is enabled
- [ ] Check file permissions: `chmod 644 .htaccess`

---

## 📊 MONITORING

### Check Backend Status

```bash
pm2 status
pm2 logs
pm2 info gemsmuse-api
```

### Monitor Resource Usage

```bash
pm2 monit
```

### Restart Backend

```bash
pm2 restart gemsmuse-api
pm2 restart all
```

---

## 🔐 SECURITY CHECKLIST

- [ ] Change `JWT_SECRET` to strong random value (use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- [ ] Use Gmail app-specific password (NOT your main password)
- [ ] Enable SSL/HTTPS
- [ ] Set `NODE_ENV=production`
- [ ] Remove debug console.logs from code
- [ ] Setup database backups (Hostinger hPanel)
- [ ] Test all authentication flows
- [ ] Monitor error logs regularly
- [ ] Keep dependencies updated

---

## 📝 NOTES

- First deployment usually takes 15-30 minutes
- SSL certificate activation can take 5-10 minutes
- Test everything thoroughly before telling users
- Keep database backups before making changes
- Monitor server logs for errors: `pm2 logs`

---

## 🆘 NEED HELP?

- Hostinger Support: https://support.hostinger.com
- Node.js Docs: https://nodejs.org/docs/
- Express.js Docs: https://expressjs.com/
- MySQL Docs: https://dev.mysql.com/doc/
