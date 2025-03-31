# AI-Powered Website Chatbot Extension

## 📌 Project Overview
This project is a Chrome extension that embeds an AI chatbot into any website. The chatbot reads the webpage content, answers user questions based on it, and improves over time by storing Q&A interactions in a database.

## 🚀 Features
- **Chrome Extension Integration** – Injects the chatbot into any website.
- **Real-time Website Analysis** – Reads & processes webpage content dynamically.
- **Data Storage & Learning** – Saves user interactions in MongoDB for improvement over time.
- **Clean & Responsive UI** – A modern chatbox design for seamless interaction.

## 🛠️ Tech Stack
- **Backend:** Node.js + Express.js (Handles API requests & AI processing)
- **Frontend:** JavaScript (Chrome extension with chatbot UI)
- **Database:** MongoDB (Stores user queries and AI responses)
- **AI Model:** OpenAI GPT-3.5 Turbo (Processes & generates answers)
- **Web Scraping:** Puppeteer (Extracts live website content)

---

## 📦 Installation & Setup
### 1️⃣ Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add the required environment variables:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the backend server:
   ```sh
   node server.js
   ```

### 2️⃣ Chrome Extension Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Load the extension in Chrome:
   - Open **chrome://extensions/** in the browser.
   - Enable **Developer mode** (top-right corner).
   - Click **Load unpacked** and select the `frontend` folder.
3. The extension should now be active in your browser.

---

## 📌 Usage Guide
1. Open any website where you want to use the chatbot.
2. Click on the extension icon in Chrome.
3. Type your question in the chatbot.
4. The chatbot will analyze the webpage and provide relevant responses.

---

## 🤖 API Endpoints
### 🔹 Process Website Content
```
POST /api/process
```
**Description:** Extracts and analyzes content from the current webpage.

### 🔹 Store User Queries
```
POST /api/store
```
**Description:** Saves user interactions for future learning.

---

