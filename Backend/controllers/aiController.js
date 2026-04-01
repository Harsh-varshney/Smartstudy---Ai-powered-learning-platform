const axios = require("axios");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");

// ==============================
// AI Assistant (Normal Q&A)
// ==============================

exports.askAI = async (req, res) => {
  try {

    const { question } = req.body;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Explain answers in clear bullet points for students."
          },
          {
            role: "user",
            content: question,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const answer = response.data.choices[0].message.content;

    res.json({ answer });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "AI error" });
  }
};



// ==============================
// AI Notes Generator
// ==============================

exports.generateNotes = async (req, res) => {
  try {

    const { topic } = req.body;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Generate short exam-ready study notes with headings and bullet points for students.",
          },
          {
            role: "user",
            content: `Create short study notes on: ${topic}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const notes = response.data.choices[0].message.content;

    res.json({ notes });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "AI notes error" });
  }
};

// pdf analyze module
exports.analyzePaperFile = async (req, res) => {
  try {

    const file = req.file;
    console.log(file);

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let extractedText = "";

    // PDF
    if (file.mimetype === "application/pdf") {
      const data = await pdfParse(file.buffer);
      extractedText = data.text;
    }

    // Image
    else if (file.mimetype.startsWith("image/")) {
      const result = await Tesseract.recognize(file.buffer, "eng");
      extractedText = result.data.text;
    }

    const prompt = `
Analyze the following exam question paper.

1. Identify main topics
2. List topics
3. Give short explanation (2-3 lines)

Paper:
${extractedText}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const result = response.data.choices[0].message.content;

    res.json({ result });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Paper analysis failed" });
  }
};