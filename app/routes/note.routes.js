var auth = require("../../config/auth-midleware");

module.exports = function (app) {
  var notes = require("../controllers/note.controller.js");

  // Create a new Note
  app.post("/notes", auth, notes.create);

  // Retrieve all Notes
  app.get("/notes", notes.findAll);

  // Retrieve a single Note with noteId
  app.get("/notes/:noteId", notes.findOne);

  // Update a Note with noteId
  app.put("/notes/:noteId", auth, notes.update);

  // Delete a Note with noteId
  app.delete("/notes/:noteId", auth, notes.delete);
};
