const Note = require("../models/note");

// CREATE NOTE
async function createNote(req, res) {
  try {
    const { subject, content } = req.body;

    const newNote = new Note({
      subject,
      content,
      user:  req.user.userId
    });

    await newNote.save();

    res.status(201).json({ message: "Note created successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error creating note" });
  }
}

// GET ALL NOTES
async function getNotes(req, res) {
  try {
    const notes = await Note.find({ user: req.user.userId  })
      .sort({ pinned: -1, createdAt: -1 });

    res.status(200).json(notes);

  } catch (err) {
    res.status(500).json({ message: "Error fetching notes" });
  }
}

// UPDATE NOTE
async function updateNote(req, res) {
  try {
    const { id } = req.params;
    const { subject, content } = req.body;

    const note = await Note.findOne({
      _id: id,
      user: req.user.userId
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.subject = subject;
    note.content = content;

    await note.save();

    res.json({ message: "Note updated successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error updating note" });
  }
}

// DELETE NOTE
async function deleteNote(req, res) {
  try {
    const { id } = req.params;

    const note = await Note.findOneAndDelete({
      _id: id,
      user:  req.user.userId
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error deleting note" });
  }
}

// TOGGLE PIN
async function togglePinNote(req, res) {
  try {
    const { id } = req.params;

    const note = await Note.findOne({
      _id: id,
      user:  req.user.userId
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    note.pinned = !note.pinned;
    await note.save();

    res.json({
      message: "Pin updated",
      pinned: note.pinned
    });

  } catch (err) {
    res.status(500).json({ message: "Error toggling pin" });
  }
}

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  togglePinNote
};