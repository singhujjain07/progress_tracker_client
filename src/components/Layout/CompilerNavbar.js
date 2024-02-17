import React from 'react';
import Select from 'react-select';
import '../../styles/CompilerNavbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ userLang, setUserLang, userTheme,
    setUserTheme, fontSize, setFontSize, onFileInputChange }) => {
    const languages = [
        { value: "c", label: "C" },
        { value: "cpp", label: "C++" },
        { value: "python3", label: "Python" },
        { value: "java", label: "Java" },
        { value: "csharp", label: "C#" },
        { value: "kotlin", label: "Kotlin" },
        { value: "nodejs", label: "NodeJS" },
        { value: "ruby", label: "Ruby" },
        { value: "rust", label: "RUST" },
        { value: "verilog", label: "VERILOG" },

    ];
    const themes = [
        { value: "vs-dark", label: "Dark" },
        { value: "light", label: "Light" },
    ]

    // Function to handle file input change
    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const contents = e.target.result;
                onFileInputChange(contents); // Pass the file contents to the parent component
            };
            reader.readAsText(file);
        }
    };

    return (
        // <div className="compiler-navbar">
        //     <h1>Babadon Code Compiler</h1>
        //     <Select options={languages} value={userLang}
        //         onChange={(e) => setUserLang(e.value)}
        //         placeholder={userLang} />
        //     <Select options={themes} value={userTheme}
        //         onChange={(e) => setUserTheme(e.value)}
        //         placeholder={userTheme} />
        //     <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileInputChange} />
        //     <button onClick={() => document.getElementById('fileInput').click()}>Import</button>
        //     <label>Font Size</label>
        //     <input type="range" min="18" max="30"
        //         value={fontSize} step="2"
        //         onChange={(e) => { setFontSize(e.target.value) }} />
        // </div>
        // <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid m-2">
                {/* Toggle button */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* Navbar brand */}
                <a className="navbar-brand mt-2 mt-lg-0 me-5" href="#">
                    <div className='d-flex align-items-center justify-content-center flex-row'>
                        <img className='me-2' src="images/brand.png" height={45} alt="MDB Logo" loading="lazy" />
                        <h3 className='mb-0'>NinjaX</h3>
                    </div>

                </a>
                {/* Collapsible wrapper */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* Left links */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
                        <li className="nav-item me-3">
                            <Select options={languages} value={userLang}
                                onChange={(e) => setUserLang(e.value)}
                                placeholder={userLang} />
                        </li>
                        <li className="nav-item me-3">
                            <Select options={themes} value={userTheme}
                                onChange={(e) => setUserTheme(e.value)}
                                placeholder={userTheme == "light" ? "Light" : "Dark"} />
                        </li>
                        <li className="nav-item me-3">
                            <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileInputChange} />
                            <button style={{ borderRadius: "20px" }} className='btn btn-warning' onClick={() => document.getElementById('fileInput').click()}>Import</button>
                        </li>
                        <li className="nav-item me-3">
                            <label className='me-3' style={{ color: "#afec3f" }}>Font Size</label>
                            <input type="range" min="18" max="30"
                                value={fontSize} step="2"
                                onChange={(e) => { setFontSize(e.target.value) }} />
                        </li>
                    </ul>
                    {/* Right elements */}
                    <div className="d-flex align-items-center">
                        {/* Home */}
                        <Link style={{ borderRadius: "20px" }} className='btn btn-warning me-5' to={"/"}>Home</Link>

                        {/* Avatar */}
                        <div className="dropdown">
                            <a className="dropdown-toggle d-flex align-items-center hidden-arrow" href="#" id="navbarDropdownMenuAvatar" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className="rounded-circle" height={25} alt="Black and White Portrait of a Man" loading="lazy" />
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuAvatar">
                                <li>
                                    <a className="dropdown-item" href="#">My profile</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Settings</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Right elements */}
                </div>
                {/* Collapsible wrapper */}
            </div>
        </nav>

    )
}

export default Navbar