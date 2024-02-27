import React, { useContext, useEffect, useState, useRef } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';
function Notes(props) {
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNote, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNote()
        }
        else{
           navigate("/login");
        }
        //eslint-disable-next-line 
    }, [localStorage.getItem('token')])
    
    const ref = useRef(null)
    const refClose = useRef(null)

    const updateNote = (currNotes) => {
        ref.current.click()
        setNote({ id: currNotes._id, etitle: currNotes.title, edescription: currNotes.description, etag: currNotes.tag })
        
    }

    


    const handleClick = (e) => {
        
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click()
        props.showAlert("Edited Successfully","success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="container max-w-screen-2xl text-neutral-50 py-5 mx-auto bg-gray-900 px-40">
            {/* <-- Button trigger modal --> */}
            <button ref={ref} type="button" className=" hidden btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog " data-bs-theme="dark">
                    <div className="modal-content rounded-xl" data-bs-theme="dark">
                        <div className="modal-header" data-bs-theme="dark">
                            <h1 className="modal-title fs-5 semi-bold" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="bg-gray-900">
                                <div className="space-y-3">
                                    <div className="border-b border-gray-900/10 pb-2">


                                        <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                                            <div className="sm:col-span-3">
                                                <label htmlFor="etitle" className="block text-sm font-medium leading-6 text-neutral-50">Edit Title</label>
                                                <div className="mt-2">
                                                    <input type="text" value={note.etitle} name="etitle" id="etitle" autoComplete="given-name" minLength={5} required onChange={onChange} className="block w-full rounded-md border-0 bg-gray-300 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-neutral-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-b border-gray-900/10 pb-12">


                                        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">

                                            <div className="col-span-full">
                                                <label htmlFor="edescription" className="block text-sm font-medium leading-6 text-neutral-50">Edit Description</label>
                                                <div className="mt-2">
                                                    <textarea id="edescription" value={note.edescription} name="edescription" rows="3" minLength={5} required onChange={onChange} className="block w-full rounded-md border-0 bg-gray-300 py-1.5 pb-0 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-neutral-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                                                </div>

                                            </div>

                                        </div>
                                        <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 mb-0 sm:grid-cols-6">
                                            <div className="sm:col-span-3">
                                                <label htmlFor="etag" className="block text-sm font-medium leading-6 text-neutral-50">Edit Tag</label>
                                                <div className="mt-2">
                                                    <input type="text" name="etag" value={note.etag} id="etag" autoComplete="given-name" onChange={onChange} className="block w-full rounded-md border-0 bg-gray-300 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-neutral-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </form>
                        </div>
                        <div className="modal-footer" data-bs-theme="dark">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5  || note.edescription.length<5} type="button" onClick={handleClick} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="font-semibold">Your Notes</h1>
            
                <div className="container my-3">
                    <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">

                        {notes.length === 0 && "No Notes to display"}
                    </h5>
                </div>
           

            {notes.map((notes) => {
                return <NoteItem showAlert={props.showAlert} updateNote={updateNote} key={notes._id} notes={notes} />;
            })}
        </div>
    )
}

export default Notes