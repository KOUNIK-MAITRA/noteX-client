
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css';
import config from "../configData.json";
import { signInWithGoogle } from '../Firebase';
const BASE_URL = config.BASE_URL;

const Login = (props) => {
    const { showAlert } = props;
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()

        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            showAlert("Logged In", "success")
            navigate('/');

        }
        else {
            showAlert("invalid email or password", "danger")
        }
    }
    const handleGoogleLogin = async () => {

        await signInWithGoogle();
        const name = localStorage.getItem("notex-google-name");
        const email = localStorage.getItem("notex-google-email");
        const uid = localStorage.getItem("notex-google-uid");

        const [firstName, lastName] = name.split(' ');

        localStorage.removeItem("notex-google-name");
        localStorage.removeItem("notex-google-email");
        localStorage.removeItem("notex-google-uid");

        GoogleLogin(firstName, lastName, email, uid, uid);
    }
    const GoogleLogin = async (fname, lname, email, password, confirmPassword) => {


        const response = await fetch(`${BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json()

        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            showAlert("Logged In", "success")
            navigate('/');

        }
        else {
            showAlert("invalid credentials", "danger")
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (

        <div className='loginPage my-5'>

            <div className='login-main-section'>


                <div className='logo-container'>
                    <img src="/assets/NoteX-logo-light.png" className="login-logo" alt="" />
                </div>
                <h2 className="Login-to-NoteX my-3 ">Login Now</h2>
                <div className='my-2'>
                    <button className="btn google-login-btn" onClick={handleGoogleLogin}>
                        <img src="/assets/google-logo.png" alt="" className='google-logo mr-3' />
                        Login with Google
                    </button>
                </div>
                <hr />
                <div className='formContainer mt-3'>

                    <form className='loginForm' onSubmit={handleSubmit}>


                        <div className="my-3">
                            <label htmlFor="email" className="form-label" style={{ fontWeight: "bold" }}>Email address</label>
                            <input type="email" className="form-control" value={credentials.email}
                                placeholder="Email" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label" style={{ fontWeight: "bold" }}>Password</label>
                            <input type="password" className="form-control" value={credentials.password}
                                placeholder="Password" onChange={onChange} name="password" id="password" />

                        </div>

                        <div className='d-flex justify-content-center'>
                            <button type="submit" className="btn login-btn">Login</button>
                        </div>
                        <br />

                    </form>

                </div>

                <div className='my-3' style={{ width: "100%", textAlign: "center" }}>
                    New here? Click here to <Link className="signUp-link" to="/signUp"> SignUp </Link>
                </div>

            </div>
        </div>





    )
}

export default Login