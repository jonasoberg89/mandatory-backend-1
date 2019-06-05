import React, { useState, useEffect } from 'react';
import styles from '../css/chat.module.css';
import music from "../audio/chatmusic.mp3";
import Redirect from "react-router-dom";
import axios from "axios"
let audio = new Audio(music)


function Chat(props) {
    const [username, setUsername] = useState("");
    useEffect(() => {
        setUsername(props.location.state.username)
        audio.currentTime = 26;
        // audio.play();
        return () => {
            audio.pause();
        }
    }, []);
    return (

        <div className={styles.chat}>
            <div className={styles.chat__header}>
                <h1 className={styles['chat__header--text']}>WarChat</h1>
                <h1 className={styles['chat__header--text']}>{username}</h1>
            </div>
            <div className={styles.chat__users}>
                    <div className={styles["chat__users--image"]}></div>
            </div>
            <div className={styles.chat__board}>
                <div className={styles.chat__navbar}>
                    <div className={styles["chat__navbar__header"]}>
                        <div>Create Room</div>
                    </div>
                    <div className={styles["chat__navbar__rooms"]}>
                        <div>Create Room</div>
                    </div>

                </div>
                <div className={styles.chat__container}>

                </div>
                
            </div>
        </div>

    );
}

export default Chat;
