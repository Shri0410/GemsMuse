# GemsMuse - Hostinger Deployment Guide

## Step-by-Step Deployment Instructions

### **PHASE 1: Pre-Deployment Preparation (Local)**

#### 1. Update API URLs

- Go to your context files (`src/context/*.jsx`)
- Replace hardcoded `http://localhost:5000` with `import.meta.env.VITE_API_URL`
- Update `.env.production` with your actual Hostinger domain

#### 2. Build Frontend

```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

#### 3. Prepare Backend

```bash
cd server
npm install
```

---

### **PHASE 2: Hostinger Setup**

#### 1. **Create MySQL Database**

- Login to Hostinger hPanel
- Go to **Databases** → **Create Database**
- Note the credentials (host, user, password, database name)
- These will go in your `.env` file

#### 2. **Setup Node.js/Express Hosting**

- Hostinger offers **Node.js hosting** in some plans
- Alternative: Use **Shared Hosting with SSH** + Node.js addon

#### 3. **Upload Database Schema**

- Export your database from local:
  ```bash
  mysqldump -u root -p gemsmuse_db > backup.sql
  ```
- Import to Hostinger via:
  - phpMyAdmin (Web Interface), OR
  - SSH command:
    ```bash
    mysql -h [DB_HOST] -u [DB_USER] -p [DB_NAME] < schema.sql
    ```

---

### **PHASE 3: Upload Files to Hostinger**

#### Option A: Using File Manager (Simple)

1. Connect via FTP/SFTP using Hostinger credentials
2. Upload structure:
   ```
   public_html/
   ├── dist/           (Frontend - output from 'npm run build')
   ├── server/         (Backend - all server files)
   └── uploads/        (Create this folder)
   ```

#### Option B: Using Git + SSH (Recommended for Developers)

1. Push your code to GitHub
2. SSH into Hostinger:
   ```bash
   ssh username@your-hostinger-ip
   ```
3. Clone repository:
   ```bash
   git clone https://github.com/yourusername/gemsmuse.git
   ```
4. Install dependencies:
   ```bash
   cd gemsmuse/server
   npm install
   ```

---

### **PHASE 4: Environment Variables Setup**

1. Create `.env` file in `/server/` directory on Hostinger
2. Fill with production values:
   ```env
   PORT=5000
   NODE_ENV=production
   FRONTEND_URL=https://yourdomain.com
   DB_HOST=hostinger-db-host
   DB_USER=hostinger-db-user
   DB_PASSWORD=your-password
   DB_NAME=gemsmuse_db
   JWT_SECRET=generate-strong-random-string
   OWNER_EMAIL=your@email.com
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your@email.com
   SMTP_PASS=your-app-password
   ```

---

### **PHASE 5: Configure Web Server**

#### For Apache (Shared Hosting):

1. Create `.htaccess` in `public_html/`:

   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

2. Configure API proxying:
   ```apache
   ProxyPreserveHost On
   ProxyPass /api http://localhost:5000/api
   ProxyPassReverse /api http://localhost:5000/api
   ```

#### For Node.js Hosting (Recommended):

- Hostinger will provide specific instructions for your plan
- Typically: Upload `dist/` folder and configure entry point as `server/index.js`

---

### **PHASE 6: Start Backend Server**

1. Via SSH:

   ```bash
   cd /home/username/gemsmuse/server
   npm start
   ```

   Or for persistent running:

   ```bash
   npm install -g pm2
   pm2 start index.js --name "gemsmuse-backend"
   pm2 startup
   pm2 save
   ```

2. Verify backend is running:
   ```
   https://yourdomain.com/api
   ```

---

### **PHASE 7: SSL Certificate**

1. Hostinger usually provides **Free SSL (Let's Encrypt)**
2. Enable in hPanel → **SSL Certificates** → **Auto-renew**
3. Update `FRONTEND_URL` to use `https://`

---

### **PHASE 8: Final Testing**

- [ ] Frontend loads at `https://yourdomain.com`
- [ ] API responds at `https://yourdomain.com/api`
- [ ] Database connection test: `https://yourdomain.com/api/db-check`
- [ ] User authentication works
- [ ] File uploads work
- [ ] Emails send correctly

---

## **Troubleshooting**

### Backend not connecting to database:

```bash
# SSH into Hostinger and test
mysql -h [DB_HOST] -u [DB_USER] -p[DB_PASSWORD] [DB_NAME]
```

### CORS errors:

- Update `FRONTEND_URL` in backend `.env`
- Restart Node.js process

### Files not uploading:

- Check `uploads/` folder permissions: `chmod 755 uploads/`
- Ensure sufficient disk space

### Port already in use:

```bash
# Find and kill process
lsof -ti:5000 | xargs kill -9
```

---

## **Key Differences from Local Development**

| Aspect        | Local                   | Production (Hostinger)       |
| ------------- | ----------------------- | ---------------------------- |
| Database Host | `localhost`             | `hostinger-ip-address`       |
| Frontend URL  | `http://localhost:5173` | `https://yourdomain.com`     |
| API URL       | `http://localhost:5000` | `https://yourdomain.com/api` |
| NODE_ENV      | `development`           | `production`                 |
| Logging       | Verbose                 | Minimal                      |
| HTTPS         | No                      | Yes (SSL required)           |

---

## **Security Checklist Before Going Live**

- [ ] Change `JWT_SECRET` to strong random value
- [ ] Use app-specific password for Gmail (not your main password)
- [ ] Enable SSL/HTTPS certificate
- [ ] Set `NODE_ENV=production`
- [ ] Remove `console.log()` statements from production code
- [ ] Test all authentication flows
- [ ] Backup database before launching
- [ ] Monitor disk space and database size
- [ ] Setup automated backups

---

## **Need Help?**

- Hostinger Support: https://www.hostinger.com/support
- Express.js Docs: https://expressjs.com/
- React Docs: https://react.dev/
