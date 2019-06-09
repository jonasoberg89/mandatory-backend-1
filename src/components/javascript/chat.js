import React, { useState, useEffect } from 'react';
import styles from '../css/chat.module.css';
import music from "../audio/chatmusic.mp3";
import Chatboard from "./chatboard"
import Dialog from "./dialog"
import Redirect from "react-router-dom";
import axios from "axios"
import openSocket from 'socket.io-client';
let audio = new Audio(music)
const socket = openSocket('http://localhost:5000');


function Chat(props) {
    const [username, setUsername] = useState("");
    const [newRoom,setNewRoom] = useState(false);
    const {room,setRoom} = useState("");

    useEffect(() => {
        setUsername(props.location.state.username)
        audio.currentTime = 26;
        // audio.play();
        return () => {
            audio.pause();
        }
    },[]);
    return (

        <div className={styles.chat}>
            {newRoom === true ? <Dialog exitDialog={() => setNewRoom(false)} /> : null}
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
                        <h3 onClick={()=>{setNewRoom(!newRoom)}} className={styles["chat__navbar__text"]}>Create Room</h3>
                    </div>
                    <div className={styles["chat__navbar__rooms"]}>
                        <div>Create Room</div>
                    </div>
                </div>
                <Chatboard />
            </div>
        </div>

    );
}

export default Chat;
