import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

import "../styles/addNote.css"
const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "General" })
    const handleOnChange = (e) => {

        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "General" });
    }

    return (

        <div className='add-note' style={{ padding: "0 4%" }}>

            <button type="button" className=" add-note-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <img src="/assets/add.png" alt="" style={{ width: "2rem" }} />

            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">add note</h5>
                            <button type="button" className="close-btn"
                                data-bs-dismiss="modal" aria-label="Close"
                            >X</button>
                        </div>
                        <div className="modal-body">
                            <form >
                                <div className="mb-3 title-feild">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" placeholder="Title" name="title" value={note.title} onChange={handleOnChange} />
                                </div>
                                <div className="mb-3 description-feild">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" id="description" placeholder='Description' rows="3" name='description' value={note.description} onChange={handleOnChange}></textarea>

                                </div>
                                <div className="mb-3 tag-feild">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" placeholder='Tag' id="tag" name='tag' value={note.tag} onChange={handleOnChange} />
                                </div>
                                <div className="col-auto">

                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="cancel-btn p-2"
                                data-bs-dismiss="modal" aria-label="Close"
                            >cancel</button>
                            <button type="submit" data-bs-dismiss="modal" disabled={note.title.length === 0 || note.description.length === 0} className="p-2  save-note-btn" onClick={handleClick}>save</button>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddNote;