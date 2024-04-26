const fs = require("fs");
const utl = require("util");
var uniqid = require('uniqid');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Save {

    // Read note file
    read() {
        return readFile("db/db.json", "utf8");
    }

    // Write note file
    write() {
        return writeFile("db/db.json", JSON.stringify(note));
    }

    // Get notes
    getNotes() {

    }

    // Add notes
    addNotes() {

    }

    // Delete notes
    deleteNotes() {

    }
}
