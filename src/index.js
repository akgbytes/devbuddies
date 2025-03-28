import express from "express";

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.listen(PORT, () => {
  console.log(`Server is successfully running on port : ${PORT}`);
});
