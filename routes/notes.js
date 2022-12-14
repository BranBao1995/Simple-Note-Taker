const notes = require("express").Router();
const {
  readFromFile,
  readAndAppend,
  readAndDelete,
} = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

// Handles the GET request
notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);

  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// Handles the POST request
notes.post("/", (req, res) => {
  console.info(`${req.method} request received to submit note`);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in posting note");
  }
});

// Handles the DELETE request
notes.delete("/:id", (req, res) => {
  console.info(`${req.method} request received to delete note`);

  // save target ID to an variable
  const id = req.params.id;

  if (id) {
    readAndDelete(id, "./db/db.json");

    res.json("Successfully deleted note.");
  } else {
    res.json("Error in deleting note.");
  }
});

module.exports = notes;
