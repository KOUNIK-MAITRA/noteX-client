import React, { useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import '../styles/navbar.css'
const Navbar = () => {
    const context = useContext(noteContext);
    const { userName, userlName, useremail, getUserDetails, profileImageURL } = context;
    if (localStorage.getItem('token'))
        getUserDetails()
    let location = useLocation();
    let navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem('token');
        navigate('/logIn')
    }
    const handleCloseNavbar = () => {
        setTimeout(() => {
            if (document.getElementById("navbarNavDropdown"))
                document.getElementById("navbarNavDropdown").classList.remove("show");
        }, 300);

    }


    return (
        <nav className="navbar navbar-expand-lg  nav-background " style={{ width: "100%" }}>
            <div className="container-fluid nav-container">

                <div>
                    <Link className="navbar-brand" to="/">
                        <img
                            src="/assets/NoteX-brand-light.png"
                            className=" d-inline-block align-top signup-logo"
                            style={{ verticalAlign: "middle !important", cursor: "pointer" }}
                            alt="" />
                    </Link>
                </div>

                <button className="navbar-toggler"
                    type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false" a
                    ria-label="Toggle navigation">

                    <span className="dark-blue-text">
                        <i
                            className="fas fa-bars fa-1x">
                        </i>
                    </span>
                </button>


                <div className="collapse navbar-collapse  justify-content-end" id="navbarSupportedContent">

                    <ul className="navbar-nav p-1">

                        <li className="nav-item home">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                                aria-current="page" to="/">Home</Link>
                        </li>

                        <li className="nav-item about">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>

                    </ul>

                    {!localStorage.getItem('token') ? <form className="d-flex">
                        <Link className="btn btn-dark mx-2" to="/signUp" role="button" type="submit">SignUp</Link>
                        <Link className="btn btn-dark mx-2" to="/login" role="button" type="submit">LogIn</Link>
                    </form>
                        :
                        <form className="d-flex">
                            {/* <Link className="mx-2" to="/login" role="button" type="submit"
                             onClick={handleLogOut}
                            >Profile</Link> */}
                            <div className="nav-item" >
                                <div className='dropdown'>
                                    <a className="nav-link dropdown-toggle navbar-profile" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {profileImageURL != ""
                                            ? <img src={profileImageURL} alt="" style={{ width: "2rem", verticalAlign: "middle !important", cursor: "pointer", textAlign: "center", borderRadius: "6rem" }} />
                                            :
                                            ""}
                                        <b className="dropbtn ml-1 ">{userName}'s Space</b>
                                    </a>
                                    <div className="dropdown-content" aria-labelledby="navbarDropdownMenuLink" style={{ cursor: "pointer" }} >
                                        <div className='d-flex justify-content-center' style={{ backgroundColor: "lightgray" }}>
                                            <Link className="m-2" to="/">
                                                {profileImageURL != "" ? <img src={profileImageURL} alt="" style={{ width: "6rem", verticalAlign: "middle !important", cursor: "pointer", textAlign: "center", borderRadius: "6rem" }} />
                                                    :
                                                    <img
                                                        src="/assets/avatar.png"
                                                        className="avatar-logo"
                                                        style={{ width: "8rem", verticalAlign: "middle !important", cursor: "pointer", textAlign: "center", borderRadius: "2rem" }}
                                                        alt="" />}
                                            </Link>
                                        </div>
                                        <option className="userdetail-name" >{userName} {userlName}</option>

                                        <option className="userdetail-email" >{useremail}</option>
                                        <option className="btn btn-dark logout-btn" role="button" onClick={handleLogOut}>Logout</option>
                                    </div>

                                </div>

                            </div>


                        </form>
                    }

                </div>


            </div>
        </nav>
    )
}

export default Navbar