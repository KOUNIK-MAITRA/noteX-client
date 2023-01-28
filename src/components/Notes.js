import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import Toast from './Toast';
import { useNavigate } from 'react-router-dom';
import "../styles/updateNote.css"
import "../styles/notes.css"
const Notes = (props) => {
    const { showAlert } = props
    const context = useContext(noteContext);
    const { notes, getNotes, editNote, userName, profileImageURL } = context;
    const [displayNotes, setDisplayNotes] = useState(notes);
    const [search, setSearch] = useState("");

    useEffect(() => {
        setDisplayNotes(notes);

    }, [notes])

    const filterSearch = () => {
        if (search === "") {
            setDisplayNotes(notes);
        }
        else {
            let newArray = notes.filter(function (element) {

                return element.tag.toUpperCase() === search.toUpperCase()


            }
            );
            if (newArray !== [])
                setDisplayNotes(newArray);
            else
                setDisplayNotes(notes);
        }


    }


    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token'))
            getNotes();
        else
            navigate('/login');
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })



    const updateNote = (currentNote) => {
        //document.getElementById("editNote-button").click();
        ref.current.click();

        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag)
        //  document.getElementById("editNote-close-button").click();
        refClose.current.click();
        showAlert("Note updated", "success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const handleSearch = (e) => {
        if (e.target.value === "") {
            setSearch(e.target.value);
            setDisplayNotes(notes);
        }
        else
            setSearch(e.target.value);
    }
    return (
        <div style={{ marginTop: "90px", paddingBottom: "12rem" }}>
            <div className='utility-icons'>
                {search === "" ? <div className='userName'>

                    {userName}'s Notes

                </div>
                    :
                    <div className='userName'>
                        {search} Workspace
                    </div>
                }
                <div>

                    <div className="d-flex search-form" >
                        <AddNote></AddNote>
                        <input className="form-control me-2 search-bar" type="search"
                            placeholder="Search by Tag" aria-label="Search" value={search} onChange={handleSearch} />
                        <button className="search-btn" onClick={filterSearch}><i className="fa fa-search" aria-hidden="true"></i></button>

                    </div>
                </div>

            </div>
            <button ref={ref} type="button" id="editNote-button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModaledit">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModaledit" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close-btn"
                                data-bs-dismiss="modal" aria-label="Close"
                            >X</button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                                </div>
                                <div className=" description-feild mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea type="text" className="form-control" id="edescription" placeholder='Description' name='edescription' value={note.edescription} minLength={5} onChange={onChange} required></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" id="editNote-close-button" className="cancel-btn p-2" data-bs-dismiss="modal">cancel</button>
                            <button disabled={note.etitle.length === 0 || note.edescription.length === 0} onClick={handleClick} type="button" className="update-note-btn p-2">Update</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="conatiner card-columns" style={{ padding: "2%" }}>

                <div className="">
                    {notes.length === 0 &&

                        <div className='emptyNotes-div container p-5 d-flex justify-content-center align-items-center'>

                            <div>"Your mind is for creating ideas not for having them"</div>

                        </div>
                    }
                </div>

                {displayNotes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={showAlert} />
                }).reverse()}
            </div>
            {/* <AddNote></AddNote> */}
        </div>
    )
}

export default Notes