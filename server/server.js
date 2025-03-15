if (process.env.NODE_ENV != "production") {
     require('dotenv').config();
}

const cors = require('cors');
const connectToDb = require('./config/connectToDb');
const express = require('express');
const { fetchNotes, createNote, updateNote, deleteNote } = require('./controllers/notesController');

const app = express();

app.use(express.json());
app.use(cors());

connectToDb();

app.get('/notes', fetchNotes);

app.get('/notes/:id', fetchNotes);

app.post('/notes', createNote);

app.put('/notes/:id', updateNote);

app.delete('/notes/:id', deleteNote);

app.listen(process.env.PORT);