import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import Notes from './Notes'
import Navbar from './Navbar';
import Footer from './Footer';
const Home = (props) => {
    const { showAlert } = props;
    return (
        <div style={{ "position": "relative", "minHeight": "100vh" }}>
            <Navbar />
            <Notes showAlert={showAlert} />
            <Footer />
        </div>
    )
}

export default Home