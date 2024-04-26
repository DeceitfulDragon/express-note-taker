const express = require("express");
const database = require("./db/database");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Retrieving notes
app.get("/api/notes", (req, res) => {
    database.getNotes()
        .then(notes => res.status(200).json(notes))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Adding notes
app.post("/api/notes", (req, res) => {
    const note = req.body;

    database.addNotes(note)
        .then(addedNote => res.status(200).json(addedNote))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Deleting notes
app.delete("/api/notes/:id", (req, res) => {
    const { id } = req.params;

    database.deleteNotes(id)
        .then(() => res.status(200).json({ deleted: true }))
        .catch(err => res.status(500).json({ error: err.message }));
});

// For HTML Routes
// notes.html
app.get("/notes", (req, res) => {
    res.sendfile(path.join(__dirname, "public/notes.html"));
});

// index.html
app.get("*", (req, res) => {
    res.sendfile(path.join(__dirname, "public/index.html"));
});

// Log that the server is running
app.listen(PORT, () => { console.log(`Server started using port: ${PORT}`) })