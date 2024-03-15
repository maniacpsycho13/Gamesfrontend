import React, { useState } from 'react';
import loadImage from 'blueimp-load-image';
import comicImage from '../assets/comic.png';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import CryptoJS from 'crypto-js';
const ImgReader = () => {
    const navigate = useNavigate();
    const [exifData, setExifData] = useState(null);
    const [displayExif, setDisplayExif] = useState(false);
    const [value,setValue] =useState(-1)
    useEffect(() => {
        const decrypted = CryptoJS.AES.decrypt(localStorage.getItem('count'), 'secret key').toString(CryptoJS.enc.Utf8);
        setValue(parseInt(decrypted));
        console.log(value);  
    //   setValue(parseInt(localStorage.getItem('count')))
    },[value])
    

    const parseInfo = (e) => {
        const files = e.target.files;
        if (files && files[0]) {
            loadImage.parseMetaData(files[0], (data) => {
                if (data.exif) {
                    setExifData(data.exif.getAll());
                }
            });
        }
    };

    const handleSubmit = () => {
        if (exifData && exifData.Model === 'NIKON D5300') {
            const encrypted = CryptoJS.AES.encrypt('5', 'secret key').toString();
            localStorage.setItem('count', encrypted );
            // localStorage.setItem('count', 5);
            // console.log(parseInt(localStorage.getItem('count')));
            navigate('/Level-5');
            alert("You've found the image");
        }
        setDisplayExif(true);
    };

    return (
        value >= 4 ? (
            <div className="max-w-md mx-auto my-10 p-5 border rounded-lg shadow-lg bg-white">
                <div className="mb-5">
                    <img src={comicImage} alt="Comic" className="mb-3 w-auto" />
                    <input type="file" className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" onChange={parseInfo} />
                </div>
                <div>
                    <button className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition-colors" onClick={handleSubmit}>
                        Submit 
                    </button>
                </div>
                {displayExif && exifData ? (
                    <div className="mt-5">
                        <h3 className="text-lg font-semibold mb-2">EXIF Data:</h3>
                        <ul className="list-disc pl-5">
                            {Object.entries(exifData).map(([key, value]) => (
                                <li key={key} className="text-sm text-gray-800">{`${key}: ${value}`}</li>
                            ))}
                        </ul>
                    </div>
                ) : null}
            </div>
        ) : (
            <div className="h-screen flex justify-center items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                <div className="text-center">
                    <p className="text-4xl font-bold mb-4">Oh you have not cracked the previous levels</p>
                    <p className="text-2xl font-bold">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-900 to-blue-500">Keep playing and try to crack the levels to unlock more fun! {value}</span> 
                    </p>
                </div>
            </div>
        )
    );
};

export default ImgReader;
