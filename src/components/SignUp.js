import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import valid from '../utils/validation';
import '../styles/signUp.css'
import config from "../configData.json";
import { signInWithGoogle } from '../Firebase';


const BASE_URL = config.BASE_URL;
const SignUp = (props) => {
    const { showAlert } = props;
    const [credentials, setCredentials] = useState({ fname: " ", lname: "", email: "", password: "", confirmPassword: "" })
    let navigate = useNavigate();

    const handleGoogleSignUp = async () => {

        await signInWithGoogle();
        const name = localStorage.getItem("notex-google-name");
        const email = localStorage.getItem("notex-google-email");
        const uid = localStorage.getItem("notex-google-uid");
        const profileImageURL = localStorage.getItem("notex-google-profileImageURL");
        const [firstName, lastName] = name.split(' ');

        localStorage.removeItem("notex-google-name");
        localStorage.removeItem("notex-google-email");
        localStorage.removeItem("notex-google-uid");
        localStorage.removeItem("notex-google-profileImageURL");

        GoogleSignup(firstName, lastName, email, uid, uid, profileImageURL);
    }

    const GoogleSignup = async (fname, lname, email, password, confirmPassword, profileImageURL) => {


        const errMsg = valid(fname, lname, email, password, confirmPassword)
        if (errMsg) {
            showAlert(errMsg, "danger")
        }
        else {
            const response = await fetch(`${BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fname, lname, email, password, profileImageURL })
            });
            const json = await response.json()

            if (json.success) {

                // Save the auth token and redirect
                localStorage.setItem('token', json.authToken);
                showAlert("registered successfull", "success")
                navigate("/logIn");


            }
            else {
                showAlert("invalid credentials", "danger")
            }
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fname, lname, email, password, confirmPassword } = credentials;
        const errMsg = valid(fname, lname, email, password, confirmPassword)
        if (errMsg) {
            showAlert(errMsg, "danger")
        }
        else {
            const response = await fetch(`${BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fname, lname, email, password })
            });
            const json = await response.json()

            if (json.success) {

                // Save the auth token and redirect
                localStorage.setItem('token', json.authToken);
                showAlert("registered successfull", "success")
                navigate("/logIn");


            }
            else {
                showAlert("invalid credentials", "danger")
            }
        }

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='signupPage my-5'>

            <div className="signup-main-section">

                <div className='logo-container'>
                    <img src="/assets/NoteX-logo-light.png" className="signup-logo" alt="" />
                </div>
                <h2 className="signup-to-NoteX my-2 ">Sign Up Now</h2>
                <div className='d-flex justify-content-center mt-3'>
                    <button className="btn google-signup-btn" onClick={handleGoogleSignUp}>
                        <img src="/assets/google-logo.png" alt="" className='google-logo mr-3' />
                        SignUp with Google

                    </button>
                </div>
                <hr />
                <div className='formContainer mt-2'>
                    <form className="signupForm" onSubmit={handleSubmit}>


                        <div className='d-flex'>
                            <div className="my-2" style={{ marginRight: "0.5rem" }} >
                                <label htmlFor="fname" className="form-label" style={{ fontWeight: "bold" }}>First Name</label>
                                <input type="text" className="form-control"
                                    value={credentials.fname} onChange={onChange} id="fname"
                                    name="fname" aria-describedby="emailHelp"
                                    style={{ width: "10rem" }} />

                            </div>
                            <div className="my-2">
                                <label htmlFor="lname" className="form-label" style={{ fontWeight: "bold" }}>Last Name</label>
                                <input type="text" className="form-control"
                                    value={credentials.lname} onChange={onChange} id="lname" name="lname"
                                    aria-describedby="emailHelp" style={{ width: "10rem" }} />

                            </div>
                        </div>

                        <div className="my-2">
                            <label htmlFor="email" className="form-label" style={{ fontWeight: "bold" }}>Email address</label>
                            <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />

                        </div>
                        <div className="mb-2">
                            <label htmlFor="password" className="form-label" style={{ fontWeight: "bold" }}>Password</label>
                            <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="confirmPassword" className="form-label" style={{ fontWeight: "bold" }}>Confirm Password</label>
                            <input type="password" className="form-control" onChange={onChange} name="confirmPassword" id="confirmPassword" />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn signup-btn">Register</button>
                        </div>

                    </form>

                </div>

                <div className="my-2" style={{ width: "100%", textAlign: "center" }}>
                    Already have an account? Click here to<Link className='login-link' to="/logIn"> LogIn </Link>
                </div>
            </div>


        </div>
    )
}

export default SignUp