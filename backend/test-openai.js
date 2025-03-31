require("dotenv").config();
const OpenAI = require("openai");

console.log("🔍 Testing OpenAI API...");
console.log("🗝️ API Key:", process.env.OPENAI_API_KEY ? "Loaded" : "Missing");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "What is AI?" }]
})
.then(res => console.log("OpenAI Response:", res.choices[0].message.content))
.catch(err => console.error("OpenAI API Error:", err));
