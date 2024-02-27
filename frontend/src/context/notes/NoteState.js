import React, { useState } from 'react'
import NoteContext from './noteContext'

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)

    //get all notes
    const getNote = async () => {
        
        //API CALL
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",

            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },

        });

        //adding note client side
        const json = await response.json();
       
        setNotes(json)
    }

    //add
    const addNote = async (title, description, tag) => {
      
        //API CALL
        const response = await fetch(`${host}/api/notes/addNote`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },

            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        //adding note client side
        setNotes(notes.concat(note))

        
       
        
    }
    //delete notes
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
            method: "DELETE",

            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },

        });
        const json = await response.json();
        console.log(json)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    const editNote = async (id, title, description, tag) => {
        
        //API CALL
        const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json)
        

        //Logic to edit on client end
        let newNote = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];

            if (element._id === id) {
                newNote[index].title = title
                newNote[index].description = description
                newNote[index].tag = tag
                break;
            }
            
        }
        setNotes(newNote);
    }
    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNote }}>
            {props.children}
        </NoteContext.Provider>

    )
}

export default NoteState;