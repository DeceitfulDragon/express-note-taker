const express = require("express");
const database = require("./db/database");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/notes", (req, res) => {

    database.getNotes().then((notes) => {
        return res.status(200).json(notes); // status to 200 on success
    }).catch((err) => res.status(500).json(err)); // status to 500 on error
});

app.post("/api/notes", (req, res) => {
    const note = req.body;

    database.addNotes(note).then(addedNote => { 
        res.status(200).json(addedNote) 
    }).catch(err => res.status(400).json({ err }));
});

// Log that the server is running
app.listen(PORT, () => { console.log(`Server started using port: ${PORT}`) })