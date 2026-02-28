# 🌐 EventSphere Frontend

Frontend for the EventSphere Event Registration System.

Built with **React + Vite**, containerized using **Docker**, and served via **Nginx reverse proxy** on AWS EC2.

---

## 🚀 Features

- View events
- View event details
- Register for events
- Admin event creation
- Login interface

---

## 🏗 Deployment Architecture

### 📌 System Flow

User → EC2 (Port 80) → Nginx → Backend (Internal Port 5000) → MongoDB Atlas

---

## 🏗️ Architecture Overview

The frontend is deployed on an AWS EC2 instance and served using Nginx.

- Port **80** is publicly exposed.
- Nginx serves the production frontend build.
- API requests (`/api/*`) are forwarded internally to the backend.
- Backend runs on internal port **5000** and is not publicly accessible.

---

## 🛠️ Tech Stack

- **Frontend** – React / HTML / CSS / JS
- **Backend** – Node.js + Express
- **Reverse Proxy** – Nginx
- **Server** – AWS EC2
- **Database** – MongoDB Atlas

---

## 🌍 Port Configuration

- Port 80 → Public (Frontend - Nginx)
- Port 5000 → Internal (Backend via Docker network)

---

## ⚙️ Local Development

### Install Dependencies
```bash
npm install
```
### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```
---

## 🐳 Docker Deployment

### Build Image
```bash
docker build -t eventsphere-frontend .
```

### Run Container
```bash
docker run -d \
--name frontend \
--network eventsphere-network \
-p 80:80 \
--restart unless-stopped \
eventsphere-frontend
```
---

## 🌐 Live Deployment

🔗 **Live URL:** [http://3.235.106.175](http://3.235.106.175)

---

## 📸 Deployment Screenshots

## 📸 Deployment Screenshots

- [Application Running](./screenshots/app-running.png)
- [Docker Containers](./screenshots/docker-ps.png)
- [Nginx Configuration](./screenshots/nginx-config.png)
