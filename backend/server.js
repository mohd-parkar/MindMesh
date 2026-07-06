import express from "express";
import "dotenv/config";

import cors from "cors";

const app = express();

const PORT = 8080;

app.use(cors());
app.use(express.json());

// testing route
app.post("/test", async (req, res) => {
 
});

app.listen(PORT, () => {
  console.log("Server is running");
});
