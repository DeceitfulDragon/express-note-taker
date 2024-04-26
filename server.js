const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log that the server is running
app.listen(PORT, () => { console.log(`Server started using port: ${PORT}`) })