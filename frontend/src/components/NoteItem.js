import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

function NoteItem(props) {
    const { notes, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    return (
        // <div>
        // <a href="/" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        // <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{notes.title}</h5>
        // <p className="font-normal text-gray-700 dark:text-gray-400">{notes.description}</p></a>
        // </div>

        <div className="relative flex w-96 flex-col rounded-xl bg-gray-800 bg-clip-border text-neutral-100 my-3 shadow-md w-auto">

            <div className="p-6">
                <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    <div className="d-flex">
                        {notes.title}
                        <i className="fa-solid fa-trash fa-bounce mt-1 px-4" onClick={() => { deleteNote(notes._id); props.showAlert("Deleted successfully", "success"); }}></i>
                        <i className="fa-solid fa-pen-to-square mt-1 px-2" data-te-toggle="modal"
                            data-te-target="#exampleModal" onClick={() => { updateNote(notes) }}></i>
                    </div>

                </h5>
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                    {notes.description}
                </p>
                <span
                    class="mt-4 px-3 w-min flex justify-between items-center text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-2xl py-2 font-bold leading-loose cursor-pointer dark:text-gray-300 ">
                    <i class="mr-2 mt-1 fa-solid fa-tag"></i>
                    {notes.tag}
                    
                </span>
            </div>
            {/* <div className="p-6 pt-0">
  <button
    className="select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    type="button"
    data-ripple-light="true"
  >
    Read More
  </button>
</div> */}
        </div>
    )
}

export default NoteItem