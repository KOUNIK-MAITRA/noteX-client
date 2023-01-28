import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext"
import "../styles/noteItem.css"

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote, showAlert } = props;
    return (

        <div className="card note-card my-2">
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div>
                        <h5 className="card-title note-card-title">{note.title}</h5>
                    </div>
                    <div>
                        <i className="fas fa-play mx-2 note-icons"></i>

                        <i className="far fa-trash-alt mx-2 note-icons" onClick={() => {
                            deleteNote(note._id)
                            showAlert("Note deleted", "danger")
                        }}></i>

                        <i className="far fa-edit mx-2 note-icons" onClick={() => {
                            updateNote(note)
                            showAlert("Note updated", "success")
                        }}></i>


                    </div>

                </div>

                <p className="card-text note-description" style={{ whiteSpace: "pre-wrap" }}>{note.description}</p>
                <p className="card-text note-tag" style={{ whiteSpace: "pre-wrap" }}>{note.tag}</p>
            </div>
        </div>

    )
}

export default NoteItem