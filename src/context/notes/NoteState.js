import React, { useState } from "react";
import NoteContext from "./noteContext";
import config from "../../configData.json";

const BASE_URL = config.BASE_URL;
const NoteState = (props) => {
    const host = BASE_URL;
    const notesIntial = [];
    const [notes, setNotes] = useState(notesIntial);
    const [userName, setuserName] = useState("")
    const [userlName, setuserlName] = useState("")
    const [useremail, setuserEmail] = useState("")
    const [profileImageURL, setProfileImageURL] = useState("");
    // get user details
    const getUserDetails = async () => {
        //API call
        const response = await fetch(`${host}/api/auth/fetchUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "AuthToken": localStorage.getItem('token')
            }
        });
        const json = await response.json()

        const name = json.fname;
        const lname = json.lname;
        const email = json.email;
        const profileImageURL = json.profileImageURL;
        setuserName(name)
        setuserlName(lname)
        setuserEmail(email)
        setProfileImageURL(profileImageURL)

    }





    // Get all Notes
    const getNotes = async () => {
        // API Call 
        const response = await fetch(`${host}/api/notes/fetchNotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "AuthToken": localStorage.getItem('token')
            }
        });
        const json = await response.json()
        setNotes(json)
    }

    // Add a Note
    const addNote = async (title, description, tag) => {

        // API Call 
        const response = await fetch(`${host}/api/notes/addNote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "AuthToken": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        const note = await response.json();
        setNotes(notes.concat(note))
    }



    //DELETE A NOTE
    const deleteNote = async (id) => {
        // API Call
        const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "AuthToken": localStorage.getItem('token')
            }
        });
        const json = response.json();
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }



    // EDIT A NOTE
    const editNote = async (id, title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "AuthToken": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ profileImageURL, userName, userlName, useremail, notes, setNotes, addNote, deleteNote, editNote, getNotes, getUserDetails }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;