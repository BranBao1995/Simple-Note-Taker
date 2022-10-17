const fs = require("fs");
const util = require("util");

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// Function to write to file
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

// Function to read a file and then append data
const readAndAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

// Function to read a file and the delete a piece of data based on target ID
const readAndDelete = (id, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      // Use filter() to keep the note(s) with different IDs
      let filteredData = parsedData.filter((note) => {
        return note.id != id;
      });
      writeToFile(file, filteredData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete };
