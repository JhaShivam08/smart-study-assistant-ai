const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/ask", async (req, res) => {
  try {
    const { question } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(question);
    const response = await result.response;
    const text = response.text();

    res.json({ answer: text });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      answer: "Something went wrong!"
    });
  }
});

app.listen(3002, () => {
  console.log("✅ Server running at http://localhost:3002");
});