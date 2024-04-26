const fs = require("fs");
const util = require("util");
var uniqid = require('uniqid');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Database {

    // Read note file
    read() {
        return readFile("db/db.json", "utf8");
    }

    // Write note file
    write(note) {
        return writeFile("db/db.json", JSON.stringify(note));
    }

    // Get notes
    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes = [];

            try { parsedNotes = JSON.parse(notes); }
            catch(err) { parsedNotes = []; }
            return parsedNotes;
        });
    }

    // Add notes
    addNotes(note) {
        const { title, text } = note;
        
        // Make sure the note has a title and text
        if (!title || !text) { throw new Error("Please provide a title and text content for the note!"); }
    
        const noteWithId = { title, text, id: uniqid() };
    
        return this.getNotes()
            .then(notes => {
                const updatedNotes = [...notes, noteWithId];
                return this.write(updatedNotes);
            })
            .then(() => noteWithId);  // Returns new note with ID
    }

    // Delete notes
    deleteNotes(id) {
        return this.getNotes().then((notes) => {
            const filteredNotes = notes.filter(note => note.id !== id);
            return this.write(filteredNotes);
        });
    }
}

// Log notes
new Database().getNotes().then((notes) => console.log(notes));
