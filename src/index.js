const PORT = process.env.PORT || 4000;

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require("./routes/index"));

app.listen(PORT);
console.log("Server on port ", PORT);
