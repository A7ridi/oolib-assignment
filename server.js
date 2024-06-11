const express = require("express");
const formData = require("./formData.json");
const cors = require("cors");

const app = express();
const port = 8000;

app.use(cors());

app.get("/api/formData", (req, res) => {
  res.json(formData);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
