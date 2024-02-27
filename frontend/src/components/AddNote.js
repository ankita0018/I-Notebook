import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
function AddNote (props){
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note, setNote] = useState({title:"", description:"", tag:""})
    
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        setNote({title:"", description:"", tag:""})
        props.showAlert("Note added sucessfully","success")
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }

    
  return (
    <div>
        <div className="container max-w-screen-2xl pt-2 mx-auto bg-gray-900 px-40">
      <form className="bg-gray-900">
        <div className="space-y-3">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-neutral-50">Add Note</h2>


            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-neutral-50">Add Title</label>
                <div className="mt-2">
                  <input type="text" value={note.title} name="title" id="title" autoComplete="given-name" minLength={5} required onChange = {onChange} className="block w-full rounded-md border-0 bg-gray-300 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-neutral-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-900/10 pb-12">



            <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">

              <div className="col-span-full">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-neutral-50">Description</label>
                <div className="mt-2">
                  <textarea id="description" value={note.description} name="description" rows="3" minLength={5} required onChange = {onChange} className="block w-full bg-gray-300 rounded-md border-0 py-1.5 pb-0 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-neutral-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                </div>

              </div>

            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="tag" className="block text-sm font-medium leading-6 text-neutral-50">Add Tag</label>
                <div className="mt-2">
                  <input type="text" value={note.tag} name="tag" id="tag" autoComplete="given-name" onChange = {onChange} className="block w-full rounded-md border-0 bg-gray-300 py-1.5 px-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-neutral-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              disabled={note.title.length<5  || note.description.length<5} className="middle none center rounded-2xl bg-gray-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true" onClick={handleClick}
            >
              Add
            </button>

          </div>
        </div>
      </form>
      </div>
    </div>
  )
}

export default AddNote