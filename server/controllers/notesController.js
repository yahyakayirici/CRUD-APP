const Note = require("../models/note");

const fetchNotes = async (req, res) => {
    const notes = await Note.find();
    res.json({ notes });
}

const fetchNote = async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.json({ note });
}

const createNote = async (req, res) => {
    const {title, body} = req.body;

    const note = await Note.create({
        title,
        body
    }); 

    res.json({ note }) ;
}

const updateNote = async (req, res) => {
    const {title, body} = req.body;

    await Note.findByIdAndUpdate(req.params.id, {
        title,
        body
    });

    const note = await Note.findById(req.params.id);

    res.json({ note }); 
}

const deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
res.json({ msg: "Record deleted" });
}

module.exports = {
    fetchNotes: fetchNotes,
    fetchNote: fetchNote,
    createNote: createNote,
    updateNote: updateNote,
    deleteNote: deleteNote
}