🎨 AI Code Reviewer — Frontend

🧠 Overview

This frontend is a modern, interactive web interface for the AI Code Reviewer system.

It provides a real-time coding experience where users can write Python code, analyze it instantly, and receive structured feedback powered by a hybrid backend (AST + AI).

The UI is designed for clarity, responsiveness, and developer-friendly interaction.

---

⚙️ Tech Stack

- Framework: Next.js (App Router)
- Language: TypeScript
- Styling: Tailwind CSS
- Editor: Monaco Editor

---

🧩 Core Features

🧑‍💻 Code Editor

- Integrated Monaco Editor (VS Code-like experience)
- Python syntax highlighting
- Smooth and responsive editing

---

🚀 Analyze Flow

- Sends code to backend via API
- Displays loading state for better UX
- Handles errors gracefully
- Provides seamless interaction between frontend and backend

---

📊 Score System

- Dynamic scoring system (0–100)
- Visual feedback using color indicators:

Score Range| Color
> 80| 🟢 Green
50–80| 🟡 Yellow
< 50| 🔴 Red

👉 Helps users quickly understand code quality

---

⚠️ Issues Panel

- Displays detected issues from backend
- Clean and structured UI
- Easy-to-understand error messages

---

💡 Suggestions Panel

- AI-generated recommendations
- Clear and actionable insights
- Improves code readability and performance

---

🧠 Improved Code Output

- Syntax-highlighted improved code
- One-click Copy button
- Clean and readable formatting

---

🧪 Test Case System (🔥 Standout Feature)

- Side dropdown panel for quick testing
- Includes 10 predefined test cases
- “Use” → loads code into editor instantly
- “Copy” → copies test case to clipboard

👉 Enables quick validation and demo-ready experience

---

🔗 API Integration

- Endpoint: "POST /analyze"
- Sends user code to backend
- Receives:
  - Score
  - Issues
  - Suggestions
  - Improved Code

---

🎯 What This Frontend Achieves

✔ Real-time code analysis experience
✔ Clean visualization of complex backend data
✔ Smooth user interaction and feedback loop
✔ Interactive testing environment
✔ Developer-friendly UI with strong UX focus

---

▶️ Run Frontend Locally

npm install
npm run dev

---

🏁 Final Note

This frontend is not just a UI —
it is a developer-centric interface designed to make AI-powered code analysis intuitive, interactive, and efficient.

---