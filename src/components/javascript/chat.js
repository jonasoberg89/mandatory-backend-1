import React, { useState, useEffect } from 'react';
import styles from '../css/chat.module.css';
import Chatboard from "./chatboard"
import Dialog from "./dialog"
import axios from "axios"
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

function Chat(props) {
    const [username, setUsername] = useState("");
    const [newRoom, setNewRoom] = useState(false);
    const [renderRoom, setRenderRoom] = useState("");
    const [rooms, setRooms] = useState([]);
    const [newMsg, setNewMsg] = useState("");
    const[users,setUsers] = useState ([]);

    socket.on("new message", function(data){
        setNewMsg(data);
    })

    useEffect(()=>{
        socket.emit("new user", username)
        socket.on("get users", function(data){
            setUsers(data);
        })
    },[username])

    useEffect(() => {
        setUsername(props.location.state.username)
      
        axios.get("/api")
            .then(res => {
                let data = res.data.data;
                setRooms(data)
            })
            .catch(err => {
                console.log(err);
            })
    
    }, [rooms]);
    function getRoom(id) {
        setRenderRoom(id)
    }
    function deleteRoom(id) {
        axios.delete(`/delete/${id}`)
        .then(res =>{
            console.log(res);
        })
        .catch(err =>{
            console.log(err);
        })
    }
    return (

        <div className={styles.chat}>
            {newRoom === true ? <Dialog exitDialog={() => setNewRoom(false)} /> : null}
            <div className={styles.chat__header}>
                <h1 className={styles['chat__header--text']}>WarChat</h1>
                <h1 className={styles['chat__header--text']}>{username}</h1>
            </div>
            <div className={styles.chat__users}>
                <div className={styles["chat__users--image"]}></div>
                <h2 className={styles["chat__users--header"]} >Online Users</h2>
                <div>
                {
                        users.map(user =>{
                            return(
                                <div ke={user}>
                                <span className={styles["chat__users--user"]} >{user}</span>
                                </div>
                            )
                        })
                    }
                 
                </div>
            </div>
            <div className={styles.chat__board}>
                <div className={styles.chat__navbar}>
                    <div className={styles["chat__navbar__header"]}>
                        <h3 onClick={() => { setNewRoom(!newRoom) }} className={styles["chat__navbar__text"]}>Create Room</h3>
                    </div>
                    <div className={styles["chat__navbar__rooms"]}>
                    {
                            rooms.map(room => {
                                return (
                                    <div className={styles["chat__navbar--room"]} key={room.id}>
                                        <div className={styles["chat__navbar--box"]}>
                                            <span onClick={() => { getRoom(room.id) }} className={styles["chat__navbar--room--name"]}>{room.roomName}</span>
                                        </div>
                                        <div className={styles["chat__navbar--box"]}>
                                            <span><i onClick= {()=>{deleteRoom(room.id)}} className={`material-icons ${styles['chat__navbar__icon']}`}>close</i></span>
                                        </div>

                                    </div>
                                )
                            }
                            )
                        }
                    </div>
                </div>
                <Chatboard newMsg={newMsg} username={username} socket={socket} renderRoom={renderRoom} />
            </div>
        </div>

    );
}

export default Chat;
