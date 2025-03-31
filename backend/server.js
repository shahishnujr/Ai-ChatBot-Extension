require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();


process.env.NODE_NO_WARNINGS = "1"; 

app.use(cors());
app.use(bodyParser.json());
;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 // Timeout after 5 seconds if no response
})
    .then(() => console.log("MongoDB connected successfully! 🎉"))
    .catch(err => {
        console.error(" MongoDB connection error:", err);
        process.exit(1); // Stop the server if MongoDB is not connected
    });

const chatbotRoutes = require("./routes/chatbotRoutes");
app.use("/api", chatbotRoutes);

//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
