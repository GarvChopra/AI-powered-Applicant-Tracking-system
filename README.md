# 🚀 HireReady — AI-Powered Resume Tracker & Feedback Tool

🌐 **Live Demo:** [https://ai-applicant-tracking.netlify.app](https://ai-applicant-tracking.netlify.app)

---

## 🧠 What is HireReady?

HireReady is a smart resume tracking application that lets you upload your resume, analyze it with AI, and get detailed feedback on how to improve it for job applications. It uses Claude AI (via Puter.js) to provide ATS scores, tone analysis, content feedback, and skill suggestions — all in one place.

---

## ✨ Features

- 🔐 **Authentication** — Secure login via Puter.js (no backend needed)
- 📤 **Resume Upload** — Upload PDF or image resumes
- 🤖 **AI Feedback** — Get detailed resume analysis powered by Claude AI
- 📊 **ATS Score** — See how your resume performs in Applicant Tracking Systems
- 📈 **Category Scores** — Breakdown for Tone & Style, Content, Structure, and Skills
- 🗂️ **Resume Dashboard** — View all your uploaded resumes in one place
- 🖼️ **Resume Preview** — See a visual preview of your resume
- 📱 **Responsive Design** — Works on desktop and mobile

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React + Vite | Frontend framework |
| Tailwind CSS | Styling |
| React Router DOM | Client-side routing |
| Puter.js | Auth, File Storage, KV Store, AI |
| Claude AI (claude-sonnet-4) | Resume analysis |
| pdfjs-dist | PDF to image conversion |
| react-dropzone | File upload UI |
| Zustand | State management |
| Netlify | Deployment |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/hireready.git

# Navigate to the project directory
cd hireready

# Install dependencies
npm install

# Copy the pdf worker (required for PDF conversion)
copy node_modules\pdfjs-dist\build\pdf.worker.min.mjs public\

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
src/
├── Components/
│   ├── Navbar.jsx          # Navigation bar
│   ├── ResumeCard.jsx      # Resume card component
│   ├── ScoreCircle.jsx     # Circular score display
│   ├── ScoreGauge.jsx      # Gauge chart for overall score
│   ├── ScoreBadge.jsx      # Score badge (Strong/Good Start/Needs Work)
│   ├── FileUploader.jsx    # Drag and drop file uploader
│   ├── Summary.jsx         # Resume score summary
│   ├── ATS.jsx             # ATS score component
│   ├── Details.jsx         # Detailed feedback accordion
│   └── Accordion.jsx       # Accordion UI component
├── routes/
│   ├── Auth.jsx            # Login/logout page
│   ├── Upload.jsx          # Resume upload page
│   └── resume.jsx          # Resume review page
├── lib/
│   ├── puter.jsx           # Puter.js store (Zustand)
│   ├── pdf2img.jsx         # PDF to image converter
│   └── utils.jsx           # Utility functions
├── Constants/
│   └── index.jsx           # Static data and AI prompt templates
├── App.jsx                 # Main app with routes
└── main.jsx                # Entry point
public/
├── images/                 # Background SVGs, resume previews, GIFs
├── icons/                  # SVG icons
└── pdf.worker.min.mjs      # PDF.js worker
```

---

## 🔄 How It Works

1. **Login** — User signs in via Puter.js authentication
2. **Upload Resume** — User fills in company name, job title, job description and uploads a PDF or image
3. **Processing** — App converts PDF to image, uploads both files to Puter cloud storage
4. **AI Analysis** — Claude AI analyzes the resume against the job description
5. **Feedback Saved** — Results are stored in Puter KV store with a unique UUID
6. **Review** — User is redirected to the resume review page with detailed feedback

---

## 📊 AI Feedback Structure

The AI returns feedback in the following format:

```json
{
  "overallScore": 85,
  "ATS": {
    "score": 90,
    "tips": [{ "type": "good|improve", "tip": "..." }]
  },
  "toneAndStyle": {
    "score": 80,
    "tips": [{ "type": "good|improve", "tip": "...", "explanation": "..." }]
  },
  "content": { "score": 75, "tips": [...] },
  "structure": { "score": 85, "tips": [...] },
  "skills": { "score": 70, "tips": [...] }
}
```

---

## 🌐 Deployment

This project is deployed on **Netlify**.

To deploy your own:

1. Push your code to GitHub
2. Connect your GitHub repo to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

> **Note:** Make sure your `Constants` folder import paths match exactly (case-sensitive on Linux).

---

## ⚙️ Environment

No environment variables required — all auth, storage, and AI is handled by Puter.js which runs entirely client-side.

---

## 📸 Screenshots

| Home Page | Upload Page | Resume Review |
|---|---|---|
| Resume dashboard with all uploaded resumes | Upload form with drag & drop | Detailed AI feedback with scores |

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📜 License

[MIT](LICENSE)

---

## 👨‍💻 Author

Built with ❤️ using React, Puter.js, and Claude AI.
