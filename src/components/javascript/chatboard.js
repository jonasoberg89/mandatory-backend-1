import React, { useState, useEffect } from 'react';
import styles from '../css/chatboard.module.css';
import axios from "axios"


function Chat(props) {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        axios.get("/room/1")
            .then(res => {
                setRoom([res.data][0].roomName);
                setMessages(res.data.messages);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    useEffect(() => {
        if(!props.renderRoom)return
        axios.get(`/room/${props.renderRoom}`)
            .then(res => {
                setRoom([res.data][0].roomName);
                setMessages(res.data.messages)
            })
            .catch(err => {
                console.log(err)
            })
    }, [props.renderRoom]);

    return (

        <div className={styles.chat__container}>
            <div className={styles.chat__board}>
                <div className={styles["chat__board--header"]}>
                    <h2 className={styles["chat__board--text"]}>{room}</h2>
                </div>
                <div className={styles["chat__board--users"]}>
                    {
                        messages.map(msg => {
                            return(
                                <div className={styles["chat__board--user"]} key={msg.id}>
                                    <p><strong>{msg.user}: </strong>{msg.message}</p>    
                                </div> 
                            )
                        })
                    }
                </div>
                <div className={styles["chat__board--message"]}>
                    <form action="">
                        <input className={styles["chat__board--input"]} type="text" />
                        <button className={styles["chat__board--button"]}>Send</button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default Chat;
