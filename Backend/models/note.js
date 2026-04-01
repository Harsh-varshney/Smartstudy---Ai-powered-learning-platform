const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    // Owner of Note (JWT based)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    pinned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;