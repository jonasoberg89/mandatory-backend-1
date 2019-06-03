import React, { useState, useEffect } from 'react';
import styles from '../css/login.module.css';
import music from "../audio/loginmusic.mp3"
import axios from "axios"
let audio = new Audio(music)


function App() {
    const [username, setUsername] = useState("");

    useEffect(() => {
        audio.currentTime = 105;
        // audio.play();

    }, []);
    useEffect(() => {
        // if(username) this.props.history.push("/chat")
    }, [username]);

    function handleSubmit(e) {
        e.preventDefault();
        axios.get('/api')
            .then(res => console.log(res))
    }
    function handleChange(e) {
        setUsername(e.target.value)
    }


    return (

        <div className={styles.login__container}>
            <div className={styles.login__header}>
                <h1 className={styles['login__header-text']} >WarChat</h1>
            </div>
            <div className={styles.login__body}>
                <div className={styles['login__body-container']}>
                    <form className={styles['login__body-from']} onSubmit={handleSubmit} >
                        <input className={styles['login__body-input']}
                            maxLength="12"
                            placeholder="Chose you name"
                            value={username}
                            onChange={handleChange}/>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default App;
