# 🎨 MoodBoard

This repository contains all of the source code and setup files for **MoodBoard** — a minimalist, beautiful mood tracking and journaling application.

Built using:

* 🧠 Java + Spring Boot (Backend)
* 💻 React + Vite (Frontend)
* 🐘 PostgreSQL (Database)

---

## 📁 Project Structure

```plaintext
moodboard/
├── backend/              # Java Spring Boot app
│   ├── src/
│   ├── database/
│   ├── pom.xml
│   └── README.md
├── frontend/             # React + Vite client app
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── README.md
└── README.md             # This file
```

---

## 🚀 Getting Started

### 1. Clone this repository

```bash
git clone https://github.com/YOUR_USERNAME/moodboard.git
cd moodboard
```

### 2. Set up the backend

```bash
cd backend/database
./create.sh          # builds PostgreSQL database

cd ..
./mvnw spring-boot:run  # or use your IDE to run MoodBoardApplication.java
```

Make sure the backend is running at `http://localhost:9000`.

### 3. Set up the frontend

```bash
cd frontend
npm install
npm run dev
```

Open your browser at [http://localhost:5173](http://localhost:5173)

---

## 🔐 Authentication

* Default users are seeded via `data.sql`
* JWT-based login system (email/password)
* Frontend uses protected routes for secure views

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.