const axios = require("axios");

async function generateQuiz(content){

    const prompt = `Create 5 multiple choice questions from the following content.
${content}

Rules:
- Each question must have 4 options
- Provide correct answer
- Return JSON only

Format:
[
 {
  "question":"...",
  "options":["A","B","C","D"],
  "answer":"..."
 }
]`;

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

     try{
        return JSON.parse(result);
    }catch(err){
        console.log("AI returned:", result);
        throw new Error("Invalid JSON from AI");
    }

}

module.exports = generateQuiz;