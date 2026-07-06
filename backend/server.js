import express from "express";
import "dotenv/config";

import cors from "cors";

const app = express();

const PORT = 8080;

app.use(cors());
app.use(express.json());

// testing route
app.post("/test", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // IMP
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: req.body.message, // IMP ( what user send we pass it to chatgpt api)
        },
      ],
    }),
  };

  try {
    let response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options,
    );

    // small validation (optional)
    if (!response.ok) {
      const error = await response.json();
      return res.status(response.status).json(error);
    }

    const data = await response.json();
    res.send(data.choices[0].message.content);
    
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log("Server is running");
});
