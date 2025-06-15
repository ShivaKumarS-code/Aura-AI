# <img src="https://img.icons8.com/fluency/48/artificial-intelligence.png" alt="AI Icon" width="40" height="40"> Aura-AI: Image Caption Generator

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI">
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/HuggingFace-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black" alt="Hugging Face">
</p>

**Aura-AI** is a full-stack web application that generates captions for uploaded images using a powerful AI model. It leverages the **BLIP (Bootstrapping Language-Image Pretraining)** model from Hugging Face and provides a clean UI built with React and Tailwind CSS.

---

## 🛠️ Tech Stack

<table>
  <tr>
    <td><b>Frontend</b></td>
    <td>React, Tailwind CSS, Vite</td>
  </tr>
  <tr>
    <td><b>Backend</b></td>
    <td>Python, FastAPI</td>
  </tr>
  <tr>
    <td><b>AI Model</b></td>
    <td>BLIP (Hugging Face Transformers)</td>
  </tr>
</table>

---

## ✨ Features

<ul>
  <li>📤 <b>Upload any image</b> - Support for multiple image formats</li>
  <li>🤖 <b>AI-powered captions</b> - Automatically generates descriptive captions</li>
  <li>📋 <b>Copy to clipboard</b> - One-click caption copying</li>
  <li>🎨 <b>Clean, minimal UI</b> - Modern design with Tailwind CSS</li>
  <li>⚡ <b>Fast API backend</b> - Powered by FastAPI and Hugging Face Transformers</li>
</ul>

---

## 🚀 Installation & Setup

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the FastAPI server:**
   ```bash
   uvicorn main:app --reload
   ```
   
   <blockquote>
   🌐 Server runs at <code>http://127.0.0.1:8000</code>
   </blockquote>

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file with the following content:**
   ```env
   VITE_API_URL=http://127.0.0.1:8000
   ```

4. **Start the frontend dev server:**
   ```bash
   npm run dev
   ```
   
   <blockquote>
   🌐 App will be available at <code>http://localhost:5173</code>
   </blockquote>

---

## 📁 Project Structure

```
📦 aura-ai
├── 📂 frontend
│   ├── 📄 App.jsx
│   ├── 📄 .env
│   ├── 📄 package.json
│   └── 📄 ...
├── 📂 backend
│   ├── 📄 main.py
│   ├── 📄 requirements.txt
│   └── 📄 ...
└── 📄 README.md
```

---

## 🔌 API Endpoint

### `POST /generate-caption`

<table>
  <tr>
    <td><b>Accepts</b></td>
    <td>Multipart image file</td>
  </tr>
  <tr>
    <td><b>Returns</b></td>
    <td>JSON with AI-generated caption</td>
  </tr>
  <tr>
    <td><b>Content-Type</b></td>
    <td><code>multipart/form-data</code></td>
  </tr>
</table>

**Example Response:**
```json
{
  "caption": "a person standing in a field with mountains in the background"
}
```

---

## 🔧 Environment Variables

### Frontend (`.env`)
```env
VITE_API_URL=http://127.0.0.1:8000
```

> **Note:** For production deployment, replace with your actual backend URL

---

## 🎯 Usage

1. **Start both backend and frontend servers**
2. **Open your browser** and navigate to `http://localhost:5173`
3. **Upload an image** using the file input
4. **Wait for AI processing** - caption will be generated automatically
5. **Copy the caption** using the copy button

---

## 🚀 Deployment

### Frontend Deployment
- Deploy to **Vercel**, **Netlify**, or similar platforms
- Update `VITE_API_URL` in environment variables

### Backend Deployment
- Deploy to **Hugging Face Spaces**, **Railway**, **Heroku**, or similar platforms
- Ensure all dependencies are listed in `requirements.txt`

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ using React & FastAPI
</p>
