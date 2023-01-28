import React from 'react'
import "../styles/footer.css"
function Footer() {
    return (

        <div className='footer-div px-2 pt-3'>
            <img src="/assets/NoteX-logo-dark.png" alt="" className='footer-logo' />

            <div className="min-footer d-flex justify-content-center" style={{ textAlign: "center" }}>
                <div className="min-footer-text">
                    © NoteX, All Rights Reserved
                    <p >
                        Website by Kounik Maitra
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer