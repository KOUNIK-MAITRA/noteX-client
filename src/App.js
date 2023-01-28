import './App.css';
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import SignUp from './components/SignUp';
import Login from './components/Login';
import TextEditor from './components/TextEditor';
function App() {
  const [alert, setAlert] = useState(null);


  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (

    <>
      <NoteState>
        <Router>
          <Alert alert={alert}></Alert>
          <div>
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/logIn" element={<Login showAlert={showAlert} />}></Route>
              <Route exact path="/signUp" element={<SignUp showAlert={showAlert} />}></Route>
              <Route exact path="/editor" element={<TextEditor />}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
