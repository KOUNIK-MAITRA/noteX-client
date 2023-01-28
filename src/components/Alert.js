import React, { useEffect, useState } from 'react'
import "../styles/alert.css";
function Alert(props) {


    const [alertcolor, setAlertcolor] = useState('')
    const [alerticon, setAlerticon] = useState('');
    useEffect(() => {
        if (props.alert) {
            if (props.alert.type === 'danger') {
                setAlertcolor('rgb(234 71 97/98%)')
                setAlerticon('fas fa-times-circle')
            }
            if (props.alert.type === 'success') {
                setAlertcolor('#4fc82cfa')
                setAlerticon('fas fa-check-circle')
            }
            if (props.alert.type === 'warning') {
                setAlertcolor('rgb(234 185 36/98%)')
                setAlerticon('fas fa-exclamation-triangle')
            }
            if (props.alert.type === 'info') {
                setAlertcolor('rgb(12 113 122/98%)')
                setAlerticon('fas fa-info-circle')
            }
        }
    }, [props.alert])



    return (
        <div className='d-flex justify-content-end' style={{ height: 'max-content', marginRight: "10px" }}>
            {props.alert && <div className={`alert noteX-alert text-light alert-dismissible fade show`}
                style={{ backgroundColor: alertcolor }} role="alert">
                <i className={alerticon} style={{ fontSize: "130%" }}></i>  <span style={{ fontSize: "100%", fontWeight: "bold" }}>{props.alert.msg}</span>
            </div>}
        </div>
    )
}

export default Alert