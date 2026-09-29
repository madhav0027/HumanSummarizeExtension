require('dotenv').config();

const express = require('express');
const cors = require('cors');

const Groq = require('groq-sdk');

const groq = new Groq({
    apiKey: process.env.AI_API_KEY,
});

const app = express();

app.use(cors({
    origin:"*"
}));
app.use(express.json());

const PORT = process.env.PORT || 3000;

const prompts = {

  "humanize-rewrite": `
Rewrite the following text so it sounds naturally written by a real person.

Requirements:
- Preserve the original meaning.
- Avoid robotic or generic AI phrasing.
- Use natural sentence structure.
- Vary sentence length.
- Don't unnecessarily add information.
- Keep the same approximate level of detail.

TEXT:
`,

  "professional-rewrite": `
Rewrite the following text in a polished professional style.

Requirements:
- Preserve the original meaning.
- Make it clear and concise.
- Use professional vocabulary.
- Remove unnecessary repetition.
- Improve grammar and sentence structure.
- Do not make it excessively formal.

TEXT:
`,

  "humanize-summary": `
Summarize the following text in a natural human voice.
KEEP IT SHORT AND CONCISE.

Requirements:
- Keep the key information.
- Remove unnecessary details.
- Use natural language.
- Avoid robotic phrasing.
- Make the summary easy to read.

TEXT:
`,

  "professional-summary": `
Create a concise professional summary of the following text.
KEEP IT SHORT AND CONCISE.

Requirements:
- Capture the key points.
- Use clear professional language.
- Remove repetition and filler.
- Organize the information logically.
- Do not introduce information that isn't in the original.

TEXT:
`
};



app.post("/api/ai", async (req, res) => {
  try {
    const { action, text } = req.body;

    if (!text) {
      return res.status(400).json({
        error: "Text is required"
      });
    }

    if (!prompts[action]) {
      return res.status(400).json({
        error: "Invalid action"
      });
    }


    console.log("Sending prompt to AI:", prompts[action]);

    const chatCompletion = await groq.chat.completions.create({
        "messages": [
            {
                "role": "system",
                "content": prompts[action]
            },
            {
            "role": "user",
            "content": text
            }
        ],
        "model": "openai/gpt-oss-20b",
        "temperature": 1,
        "max_completion_tokens": 2048,
        "top_p": 1,
        "stream": false,
        "reasoning_effort": "medium",
        "stop": null
        });

    const result = chatCompletion.choices[0].message.content;

    console.log("AI response:", result);

    res.json({
      result
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "AI request failed"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});