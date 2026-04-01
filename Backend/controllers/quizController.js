const pdf = require("pdf-parse");
const generateQuiz = require("../services/aiQuizService");

exports.quizFromTopic = async (req, res) => {
  try {

    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Topic required" });
    }

    const quiz = await generateQuiz(topic);

    res.json(quiz);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Quiz generation failed"
    });

  }
};


exports.quizFromQuestion = async (req, res) => {
  try {

    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question required" });
    }

    const quiz = await generateQuiz(question);

    res.json(quiz);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Quiz generation failed"
    });

  }
};


exports.quizFromPDF = async (req, res) => {

  try {

    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "PDF file required"
      });
    }

    const data = await pdf(file.buffer);

    const text = data.text.slice(0,3000);

    const quiz = await generateQuiz(text);

    res.json(quiz);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Quiz generation failed"
    });

  }

};