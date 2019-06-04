import React, { useState, useEffect } from 'react';
import styles from '../css/login.module.css';
import music from "../audio/loginmusic.mp3";
import Redirect from "react-router-dom";
import axios from "axios"
let audio = new Audio(music)


function App() {
    const [username, setUsername] = useState("");

    return (

        <div>
            <h1>CHAT</h1>
        </div>

    );
}

export default App;
