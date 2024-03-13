import * as loadImage from 'blueimp-load-image';
import React, { Component } from 'react';
import comicImage from '../assets/comic.png'; // Ensure this path is correct

class ImgReader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exifData: null,
            displayExif: false
        };
    }

    parseInfo = (e) => { // Converted to an arrow function for correct 'this' binding
        let files = e.target.files;
        if (files && files[0]) {
            loadImage.parseMetaData(files[0], (data) => {
                if (data.exif) {
                    this.setState({ exifData: data.exif.getAll() });
                }
            });
        }
    };

    handleSubmit = () => {
        if (this.state.exifData && this.state.exifData.Model === 'NIKON D5300') {
            alert("You've found the image"); // Show an alert if the EXIF model is NIKON D5300
        }
        this.setState({ displayExif: true }); // Always set this to true to display the EXIF data
    };

    render() {
        return (
            <div className="max-w-md mx-auto my-10 p-5 border rounded-lg shadow-lg bg-white">
                <div className="mb-5">
                    <img src={comicImage} alt="Comic" className="mb-3 w-auto" /> {/* Displaying the comic image */}
                    <input type="file" className="block w-full text-sm text-gray-600
                        file:mr-4 file:py-2 file:px-4
                        file:border-0 file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                        onChange={this.parseInfo} />
                </div>
                <div>
                    <button className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition-colors" onClick={this.handleSubmit}>
                        Submit
                    </button>
                </div>
                {this.state.displayExif && this.state.exifData ? (
                    <div className="mt-5">
                        <h3 className="text-lg font-semibold mb-2">EXIF Data:</h3>
                        <ul className="list-disc pl-5">
                            {Object.entries(this.state.exifData).map(([key, value]) => (
                                <li key={key} className="text-sm text-gray-800">{`${key}: ${value}`}</li>
                            ))}
                        </ul>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default ImgReader;
