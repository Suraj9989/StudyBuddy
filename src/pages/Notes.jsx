import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import './Notes.css';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const user = JSON.parse(localStorage.getItem('currentUser'));
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: {errors}
  } = useForm();

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem(`notes-${user?.email}`)) || [];
    setNotes(savedNotes);
  }, [user?.email]);

  const saveNotesToLocal = (updatedNotes) => {
    localStorage.setItem(`notes-${user?.email}`, JSON.stringify(updatedNotes));
  };

  const onSubmit = ({ title, content }) => {
    if (!title.trim() || !content.trim()) return;

    let updatedNotes;
    if (editIndex !== null) {
      updatedNotes = [...notes];
      updatedNotes[editIndex] = { title, content };
      toast.success('Note updated successfully!');
      setEditIndex(null);
    } else {
      updatedNotes = [...notes, { title, content }];
      toast.success('Note added successfully!');
    }

    setNotes(updatedNotes);
    saveNotesToLocal(updatedNotes);
    reset(); // clear form
  };

  const handleDelete = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    saveNotesToLocal(updatedNotes);
    toast.warn('Note deleted');
  };

  const handleEdit = (index) => {
    const note = notes[index];
    setValue('title', note.title);
    setValue('content', note.content);
    setEditIndex(index);
  };

  const handleDownload = (note) => {
    const element = document.createElement('a');
    const file = new Blob([`Title: ${note.title}\n\n${note.content}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${note.title || 'note'}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div>
      <Header />
      <div className="notes-container">
        <ToastContainer position="top-left" autoClose={1000} />
        <h2 className="heading">Your Notes</h2>
        <form className="note-input" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Note title"
            {...register('title', { required:true ,minLength:3})}
          />
          {errors.title?.type==="required" && <span className="error">Title is required</span>}
          {errors.title?.type==="minLength" && <span>Minimum length is 3 required</span>}

          <textarea
            rows="4"
            placeholder="Write your note..."
            {...register('content', { required: true })}
          />
          {errors.content && <span className="error">Content is required</span>}

          <button type="submit">{editIndex !== null ? 'Update Note' : 'Add Note'}</button>
        </form>

        <div className="note-list">
          {notes.map((note, index) => (
            <div className="note" key={index}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <div className="note-actions">
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
                <button onClick={() => handleDownload(note)}>Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;
