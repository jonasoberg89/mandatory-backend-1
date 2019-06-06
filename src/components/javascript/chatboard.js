import React, { useState, useEffect } from 'react';
import styles from '../css/chatboard.module.css';
import music from "../audio/chatmusic.mp3";
import Redirect from "react-router-dom";
import axios from "axios"
let audio = new Audio(music)


function Chat(props) {
    const [username, setUsername] = useState("");


    return (

        <div className={styles.chat__container}>
            <div className={styles.chat__board}>
                <div className={styles["chat__board--users"]}></div>
                <div className={styles["chat__board--message"]}>
                    <form action="">
                        <input type="text"/>
                        <button>Send</button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default Chat;
