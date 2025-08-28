import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

export async function getANote(req, res) {
  try {
    const id = req.params.id;

    const note = await Note.findById(id);
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json({ message: "New Note created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
}

export async function updateNote(req, res) {
  try {
    const id = req.params.id;
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      {
        title,
        content,
      },
      { new: true }
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note Not Found" });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
}

export async function deleteNote(req, res) {
  try {
    const id = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(id, { new: true });

    if (!deletedNote)
      return res.status(404).json({ message: "Note Not Found" });

    res.status(200).json({ message: "Note deleted " });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
}
