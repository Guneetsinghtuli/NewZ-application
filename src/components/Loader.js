import React from 'react'

function Loader() {
    return (
        <div>
            <div className=" container my-4 d-flex justify-content-center">
                <div className="spinner-border text-secondary" style={{ width: '3rem', height: '3rem' }} role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        </div>
    )
}

export default Loader
