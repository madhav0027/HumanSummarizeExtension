✨ AI Text Summarizer — Chrome Extension

An AI-powered Chrome extension that summarizes text into short, easy-to-understand summaries using Groq AI.

🚀 Features

* Humanized Summary: Generates concise, natural-sounding summaries.
* Professional Summary: Creates clear, structured, professional summaries.
* AI-Powered: Uses Groq API with the GPT-OSS 20B model.

🛠️ Tech Stack

* Chrome Extension
* Node.js & Express.js
* Groq SDK
* GPT-OSS 20B
* dotenv & CORS

⚙️ Setup

1. Install dependencies: npm install
2. Add your Groq API key to .env:

AI_API_KEY=your_groq_api_key
PORT=3000

3. Start the backend: node server.js
4. Open chrome://extensions/ in Chrome.
5. Enable Developer mode, click Load unpacked, and select the extension folder.

🔌 API

Endpoint: POST /api/ai

Request:

{
  "action": "humanize-summary",
  "text": "Text to summarize"
}

Supported actions:

* humanize-summary
* professional-summary

🔒 Security

Keep your API key private and never commit your .env file to GitHub.
