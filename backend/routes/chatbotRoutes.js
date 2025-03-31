const express = require("express");
const router = express.Router();
const Query = require("../models/query"); 
const OpenAI = require("openai");


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

router.post("/chat", async (req, res) => {
    const { question, website, content } = req.body;

    if (!question || !website || !content) {
        return res.status(400).json({ error: "Missing required fields: question, website, and content are needed." });
    }

    try {
        console.log(`📩 Received question: "${question}" from ${website}`);


        const storedQuery = await Query.findOne({ question, website });
        if (storedQuery) {
            console.log("🗄️ Returning stored response from database.");
            return res.json({ answer: storedQuery.answer });
        }
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: `You are an AI assistant that answers questions about the website: ${website}.` },
                { role: "user", content: `Website Content: ${content}. Now, answer: ${question}` }
            ],
            max_tokens: 200
        });

        if (response.choices && response.choices.length > 0) {
            const aiAnswer = response.choices[0].message.content;
            const newQuery = new Query({ question, answer: aiAnswer, website });
            await newQuery.save();

            console.log("Answer stored in database!");
            return res.json({ answer: aiAnswer });
        } else {
            console.error("OpenAI did not return a valid response.");
            return res.status(500).json({ error: "OpenAI did not return a valid response." });
        }
    } catch (error) {
        console.error("OpenAI API Error:", error);
        return res.status(500).json({ error: "OpenAI API request failed. Check API key and logs." });
    }
});

module.exports = router;
