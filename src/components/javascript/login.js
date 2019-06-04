import React, { useState, useEffect } from 'react';
import styles from '../css/login.module.css';
import music from "../audio/loginmusic.mp3";
import {Redirect} from "react-router-dom";
import axios from "axios"
let audio = new Audio(music)


function App() {
    const [username, setUsername] = useState("");

    useEffect(() => {
        audio.currentTime = 105;
        // audio.play();
        return () => {
            audio.pause();
        }
    }, []);
    function handleSubmit(e) {
        e.preventDefault();
        
    }
    function handleChange(e) {
        setUsername(e.target.value)
    }
    return (

        <div className={styles.login__container}>
            <div className={styles.login__header}>
                <h1 className={styles['login__header-text']}>WarChat</h1>
            </div>
            <div className={styles.login__body}>
                <div className={styles['login__body-container']}>
                    <form className={styles['login__body-from']} onSubmit={handleSubmit} >
                        <input className={styles['login__body-input']}
                            maxLength="12"
                            placeholder="Chose you name"
                            value={username}
                            onChange={handleChange} />
                        <button className={styles['login__body-button']}>Enter</button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default App;
