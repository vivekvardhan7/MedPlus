# 💊 Medicine Reminder & Tracker

A **full-stack application** to help users schedule, track, and receive reminders for their medicines.  
Supports **custom schedules**, **notifications**, and a **user-friendly interface**.

---

## 🛠 Tech Stack
- **Frontend:** React.js, TailwindCSS  
- **Backend:** Node.js, Express.js  
- **Database:** MySQL  
- **Other Tools:**  
  - Nodemailer (for email reminders)  
  - Twilio (for SMS reminders – optional)  

---

## 📂 Folder Structure
project-root/
├── client/ # React frontend
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ └── App.js
│
├── server/ # Express backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── server.js
│
├── database/ # MySQL setup and scripts
├── .env # Environment variables
└── README.md

yaml
Copy
Edit

---

## 🧪 Setup & Installation

### 🔧 Prerequisites
- Node.js & npm installed  
- MySQL server running  
- *(Optional)* Git & VS Code  

---

### 🖥 Backend Setup
```bash
cd server
npm install
# Create a `.env` file with your DB credentials and other configuration
npm start
🌐 Frontend Setup
bash
Copy
Edit
cd client
npm install
npm start
Frontend will be available at: http://localhost:3000/

✅ TODO / Enhancements
📅 Calendar view to visualize medicine schedules

📲 Add PWA (Progressive Web App) support

✉️ SMS & Email reminders

📱 Mobile responsive UI improvements

🧠 AI-based missed-dose detection and suggestions (future scope)

🙌 Author
Tata Sai Vivek
Full Stack Developer | Feb 2025

pgsql
Copy
Edit
