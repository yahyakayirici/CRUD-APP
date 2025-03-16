import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: "",
    body: ""
  })
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: "",
    body: "",
  })

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:3000/notes");
    setNotes(res.data.notes); 
  }

  const updateCreateFormField = (e) => {
    const { name, value } = e.target
    setCreateForm({
      ...createForm,
      [name]: value,
    })
  }

  const handleUpdateFieldChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm({
      ...updateForm,
      [name]: value,
    })
  }

  const createNote = async (e) => {
    e.preventDefault(); 

    const res = await axios.post('http://localhost:3000/notes', createForm)

    setNotes([...notes, res.data.note])

    setCreateForm({ title: "", body: "" });

    console.log(res);
  }

  const deleteNote = async (_id) => {
    const res = await axios.delete('http://localhost:3000/notes/' + _id)

    const newNotes = [...notes].filter(note => {
      return note._id  != _id
    })
    setNotes(newNotes);
  };

  const toggleUpdate = (note) => {
    setUpdateForm({
      title: note.title,
      body: note.body, 
      _id: note._id, 
    })
  }

  const updateNote = async (e) => {
    e.preventDefault(); 
    
    const { title, body } = updateForm;
    const res = await axios.put('http://localhost:3000/notes/' + updateForm._id, {title, body});
    console.log(res);

    const newNotes = [...notes];
    const noteIndex = notes.findIndex((note) => {
      return notes._id == updateForm.id;
    })
    newNotes[noteIndex] = res.data.note;

    setNotes(newNotes);

    setUpdateForm({
      _id: null,
      title: "",
      body: "",
    })
  } 

  return (<div className="App">
    <div>
      <h2>Notes:</h2>
      {notes && notes.map(note => {
        return <div key={note._id}>
          <h3>{note.title}</h3>
          <button onClick={() => deleteNote(note._id)}>Delete Note</button>
          <button onClick={() => toggleUpdate(note)}>Update Note</button>
        </div>
      })}
    </div>

    {!updateForm._id && <div>
      <h2>Create Note</h2>
      <form onSubmit={createNote }>
        <input onChange={updateCreateFormField} value={createForm.title} name="title"/>
        <textarea onChange={updateCreateFormField} value={createForm.body} name="body"/>
        <button type="sumbit">Create Note</button>
      </form>
    </div>}

    {updateForm._id && <div>
      <h2>Update Note</h2>
      <form onSubmit={updateNote}>
        <input onChange={handleUpdateFieldChange} value={updateForm.title} name="title"/>
        <textarea onChange={handleUpdateFieldChange} value={updateForm.body} name="body"/>
        <button type="submit">Update Note</button>
      </form>
    </div>}

  </div>);
}

export default App;
