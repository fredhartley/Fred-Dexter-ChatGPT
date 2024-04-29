const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/chatgpt-request", async (req, res) => {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: req.body.message,
                },
            ],
        }),
    });

    const json = await response.json();

    res.send({ choices: json.choices, created: json.created });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
