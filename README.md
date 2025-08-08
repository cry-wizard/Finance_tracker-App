
# 💰 Finance Tracker App

📱 **Mobile App** + 🖥 **Backend API** — A modern and clean Finance Tracking solution to manage your income and expenses, built using **React Native (Expo)** and **Express.js**.

---

## ✨ Features

- ✅ Add and categorize **Income** & **Expenses**
- 📅 View recent **Transaction History**
- 📊 Visualize your spending using **Pie Charts**
- 🔒 Secure storage using `expo-secure-store`
- ☁️ Backend powered by **Express.js** + PostgreSQL(NeonDB)
- 🚀 Rate limiting and security using **Upstash Redis**

---
## 📸 Screenshots

| Login Screen                                                                                             | Home Screen                                                                                              | Add Task View                                                                                            |
| -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/b1611ecb-27c1-4268-aa08-c3982509348f" width="250"/> | <img src="https://github.com/user-attachments/assets/efb9a7c5-2354-48b3-9c06-ded411cc9682" width="250"/> | <img src="https://github.com/user-attachments/assets/71ecd88a-250c-4766-a43d-f5589b700504" width="250"/> |


## 🛠️ Tech Stack

### 🔹 Frontend (Mobile)
- React Native via Expo
- Expo Router & Navigation
- Clerk Authentication
- Haptics, Blur Effects, Font & Icons

### 🔸 Backend (API)
- Node.js + Express
- NeonDB (Serverless Postgres)
- Redis + Rate Limiting
- Cron Jobs for automation

---

## 🚀 Getting Started

### 📦 Backend Setup

```bash
cd backend
npm install
npm run dev
```
> Configure `.env` with your database and Redis credentials.

### 📱 Mobile Setup

```bash
cd mobile
npm install
npx expo start
```
> Requires Expo Go on your mobile device to preview.

---

## 🔐 Environment Variables

Make sure to set these in a `.env` file in the backend:

```env
DATABASE_URL=your_neon_db_url
REDIS_URL=your_upstash_redis_url
PORT=3000
```

---

## 📂 Project Structure

```
Finance_tracker-App/
│
├── backend/
│   └── src/
│       └── server.js
│   └── .env
│
├── mobile/
│   └── app/
│       └── (your screens)
│   └── assets/screenshots/
│
└── README.md
```

---

## 👤 Author

**cry-wizard** 🔮  
[GitHub](https://github.com/cry-wizard)

---

## 🌟 Contributing

Contributions, issues and feature requests are welcome!  
Feel free to open a pull request. 🙌

---

## 🪪 License

This project is licensed under the ISC License.
