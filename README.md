# Nexus AI 🧠

> **Experience the future of conversation.**  
> A premium, intelligent chat interface powered by Google's Gemini Pro, designed for developers and creators who demand speed, aesthetics, and capability.

[Project Preview]
<img width="800" height="450" alt="image" src="https://github.com/user-attachments/assets/8015be6d-2683-4b4d-8e72-413521499599" />


---

## 🚀 Why Nexus AI?

Most chatbots feel utilitarian. **Nexus AI** feels like a tool you *want* to use. We've focused on creating a "Product-Grade" experience that rivals top SaaS applications.

*   **✨ Immersive Design**: A deep, reliable dark mode with glassmorphism accents and distraction-free typography (`Inter`).
*   **⚡ Smart Auto-Titling**: The app reads your first prompt and automatically generates a concise, relevant title for the chat session using AI. No more "New Chat 1".
*   **📝 Developer-First Markdown**: Pristine syntax highlighting for code blocks (`Prism.js`), tables, and formatted text.
*   **🔒 Secure & Private**: Robust JWT authentication ensures your conversation history remains yours.
*   **📱 Fluid Responsiveness**: A seamless experience whether you're on a desktop workstation or a mobile device.

## 🛠️ The Tech Stack

Built with the MERN stack for robust performance and scalability.

*   **Frontend**: React + Vite, Tailwind CSS (Custom Design System), Context API.
*   **Backend**: Node.js, Express.js.
*   **Database**: MongoDB (Mongoose).
*   **AI Engine**: Google Gemini API (Flash/Pro).
*   **Authentication**: JWT & Bcrypt.

---

## 🏁 Getting Started

Follow these steps to get Nexus AI running locally in minutes.

### 1. Clone the Repository
```bash
git clone https://github.com/HardikMathur11/AI-Chatbot.git
cd AI-Chatbot
```

### 2. Backend Setup
The backend handles authentication and chat persistence.

```bash
cd Backend
npm install
```

**Create a `.env` file in the `Backend` folder:**
```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
# Optional: GEMINI_API_KEY if you move AI logic to backend strictly
```

**Start the Server:**
```bash
npm start
# Server runs on http://localhost:5000
```

### 3. Frontend Setup
The interface where the magic happens.

```bash
cd ../Frontend
npm install
```

**Create a `.env` file in the `Frontend` folder:**
```env
VITE_SERVER_URL=http://localhost:5000
VITE_GEMINI_API_KEY=your_google_gemini_api_key
```

**Start the Dev Server:**
```bash
npm run dev
# Open http://localhost:5173 to view it in the browser
```


---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Built with ❤️ by <b>Hardik Mathur</b></p>
  <p>
    <a href="https://github.com/HardikMathur11">GitHub</a> • 
    <a href="www.linkedin.com/in/hardik-mathur-5a80a82ba">LinkedIn</a>
  </p>
</div>
