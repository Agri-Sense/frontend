import React, { useState, useEffect } from 'react'

import '../styles/FileUpload.css'
import axios from 'axios'

const FileUpload = ({image, setImage}) => {    
    const uploadHandler = (e) => {
        setImage(e.target.files)
        console.log(image)
    }
    return (
        <>
        <div className="file-card">
            <div className="file-inputs">
                <input multiple type="file" onChange={uploadHandler} />
                <button>
                    Upload
                </button>
            </div>
            <div className="img-container">
                {Array.from(image).map((item, index) => {
                        return (
                            <div key={index}><img src={item? URL.createObjectURL(item) : null} /></div>
                        )
                    })}
            </div>
        </div>
        </>
    )
}

export default FileUpload;