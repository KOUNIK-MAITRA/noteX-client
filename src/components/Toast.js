import React from 'react'

const Toast = () => {
    return (
        <div className="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="10000">
            <div className="toast-header">
                <img src="..." className="rounded mr-2" alt="..." />
                <strong className="mr-auto">Bootstrap</strong>
                <small className="text-muted">11 mins ago</small>
                <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="toast-body">
                Hello, world! This is a toast message.
            </div>
        </div>
    )
}

export default Toast